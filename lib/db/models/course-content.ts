import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICourseContent extends Document {
  _id: Types.ObjectId; // Ab yeh error nahi dega
  courseId: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: 'PDF' | 'VIDEO' | 'LINK' | 'DOC';
  fileSize?: string;
  uploadedBy: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseContentSchema = new Schema<ICourseContent>(
  {
    // Agar courseId kisi doosre model ki reference hai, 
    // toh 'String' ki jagah 'Types.ObjectId' use karna behtar hai.
    courseId: { type: String, required: true, index: true }, 
    title: { type: String, required: true, trim: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    fileType: { 
      type: String, 
      enum: ['PDF', 'VIDEO', 'LINK', 'DOC'], 
      default: 'PDF' 
    },
    fileSize: { type: String },
    uploadedBy: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { 
    timestamps: true,
    versionKey: false // Optional: __v field hatane ke liye
  }
);

// Professional check for existing models (Next.js/Serverless compatibility)
const CourseContent = mongoose.models.CourseContent || 
  mongoose.model<ICourseContent>('CourseContent', CourseContentSchema);

export default CourseContent;
