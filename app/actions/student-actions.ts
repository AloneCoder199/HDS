'use server';

import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid'; // Custom ID ke liye npm install uuid
import connectDB from '@/lib/db/connect';
import SupportTicket from '@/lib/db/models/support-ticket';
import OneToOneSession from '@/lib/db/models/onetoone-session';
import Certificate from '@/lib/db/models/certificate'; // Missing import
import LectureSchedule from '@/lib/db/models/lecture-schedule'; // Missing import

// --- Support Tickets ---
export async function createSupportTicket(data: {
  studentId: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  message: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}) {
  try {
    await connectDB();
    
    const ticket = await SupportTicket.create({
      _id: `ticket_${uuidv4()}`, // Custom String ID
      ...data,
      status: 'OPEN',
      priority: data.priority || 'MEDIUM',
      replyHistory: [],
    });
    
    revalidatePath('/dashboard/regular/support');
    return { success: true, data: JSON.parse(JSON.stringify(ticket)) };
  } catch (error) {
    console.error('Create ticket error:', error);
    return { success: false, error: 'Failed to submit question' };
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
    return { success: false, error: 'Failed to fetch tickets' };
  }
}

// --- One To One Sessions ---
export async function requestOneToOneSession(data: {
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
      _id: `session_${uuidv4()}`, // Custom String ID
      ...data,
      status: 'REQUESTED',
    });
    
    revalidatePath('/dashboard/onetoone');
    return { success: true, data: JSON.parse(JSON.stringify(session)) };
  } catch (error) {
    console.error('Request session error:', error);
    return { success: false, error: 'Failed to request session' };
  }
}

// --- Certificates ---
export async function getStudentCertificates(studentId: string) {
  try {
    await connectDB();
    const certificates = await Certificate.find({ 
      studentId, 
      status: 'ACTIVE' 
    })
      .sort({ issueDate: -1 })
      .lean();
    return { success: true, data: JSON.parse(JSON.stringify(certificates)) };
  } catch (error) {
    return { success: false, error: 'Failed to fetch certificates' };
  }
}

// --- Lecture Schedules & Recordings ---
export async function getStudentSchedulesWithRecordings(studentId: string, courseId: string) {
  try {
    await connectDB();
    
    const schedules = await LectureSchedule.find({
      courseId,
      $or: [
        { assignedStudents: { $size: 0 } },
        { assignedStudents: studentId }
      ]
    })
      .sort({ date: -1 })
      .lean();
    
    return { success: true, data: JSON.parse(JSON.stringify(schedules)) };
  } catch (error) {
    console.error('Fetch schedules error:', error);
    return { success: false, error: 'Failed to fetch schedules' };
  }
}


// Add this to your student-actions.ts file

export async function getOneToOneSessions(studentId: string) {
  try {
    await connectDB();
    
    const sessions = await OneToOneSession.find({ studentId })
      .sort({ requestedDate: -1 })
      .lean();
    
    // Server Action se data bhejte waqt stringify zaroori hai
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(sessions)) 
    };
  } catch (error) {
    console.error('Fetch sessions error:', error);
    return { success: false, error: 'Failed to fetch sessions' };
  }
}
