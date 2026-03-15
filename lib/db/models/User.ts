import mongoose, { Schema, Document, Types } from 'mongoose';

export type UserRole = 'ADMIN' | 'REGULAR_STUDENT' | 'ONETOONE_STUDENT';

export interface IUser extends Document {
  _id: Types.ObjectId;
  studentId: string; 
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: UserRole;
  courseId: string;
  courseTitle: string;
  enrollmentType: 'REGULAR' | 'ONE_TO_ONE';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: true }, // Auth ke liye select true rakhein
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['ADMIN', 'REGULAR_STUDENT', 'ONETOONE_STUDENT'], 
      required: true 
    },
    courseId: { type: String, required: true },
    courseTitle: { type: String, required: true },
    enrollmentType: { 
      type: String, 
      enum: ['REGULAR', 'ONE_TO_ONE'], 
      required: true 
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
