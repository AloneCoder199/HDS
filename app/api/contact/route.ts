import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import ContactRequest from '@/lib/db/models/contact-request';
import { contactFormSchema } from '@/lib/validations/contact';
import { sendEmail } from '@/lib/email/service';
import { 
  adminContactNotificationTemplate, 
  userContactConfirmationTemplate 
} from '@/lib/email/templates';

const RATE_LIMIT_MINUTES = 5;

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    const body = await request.json();

     const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        // .flatten() use karne se error messages asaan ho jatay hain
        details: result.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const { name, email, phone, subject, message } = result.data;

    const rateLimitCutoff = new Date(Date.now() - RATE_LIMIT_MINUTES * 60 * 1000);
    
    const recentRequest = await ContactRequest.findOne({
      $or: [
        { email, createdAt: { $gte: rateLimitCutoff } },
        { ipAddress, createdAt: { $gte: rateLimitCutoff } }
      ]
    });

    if (recentRequest) {
      const timeLeft = Math.ceil((recentRequest.createdAt.getTime() + RATE_LIMIT_MINUTES * 60 * 1000 - Date.now()) / 60000);
      return NextResponse.json({
        success: false,
        error: `Please wait ${timeLeft} minutes before submitting another request`,
        rateLimited: true
      }, { status: 429 });
    }

    const year = new Date().getFullYear();
    const count = await ContactRequest.countDocuments({
      createdAt: { $gte: new Date(year, 0, 1) }
    });
    const referenceId = `HDS-CONTACT-${year}-${String(count + 1).padStart(4, '0')}`;

    const contactRequest = await ContactRequest.create({
      name,
      email,
      phone,
      subject,
      message,
      status: 'NEW',
      ipAddress,
    });

    const submittedAt = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Admin Email
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@hassandigitalskills.com',
      subject: `🔔 New Contact Request - ${subject} (${referenceId})`,
      html: adminContactNotificationTemplate({
        name,
        email,
        phone,
        subject,
        message,
        referenceId,
        submittedAt
      })
    });

    // User Confirmation (FIXED: Added email property here)
    await sendEmail({
      to: email,
      subject: `✅ We received your message - ${referenceId}`,
      html: userContactConfirmationTemplate({
        name,
        email, // <-- Ye missing tha
        subject,
        referenceId,
        submittedAt
      })
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
      referenceId,
      data: {
        id: contactRequest._id,
        name,
        email,
        subject
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    }, { status: 500 });
  }
}
