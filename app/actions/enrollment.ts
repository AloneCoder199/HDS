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
import { mentorships } from '@/data/mentorship';   // 🆕 Changed
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
  city: string;              // 🆕
  education: string;         // 🆕
  mentorshipSlug: string;    // 🆕 (replaces courseId)
  preferredTime?: string;
  specificRequirements?: string;
  paymentMethod: 'EASYPAISA' | 'JAZZCASH' | 'BANK_TRANSFER';
  transactionId: string;
  paymentScreenshot: string;
}) {
  try {
    await connectDB();

    // ═══ Validate mentorship ═══
    const mentorship = mentorships.find((m) => m.slug === data.mentorshipSlug);
    if (!mentorship) {
      return { success: false, error: 'Mentorship not found.' };
    }

    // ═══ Server-side price calculation (never trust client) ═══
    const paymentAmount =
      data.type === 'ONE_TO_ONE' ? mentorship.oneToOneFee : mentorship.fee;

    // ═══ Validate required fields ═══
    if (!data.fullName?.trim()) {
      return { success: false, error: 'Full name is required.' };
    }
    if (!data.email?.trim()) {
      return { success: false, error: 'Email is required.' };
    }
    if (!data.phone?.trim()) {
      return { success: false, error: 'Phone is required.' };
    }
    if (!data.paymentMethod) {
      return { success: false, error: 'Payment method is required.' };
    }
    if (!data.transactionId?.trim()) {
      return { success: false, error: 'Transaction ID is required.' };
    }
    if (!data.paymentScreenshot?.trim()) {
      return { success: false, error: 'Payment screenshot is required.' };
    }

    // ═══ Check for duplicate pending request ═══
    const existingRequest = await EnrollmentRequest.findOne({
      email: data.email.toLowerCase(),
      status: 'PENDING',
    });
    if (existingRequest) {
      return {
        success: false,
        error:
          'You already have a pending enrollment request. Please wait for admin approval.',
      };
    }

    // ═══ Check for existing account ═══
    const existingUser = await User.findOne({ email: data.email.toLowerCase() });
    if (existingUser) {
      return {
        success: false,
        error: 'An account with this email already exists. Please login.',
      };
    }

    // ═══ Create enrollment ═══
    // Note: DB schema uses `courseId` / `courseTitle` — mapping mentorship data into them
    const request = await EnrollmentRequest.create({
      type: data.type,
      fullName: data.fullName.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      // Map mentorship → course fields
      courseId: data.mentorshipSlug,        // mentorship slug
      courseTitle: mentorship.name,         // mentorship name
      // 1-to-1 extra fields
      preferredTime: data.preferredTime ?? undefined,
      specificRequirements: data.specificRequirements ?? undefined,
      // Payment
      paymentMethod: data.paymentMethod,
      transactionId: data.transactionId.trim(),
      paymentAmount,                        // ✅ server-calculated
      paymentScreenshot: data.paymentScreenshot.trim(),
      paymentDate: new Date(),
      status: 'PENDING',
      // Note: city/education stored only if model has these fields
      ...(data.city ? { city: data.city.trim() } : {}),
      ...(data.education ? { education: data.education.trim() } : {}),
    } as any);

    console.log('[Enrollment Created]', {
      id: request._id,
      email: request.email,
      type: data.type,
      mentorship: mentorship.name,
      paymentAmount,
    });

    // ═══ Send confirmation email ═══
    try {
      await sendEmail({
        to: data.email,
        subject: 'HDS — Enrollment Request Received',
        html: enrollmentSubmittedTemplate(
          data.fullName,
          mentorship.name,
          data.type,
          data.transactionId,
          paymentAmount
        ),
      });
    } catch (emailErr) {
      console.error('[Email Error]', emailErr);
      // Don't fail enrollment if email fails
    }

    revalidatePath('/admin/enrollments');

    return {
      success: true,
      message: 'Enrollment request submitted successfully! Check your email.',
      requestId: request._id.toString(),
    };
  } catch (error: any) {
    console.error('[Submit Enrollment Error]', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map((e: any) => e.message)
        .join(', ');
      return { success: false, error: `Validation failed: ${messages}` };
    }

    if (error.code === 11000) {
      return {
        success: false,
        error:
          'This transaction ID has already been used. Please check your payment details.',
      };
    }

    return {
      success: false,
      error: 'Failed to submit enrollment. Please try again.',
    };
  }
}

// ── Get All Enrollment Requests (Admin) — unchanged ────────────────────────

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
        'paymentMethod', 'transactionId', 'paymentAmount', 'paymentScreenshot', 'paymentDate',
      ])
      .lean();

    const serialized = JSON.parse(JSON.stringify(requests));
    return { success: true, data: serialized };
  } catch (error) {
    console.error('[Get Enrollments Error]', error);
    return { success: false, error: 'Failed to fetch enrollment requests' };
  }
}

// ── Approve — maps to mentorships now ──────────────────────────────────────

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

    await User.create({
      studentId,
      email: request.email,
      password: hashedPassword,
      fullName: request.fullName,
      phone: request.phone,
      role: request.type === 'REGULAR' ? 'REGULAR_STUDENT' : 'ONETOONE_STUDENT',
      courseId: request.courseId,       // stores mentorship slug
      courseTitle: request.courseTitle, // stores mentorship name
      enrollmentType: request.type,
    });

    request.status = 'APPROVED';
    if (adminNotes) request.adminNotes = adminNotes;
    await request.save();

    try {
      await sendEmail({
        to: request.email,
        subject: '🎉 HDS — Enrollment Approved!',
        html: enrollmentApprovedTemplate(
          request.fullName,
          studentId,
          request.courseTitle,
          request.type,
          request.email,
          tempPassword
        ),
      });
    } catch (emailErr) {
      console.error('[Approval Email Error]', emailErr);
    }

    revalidatePath('/admin/enrollments');

    return {
      success: true,
      message: 'Enrollment approved and student account created.',
    };
  } catch (error: any) {
    console.error('[Approve Enrollment Error]', error);
    if (error.code === 11000) {
      return { success: false, error: 'A user account with this email already exists.' };
    }
    return { success: false, error: 'Failed to approve enrollment.' };
  }
}

// ── Reject — unchanged ─────────────────────────────────────────────────────

export async function rejectEnrollmentRequest(requestId: string, reason?: string) {
  try {
    await connectDB();
    const request = await EnrollmentRequest.findById(requestId);
    if (!request) return { success: false, error: 'Request not found' };
    if (request.status !== 'PENDING')
      return { success: false, error: 'Request has already been processed' };

    request.status = 'REJECTED';
    if (reason?.trim()) request.adminNotes = reason.trim();
    await request.save();

    try {
      await sendEmail({
        to: request.email,
        subject: 'HDS — Enrollment Update',
        html: enrollmentRejectedTemplate(request.fullName, request.courseTitle, reason),
      });
    } catch (e) {
      console.error('[Reject Email Error]', e);
    }

    revalidatePath('/admin/enrollments');
    return { success: true, message: 'Enrollment rejected successfully' };
  } catch (error) {
    console.error('[Reject Enrollment Error]', error);
    return { success: false, error: 'Failed to reject enrollment.' };
  }
}

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