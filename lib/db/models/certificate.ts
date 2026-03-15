import mongoose, { Schema, Document } from 'mongoose';

// 1. Base Interface for Frontend/Logic
export interface ICertificate {
  _id: string; // Your custom string ID
  studentId: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  certificateUrl: string;
  certificateNumber: string;
  issueDate: Date;
  expiryDate?: Date;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  grade?: string;
  remarks?: string;
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Document Interface
export interface ICertificateDocument extends Omit<ICertificate, '_id'>, Document {
  _id: any; 
}

const CertificateSchema = new Schema<ICertificateDocument>(
  {
    // Custom String ID handle karne ke liye
    _id: { type: String, required: true },
    studentId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    studentName: { type: String, required: true, trim: true },
    studentEmail: { type: String, required: true, lowercase: true },
    courseId: { type: String, required: true },
    courseTitle: { type: String, required: true },
    certificateUrl: { type: String, required: true },
    certificateNumber: { type: String, required: true, unique: true, trim: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date },
    status: { 
      type: String, 
      enum: ['ACTIVE', 'REVOKED', 'EXPIRED'],
      default: 'ACTIVE'
    },
    grade: { type: String },
    remarks: { type: String },
    uploadedBy: { type: String, required: true },
  },
  { 
    timestamps: true,
    versionKey: false,
    _id: false // MongoDB default ID generation disable kar di
  }
);

// Final Model Export
const Certificate = mongoose.models.Certificate || 
  mongoose.model<ICertificateDocument>('Certificate', CertificateSchema);

export default Certificate;
