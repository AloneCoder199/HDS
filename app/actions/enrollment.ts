'use server';

import connectDB from '@/lib/db/connect';
import EnrollmentRequest from '@/lib/db/models/enrollment-request';
import User from '@/lib/db/models/User';
import { sendEmail } from '@/lib/email/service';
import {
  enrollmentSubmittedTemplate,
  enrollmentApprovedTemplate,
  enrollmentRejectedTemplate,
} from '@/lib/email/templates';
import bcrypt from 'bcryptjs';
import { coursesData } from '@/lib/CourseData';
import { revalidatePath } from 'next/cache';

// ── Helpers ────────────────────────────────────────────────────────────────

async function generateStudentId(type: 'REGULAR' | 'ONE_TO_ONE'): Promise<string> {
  await connectDB();
  const prefix = type === 'REGULAR' ? 'REG' : 'OTO';
  const lastUser = await User.findOne({
    studentId: new RegExp(`^${prefix}-`),
  }).sort({ createdAt: -1 });

  let nextNumber = 1001;
  if (lastUser?.studentId) {
    const parts = lastUser.studentId.split('-');
    const lastNumber = parseInt(parts[1], 10);
    if (!isNaN(lastNumber)) nextNumber = lastNumber + 1;
  }
  return `${prefix}-${nextNumber}`;
}

// ── Submit Enrollment Request ──────────────────────────────────────────────

export async function submitEnrollmentRequest(data: {
  type: 'REGULAR' | 'ONE_TO_ONE';
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  preferredTime?: string;
  specificRequirements?: string;
  paymentMethod: 'EASYPAISA' | 'JAZZCASH' | 'BANK_TRANSFER' | 'CASH';
  transactionId: string;
  paymentAmount: number;
  paymentScreenshot: string;
}) {
  try {
    await connectDB();

    // ── Validate course ──────────────────────────────────────────────────
    const course = coursesData.find((c) => c.id === data.courseId);
    if (!course) {
      return { success: false, error: 'Course not found' };
    }

    // ── Validate required payment fields explicitly ──────────────────────
    if (!data.paymentMethod) {
      return { success: false, error: 'Payment method is required' };
    }
    if (!data.transactionId?.trim()) {
      return { success: false, error: 'Transaction ID is required' };
    }
    if (!data.paymentAmount || data.paymentAmount <= 0) {
      return { success: false, error: 'Valid payment amount is required' };
    }
    if (!data.paymentScreenshot?.trim()) {
      return { success: false, error: 'Payment screenshot is required' };
    }

    // ── Check for duplicate pending request ──────────────────────────────
    const existingRequest = await EnrollmentRequest.findOne({
      email: data.email.toLowerCase(),
      status: 'PENDING',
    });
    if (existingRequest) {
      return {
        success: false,
        error: 'You already have a pending enrollment request. Please wait for admin approval.',
      };
    }

    // ── Check for existing account ───────────────────────────────────────
    const existingUser = await User.findOne({ email: data.email.toLowerCase() });
    if (existingUser) {
      return {
        success: false,
        error: 'An account with this email already exists. Please login.',
      };
    }

    // ── Create enrollment — all fields explicitly mapped ─────────────────
    const request = await EnrollmentRequest.create({
      // Personal info
      type: data.type,
      fullName: data.fullName.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      // Course info
      courseId: data.courseId,
      courseTitle: course.title,
      // Optional 1-to-1 fields
      preferredTime: data.preferredTime ?? undefined,
      specificRequirements: data.specificRequirements ?? undefined,
      // Payment info — explicitly mapped (not spread)
      paymentMethod: data.paymentMethod,
      transactionId: data.transactionId.trim(),
      paymentAmount: data.paymentAmount,
      paymentScreenshot: data.paymentScreenshot.trim(),
      paymentDate: new Date(),
      // Default status
      status: 'PENDING',
    });

    console.log('[Enrollment Created]', {
      id: request._id,
      email: request.email,
      paymentMethod: request.paymentMethod,
      transactionId: request.transactionId,
      paymentAmount: request.paymentAmount,
      hasScreenshot: !!request.paymentScreenshot,
    });

    // ── Send confirmation email ──────────────────────────────────────────
    await sendEmail({
      to: data.email,
      subject: 'HDS - Enrollment Request Received',
      html: enrollmentSubmittedTemplate(
        data.fullName,
        course.title,
        data.type,
        data.transactionId,
        data.paymentAmount
      ),
    });

    revalidatePath('/admin/enrollments');

    return {
      success: true,
      message: 'Enrollment request submitted successfully! Check your email.',
      requestId: request._id.toString(),
    };

  } catch (error: any) {
    console.error('[Submit Enrollment Error]', error);

    // Surface Mongoose validation errors clearly
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map((e: any) => e.message)
        .join(', ');
      return { success: false, error: `Validation failed: ${messages}` };
    }

    // Duplicate key (transactionId)
    if (error.code === 11000) {
      return {
        success: false,
        error: 'This transaction ID has already been used. Please check your payment details.',
      };
    }

    return { success: false, error: 'Failed to submit enrollment request. Please try again.' };
  }
}

// ── Get All Enrollment Requests (Admin) ───────────────────────────────────

export async function getEnrollmentRequests(filters?: {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  type?: 'REGULAR' | 'ONE_TO_ONE';
}) {
  try {
    await connectDB();

    const query: Record<string, string> = {};
    if (filters?.status) query.status = filters.status;
    if (filters?.type) query.type = filters.type;

    const requests = await EnrollmentRequest.find(query)
      .sort({ createdAt: -1 })
      .select([
        'type', 'fullName', 'studentId', 'email', 'phone',
        'courseId', 'courseTitle', 'preferredTime', 'specificRequirements',
        'status', 'adminNotes', 'createdAt', 'updatedAt',
        // Payment fields explicitly selected
        'paymentMethod', 'transactionId', 'paymentAmount', 'paymentScreenshot', 'paymentDate',
      ])
      .lean();

    // Serialize ObjectIds and Dates for client components
    const serialized = JSON.parse(JSON.stringify(requests));

    return { success: true, data: serialized };
  } catch (error) {
    console.error('[Get Enrollments Error]', error);
    return { success: false, error: 'Failed to fetch enrollment requests' };
  }
}

// ── Approve Enrollment Request ────────────────────────────────────────────

export async function approveEnrollmentRequest(requestId: string, adminNotes?: string) {
  try {
    await connectDB();

    const request = await EnrollmentRequest.findById(requestId);
    if (!request) {
      return { success: false, error: 'Request not found' };
    }
    if (request.status !== 'PENDING') {
      return { success: false, error: 'Request has already been processed' };
    }

    const studentId = await generateStudentId(request.type);
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Create student account
    await User.create({
      studentId,
      email: request.email,
      password: hashedPassword,
      fullName: request.fullName,
      phone: request.phone,
      role: request.type === 'REGULAR' ? 'REGULAR_STUDENT' : 'ONETOONE_STUDENT',
      courseId: request.courseId,
      courseTitle: request.courseTitle,
      enrollmentType: request.type,
    });

    // Update enrollment status
    request.status = 'APPROVED';
    if (adminNotes) request.adminNotes = adminNotes;
    await request.save();

    // Send approval email
    await sendEmail({
      to: request.email,
      subject: '🎉 HDS - Enrollment Approved!',
      html: enrollmentApprovedTemplate(
        request.fullName,
        studentId,
        request.courseTitle,
        request.type,
        request.email,
        tempPassword
      ),
    });

    revalidatePath('/admin/enrollments');

    return {
      success: true,
      message: 'Enrollment approved and student account created successfully',
    };

  } catch (error: any) {
    console.error('[Approve Enrollment Error]', error);

    if (error.code === 11000) {
      return { success: false, error: 'A user account with this email already exists.' };
    }

    return { success: false, error: 'Failed to approve enrollment. Please try again.' };
  }
}

// ── Reject Enrollment Request ─────────────────────────────────────────────

export async function rejectEnrollmentRequest(requestId: string, reason?: string) {
  try {
    await connectDB();

    const request = await EnrollmentRequest.findById(requestId);
    if (!request) {
      return { success: false, error: 'Request not found' };
    }
    if (request.status !== 'PENDING') {
      return { success: false, error: 'Request has already been processed' };
    }

    request.status = 'REJECTED';
    if (reason?.trim()) request.adminNotes = reason.trim();
    await request.save();

    // Send rejection email
    await sendEmail({
      to: request.email,
      subject: 'HDS - Enrollment Update',
      html: enrollmentRejectedTemplate(request.fullName, request.courseTitle, reason),
    });

    revalidatePath('/admin/enrollments');

    return { success: true, message: 'Enrollment rejected successfully' };

  } catch (error) {
    console.error('[Reject Enrollment Error]', error);
    return { success: false, error: 'Failed to reject enrollment. Please try again.' };
  }
}

// ── Delete Rejected Request (cron job use) ────────────────────────────────

export async function deleteRejectedRequest(requestId: string) {
  try {
    await connectDB();
    await EnrollmentRequest.findByIdAndDelete(requestId);
    return { success: true };
  } catch (error) {
    console.error('[Delete Request Error]', error);
    return { success: false, error: 'Failed to delete request' };
  }
}