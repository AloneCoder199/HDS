import mongoose, { Schema, Document, Model } from 'mongoose';

export type ContactStatus = 'NEW' | 'REPLIED' | 'CLOSED';

export interface IContactRequest extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactStatus;
  adminReply?: string;
  repliedAt?: Date;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactRequestSchema = new Schema<IContactRequest>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['NEW', 'REPLIED', 'CLOSED'], 
      default: 'NEW' 
    },
    adminReply: { type: String },
    repliedAt: { type: Date },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

// Indexes for rate limiting
ContactRequestSchema.index({ email: 1, createdAt: -1 });
ContactRequestSchema.index({ ipAddress: 1, createdAt: -1 });

// Model initialization with explicit typing to fix module error
const ContactRequest: Model<IContactRequest> = mongoose.models.ContactRequest || 
  mongoose.model<IContactRequest>('ContactRequest', ContactRequestSchema);

export default ContactRequest;
