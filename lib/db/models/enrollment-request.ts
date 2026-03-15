import mongoose, { Schema, Document } from "mongoose";

export type EnrollmentType = "REGULAR" | "ONE_TO_ONE";
export type EnrollmentStatus = "PENDING" | "APPROVED" | "REJECTED";
export type PaymentMethod = "EASYPAISA" | "JAZZCASH" | "BANK_TRANSFER" | "CASH";

export interface IEnrollmentRequest extends Document {
  type: EnrollmentType;
  fullName: string;
  studentId?: string;
  email: string;
  phone: string;
  courseId: string;
  courseTitle: string;
  preferredTime?: string;
  specificRequirements?: string;
  // Payment fields
  paymentMethod: PaymentMethod;
  transactionId: string;
  paymentAmount: number;
  paymentScreenshot: string;
  paymentDate: Date;
  // Status
  status: EnrollmentStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentRequestSchema = new Schema<IEnrollmentRequest>(
  {
    type: {
      type: String,
      enum: ["REGULAR", "ONE_TO_ONE"],
      required: [true, "Enrollment type is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    studentId: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    courseId: {
      type: String,
      required: [true, "Course ID is required"],
    },
    courseTitle: {
      type: String,
      required: [true, "Course title is required"],
    },
    preferredTime: {
      type: String,
      trim: true,
    },
    specificRequirements: {
      type: String,
      trim: true,
    },

    // ── Payment fields ──────────────────────────────────────────────────
    paymentMethod: {
      type: String,
      enum: ["EASYPAISA", "JAZZCASH", "BANK_TRANSFER", "CASH"],
      required: [true, "Payment method is required"],
    },
    transactionId: {
      type: String,
      required: [true, "Transaction ID is required"],
      trim: true,
      // NOTE: unique: true hataya gaya — purane null records se conflict hota tha
    },
    paymentAmount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [1, "Amount must be greater than 0"],
    },
    paymentScreenshot: {
      type: String,
      required: [true, "Payment screenshot URL is required"],
      trim: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },

    // ── Status ──────────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    adminNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster admin queries
EnrollmentRequestSchema.index({ status: 1, createdAt: -1 });
EnrollmentRequestSchema.index({ email: 1, status: 1 });

const EnrollmentRequest =
  mongoose.models.EnrollmentRequest ||
  mongoose.model<IEnrollmentRequest>(
    "EnrollmentRequest",
    EnrollmentRequestSchema
  );

export default EnrollmentRequest;