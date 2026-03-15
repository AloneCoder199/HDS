import mongoose, { Schema, Document } from 'mongoose';

// 1. Base Interface
export interface IOneToOneSession {
  _id: string; // Your custom string ID from CourseData
  studentId: string;
  userId: string;
  studentName: string;
  courseId: string;
  requestedDate: Date;
  requestedTime: string;
  topic: string;
  description?: string;
  status: 'REQUESTED' | 'APPROVED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
  adminNotes?: string;
  meetingLink?: string;
  meetingPlatform?: string;
  approvedDate?: Date;
  completedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Document Interface (Fixing ID Conflict)
export interface IOneToOneSessionDocument extends Omit<IOneToOneSession, '_id'>, Document {
  _id: any;
}

const OneToOneSessionSchema = new Schema<IOneToOneSessionDocument>(
  {
    // Custom ID support
    _id: { type: String, required: true },
    studentId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    studentName: { type: String, required: true, trim: true },
    courseId: { type: String, required: true },
    requestedDate: { type: Date, required: true },
    requestedTime: { type: String, required: true },
    topic: { type: String, required: true, trim: true },
    description: { type: String },
    status: { 
      type: String, 
      enum: ['REQUESTED', 'APPROVED', 'COMPLETED', 'CANCELLED', 'REJECTED'],
      default: 'REQUESTED'
    },
    adminNotes: { type: String },
    meetingLink: { type: String },
    meetingPlatform: { type: String },
    approvedDate: { type: Date },
    completedDate: { type: Date },
  },
  { 
    timestamps: true,
    versionKey: false,
    _id: false 
  }
);

const OneToOneSession = mongoose.models.OneToOneSession || 
  mongoose.model<IOneToOneSessionDocument>('OneToOneSession', OneToOneSessionSchema);

export default OneToOneSession;
