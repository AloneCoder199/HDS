'use server';

import connectDB from '@/lib/db/connect';
import { v4 as uuidv4 } from 'uuid';
import CourseContent from '@/lib/db/models/course-content';
import LectureSchedule from '@/lib/db/models/lecture-schedule';
import Certificate from '@/lib/db/models/certificate';
import SupportTicket from '@/lib/db/models/support-ticket';
import OneToOneSession from '@/lib/db/models/onetoone-session';
import { revalidatePath } from 'next/cache';
import { sendEmail } from '@/lib/email/service';
import { supportReplyTemplate } from '@/lib/email/templates';

// Helper: Mongoose objects ko plain JavaScript objects mein convert karta hai
const serialize = <T>(data: T): T => JSON.parse(JSON.stringify(data));

// ==================== COURSE CONTENT ====================

export async function uploadCourseContent(data: {
  courseId: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: 'PDF' | 'VIDEO' | 'LINK' | 'DOC';
  fileSize?: string;
  uploadedBy: string;
}) {
  try {
    await connectDB();
    
    const content = await CourseContent.create({
      ...data,
      isActive: true,
      order: await CourseContent.countDocuments({ courseId: data.courseId }) + 1,
    });
    
    revalidatePath(`/admin/courses/${data.courseId}`);
    return { success: true, data: serialize(content) }; // ✅ Fixed
  } catch (error) {
    console.error('Upload content error:', error);
    return { success: false, error: 'Failed to upload content' };
  }
}

export async function getCourseContent(courseId: string) {
  try {
    await connectDB();
    
    const content = await CourseContent.find({ 
      courseId, 
      isActive: true 
    })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    
    // ✅ BUG FIX: serialize() add kiya — pehle missing tha
    return { success: true, data: serialize(content) };
  } catch (error) {
    console.error('Get course content error:', error);
    return { success: false, error: 'Failed to fetch content' };
  }
}

export async function deleteCourseContent(contentId: string) {
  try {
    await connectDB();
    await CourseContent.findByIdAndUpdate(contentId, { isActive: false });
    revalidatePath('/admin/courses');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete content' };
  }
}

// ==================== LECTURE SCHEDULE ====================

export async function createLectureSchedule(data: {
  courseId: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  duration: number;
  meetingLink: string;
  meetingPlatform: 'ZOOM' | 'GOOGLE_MEET' | 'TEAMS' | 'OTHER';
  meetingId?: string;
  passcode?: string;
  instructorName?: string;
  createdBy: string;
}) {
  try {
    await connectDB();
    
    const customId = `lec_${crypto.randomUUID()}`;

    const schedule = await LectureSchedule.create({
      _id: customId,
      ...data,
      status: 'SCHEDULED',
      isRecorded: false,
      assignedStudents: [],
    });
    
    revalidatePath('/admin/schedule');
    
    return { 
      success: true, 
      data: serialize(schedule) // ✅ Fixed
    };
  } catch (error: any) {
    console.error('Create schedule error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to create schedule' 
    };
  }
}

export async function getLectureSchedules(filters?: {
  courseId?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
}) {
  try {
    await connectDB();
    
    const query: any = {};
    if (filters?.courseId) query.courseId = filters.courseId;
    if (filters?.status) query.status = filters.status;
    if (filters?.dateFrom || filters?.dateTo) {
      query.date = {};
      if (filters.dateFrom) query.date.$gte = filters.dateFrom;
      if (filters.dateTo) query.date.$lte = filters.dateTo;
    }
    
    const schedules = await LectureSchedule.find(query)
      .sort({ date: 1, time: 1 })
      .lean();
    
    return { success: true, data: serialize(schedules) }; // ✅ Fixed
  } catch (error) {
    return { success: false, error: 'Failed to fetch schedules' };
  }
}

export async function getStudentSchedules(studentId: string, courseId: string, userRole?: 'REGULAR' | 'ONETOONE') {
  try {
    await connectDB();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let query: any = {
      courseId,
      date: { $gte: today },
      status: { $nin: ['CANCELLED'] }
    };

    if (!userRole || userRole === 'REGULAR') {
      const allSchedules = await LectureSchedule.find(query)
        .sort({ date: 1, time: 1 })
        .lean();
      
      const filteredSchedules = allSchedules.filter((schedule: any) => {
        const assigned = schedule.assignedStudents || [];
        return assigned.length === 0 || assigned.includes(studentId);
      });
      
      // ✅ BUG FIX: serialize() add kiya — pehle missing tha
      return { success: true, data: serialize(filteredSchedules) };
    }
    
    const schedules = await LectureSchedule.find({
      ...query,
      assignedStudents: { $in: [studentId] }
    })
      .sort({ date: 1, time: 1 })
      .lean();
    
    // ✅ BUG FIX: serialize() add kiya — pehle missing tha
    return { success: true, data: serialize(schedules) };
    
  } catch (error) {
    console.error('Get student schedules error:', error);
    return { success: false, error: 'Failed to fetch schedules' };
  }
}


export async function getStudentTickets(studentId: string) {
  try {
    await connectDB();
    
    const tickets = await SupportTicket.find({ studentId })
      .sort({ createdAt: -1 })
      .lean();
    
    return { success: true, data: JSON.parse(JSON.stringify(tickets)) };
  } catch (error) {
    console.error('Get student tickets error:', error);
    return { success: false, error: 'Failed to fetch tickets' };
  }
}


export async function updateScheduleStatus(
  scheduleId: string, 
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED',
  recordingUrl?: string
) {
  try {
    await connectDB();
    
    const update: any = { status };
    if (recordingUrl) {
      update.recordingUrl = recordingUrl;
      update.isRecorded = true;
    }
    
    await LectureSchedule.findByIdAndUpdate(scheduleId, update);
    revalidatePath('/admin/schedule');
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update schedule' };
  }
}

export async function deleteLectureSchedule(scheduleId: string) {
  try {
    await connectDB();
    await LectureSchedule.findByIdAndDelete(scheduleId);
    revalidatePath('/admin/schedule');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete schedule' };
  }
}

// ==================== CERTIFICATES ====================

export async function uploadCertificate(data: {
  studentId: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  certificateUrl: string;
  issueDate: Date;
  grade?: string;
  remarks?: string;
  uploadedBy: string;
}) {
  try {
    await connectDB();
    
    const year = new Date().getFullYear();
    const coursePrefix = data.courseId.substring(0, 2).toUpperCase();
    const count = await Certificate.countDocuments({ 
      issueDate: { 
        $gte: new Date(year, 0, 1),
        $lte: new Date(year, 11, 31)
      }
    });
    const certificateNumber = `HDS-${coursePrefix}-${year}-${String(count + 1).padStart(3, '0')}`;
    
    const certificate = await Certificate.create({
      ...data,
      certificateNumber,
      status: 'ACTIVE',
    });
    
    await sendEmail({
      to: data.studentEmail,
      subject: '🎓 Your HDS Certificate is Ready!',
      html: `
        <h1>Congratulations ${data.studentName}!</h1>
        <p>Your certificate for <strong>${data.courseTitle}</strong> has been issued.</p>
        <p>Certificate Number: <strong>${certificateNumber}</strong></p>
        <p>Login to your dashboard to download your certificate.</p>
      `
    });
    
    revalidatePath('/admin/certificates');
    return { success: true, data: serialize(certificate) }; // ✅ Fixed
  } catch (error) {
    console.error('Upload certificate error:', error);
    return { success: false, error: 'Failed to upload certificate' };
  }
}

export async function getStudentCertificates(studentId: string) {
  try {
    await connectDB();
    const certificates = await Certificate.find({ 
      studentId, 
      status: 'ACTIVE' 
    })
      .sort({ issueDate: -1 })
      .lean();
    return { success: true, data: serialize(certificates) }; // ✅ Fixed
  } catch (error) {
    return { success: false, error: 'Failed to fetch certificates' };
  }
}

export async function revokeCertificate(certificateId: string, reason: string) {
  try {
    await connectDB();
    await Certificate.findByIdAndUpdate(certificateId, {
      status: 'REVOKED',
      remarks: reason,
    });
    revalidatePath('/admin/certificates');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to revoke certificate' };
  }
}

// ==================== SUPPORT TICKETS ====================

export async function getSupportTickets(filters?: {
  status?: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  courseId?: string;
}) {
  try {
    await connectDB();
    
    const query: any = {};
    if (filters?.status) query.status = filters.status;
    if (filters?.priority) query.priority = filters.priority;
    if (filters?.courseId) query.courseId = filters.courseId;
    
    const tickets = await SupportTicket.find(query)
      .sort({ createdAt: -1 })
      .lean();
    
    return { success: true, data: serialize(tickets) }; // ✅ Fixed
  } catch (error) {
    return { success: false, error: 'Failed to fetch tickets' };
  }
}

export async function replyToTicket(
  ticketId: string,
  reply: string,
  adminId: string,
  adminName: string,
  status: 'IN_PROGRESS' | 'RESOLVED' = 'RESOLVED'
) {
  try {
    await connectDB();
    
    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return { success: false, error: 'Ticket not found' };
    }
    
    ticket.replyHistory.push({
      message: reply,
      repliedBy: adminName,
      repliedAt: new Date(),
    });
    
    ticket.adminReply = reply;
    ticket.repliedAt = new Date();
    ticket.repliedBy = adminId;
    ticket.status = status;
    
    await ticket.save();
    
    await sendEmail({
      to: ticket.studentEmail,
      subject: 'Re: Your Support Request - HDS',
      html: supportReplyTemplate(ticket.studentName, ticket.subject, reply, status)
    });
    
    revalidatePath('/admin/support');
    return { success: true, data: serialize(ticket) }; // ✅ Fixed
  } catch (error) {
    console.error('Reply to ticket error:', error);
    return { success: false, error: 'Failed to send reply' };
  }
}

// ==================== ONE-TO-ONE SESSIONS ====================

export async function createOneToOneSession(data: {
  studentId: string;
  userId: string;
  studentName: string;
  courseId: string;
  requestedDate: Date;
  requestedTime: string;
  topic: string;
  description?: string;
}) {
  try {
    await connectDB();
    
    const session = await OneToOneSession.create({
      ...data,
      status: 'REQUESTED',
    });
    
    return { success: true, data: serialize(session) }; // ✅ Fixed
  } catch (error) {
    return { success: false, error: 'Failed to create session request' };
  }
}

export async function getOneToOneSessions(studentId?: string) {
  try {
    await connectDB();
    
    const query: any = {};
    if (studentId) {
      query.studentId = studentId;
    }
    
    const sessions = await OneToOneSession.find(query)
      .sort({ createdAt: -1 })
      .lean();
    
    // ✅ BUG FIX: serialize() add kiya — pehle missing tha, yahi error ka main cause tha
    return { success: true, data: serialize(sessions) };
  } catch (error) {
    return { success: false, error: 'Failed to fetch sessions' };
  }
}

export async function approveOneToOneSession(
  sessionId: string,
  meetingLink: string,
  meetingPlatform: string,
  adminNotes?: string
) {
  try {
    await connectDB();
    
    const session = await OneToOneSession.findByIdAndUpdate(sessionId, {
      status: 'APPROVED',
      meetingLink,
      meetingPlatform,
      adminNotes,
      approvedDate: new Date(),
    }, { new: true });
    
    await sendEmail({
      to: session.studentEmail || '',
      subject: 'Your One-to-One Session is Confirmed',
      html: `
        <h1>Session Confirmed!</h1>
        <p>Your one-to-one session for "${session.topic}" has been approved.</p>
        <p><strong>Date:</strong> ${new Date(session.requestedDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${session.requestedTime}</p>
        <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
        ${adminNotes ? `<p><strong>Notes:</strong> ${adminNotes}</p>` : ''}
      `
    });
    
    return { success: true, data: serialize(session) }; // ✅ Fixed
  } catch (error) {
    return { success: false, error: 'Failed to approve session' };
  }
}