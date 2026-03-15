import mongoose, { Schema, Document } from 'mongoose';

// 1. Base Interface (Jo aapka raw data hai)
export interface ILectureSchedule {
  _id: string; // Aapka custom string ID
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
  isRecorded: boolean;
  recordingUrl?: string;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED';
  assignedStudents: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Document Interface
export interface ILectureScheduleDocument extends ILectureSchedule, Document {
  _id: any; // Mongoose internal conflict fix karne ke liye
}

const LectureScheduleSchema = new Schema<ILectureScheduleDocument>(
  {
    // Agar _id aap khud provide kar rahe hain CourseData se:
    _id: { type: String, required: true }, 
    courseId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: Number, default: 60 },
    meetingLink: { type: String, required: true },
    meetingPlatform: { 
      type: String, 
      enum: ['ZOOM', 'GOOGLE_MEET', 'TEAMS', 'OTHER'],
      default: 'ZOOM'
    },
    meetingId: { type: String },
    passcode: { type: String },
    instructorName: { type: String },
    isRecorded: { type: Boolean, default: false },
    recordingUrl: { type: String },
    status: { 
      type: String, 
      enum: ['SCHEDULED', 'LIVE', 'COMPLETED', 'CANCELLED'],
      default: 'SCHEDULED'
    },
    assignedStudents: [{ type: String }],
    createdBy: { type: String, required: true },
  },
  { 
    timestamps: true,
    versionKey: false,
    _id: false // Kyunki aap apni string ID manually pass kar rahe hain
  }
);

const LectureSchedule = mongoose.models.LectureSchedule || 
  mongoose.model<ILectureScheduleDocument>('LectureSchedule', LectureScheduleSchema);

export default LectureSchedule;
