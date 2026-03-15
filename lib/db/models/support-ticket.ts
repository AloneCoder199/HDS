import mongoose, { Schema, Document } from 'mongoose';

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

// 1. Pure Interface (For your logic/frontend)
export interface ISupportTicket {
  _id: string; 
  studentId: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  message: string;
  status: TicketStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  adminReply?: string;
  repliedAt?: Date;
  repliedBy?: string;
  replyHistory: {
    message: string;
    repliedBy: string;
    repliedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Document Interface (Fixes the ID conflict)
export interface ISupportTicketDocument extends Omit<ISupportTicket, '_id'>, Document {
  _id: any; 
}

const SupportTicketSchema = new Schema<ISupportTicketDocument>(
  {
    // Agar custom ID bhej rahe ho toh:
    _id: { type: String, required: true },
    studentId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    studentName: { type: String, required: true, trim: true },
    studentEmail: { type: String, required: true, lowercase: true },
    courseId: { type: String, required: true },
    courseTitle: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
      default: 'OPEN'
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      default: 'MEDIUM'
    },
    adminReply: { type: String },
    repliedAt: { type: Date },
    repliedBy: { type: String },
    replyHistory: [{
      message: { type: String, required: true },
      repliedBy: { type: String, required: true },
      repliedAt: { type: Date, default: Date.now }
    }],
  },
  { 
    timestamps: true,
    versionKey: false,
    _id: false // Custom string IDs ke liye zaroori hai
  }
);

const SupportTicket = mongoose.models.SupportTicket || 
  mongoose.model<ISupportTicketDocument>('SupportTicket', SupportTicketSchema);

export default SupportTicket;
