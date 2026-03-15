export function enrollmentSubmittedTemplate(
  fullName: string, 
  courseTitle: string, 
  type: string,
  transactionId?: string,
  paymentAmount?: number
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563EB, #38BDF8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .status { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; }
        .payment-box { background: #DBEAFE; border: 2px solid #3B82F6; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Enrollment Request Received!</h1>
        </div>
        <div class="content">
          <h2>Assalam-o-Alaikum ${fullName},</h2>
          <p>Thank you for your interest in <strong>Hassan Digital Skills</strong>!</p>
          
          <div class="status">
            <strong>📋 Enrollment Details:</strong><br>
            <strong>Course:</strong> ${courseTitle}<br>
            <strong>Type:</strong> ${type === 'REGULAR' ? 'Regular Class (Group Learning)' : 'One-to-One Session (Private Learning)'}<br>
            <strong>Status:</strong> ⏳ PENDING (Under Review)
          </div>
          
          ${transactionId ? `
          <div class="payment-box">
            <strong>💰 Payment Information:</strong><br>
            <strong>Transaction ID:</strong> ${transactionId}<br>
            <strong>Amount Paid:</strong> PKR ${paymentAmount}<br>
            <p style="margin-top: 10px; font-size: 14px; color: #1E40AF;">
              Your payment has been recorded and will be verified by our admin team.
            </p>
          </div>
          ` : ''}
          
          <p>Your enrollment request has been successfully submitted and is currently under review by our admin team.</p>
          
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>Our team will review your application and payment within 24-48 hours</li>
            <li>You will receive an email notification once a decision is made</li>
            <li>If approved, you will get your Student ID and login credentials</li>
          </ul>
          
          <p>If you have any questions, feel free to reply to this email.</p>
          
          <p>Best regards,<br>
          <strong>Hassan Digital Skills Team</strong></p>
        </div>
        <div class="footer">
          <p>© 2026 Hassan Digital Skills. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function enrollmentApprovedTemplate(
  fullName: string, 
  studentId: string, 
  courseTitle: string, 
  type: string,
  loginEmail: string,
  tempPassword: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10B981, #34D399); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .credentials { background: #DBEAFE; border: 2px solid #3B82F6; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .student-id { font-size: 24px; font-weight: bold; color: #2563EB; text-align: center; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .btn { display: inline-block; background: #2563EB; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Enrollment Approved!</h1>
        </div>
        <div class="content">
          <h2>Congratulations ${fullName}!</h2>
          <p>Your enrollment request has been <strong>APPROVED</strong> by our admin team.</p>
          
          <div class="student-id">
            Your Student ID: ${studentId}
          </div>
          
          <div class="credentials">
            <strong>🔐 Login Credentials:</strong><br>
            <strong>Email:</strong> ${loginEmail}<br>
            <strong>Temporary Password:</strong> ${tempPassword}<br>
            <strong>Course:</strong> ${courseTitle}<br>
            <strong>Type:</strong> ${type === 'REGULAR' ? 'Regular Class' : 'One-to-One Session'}
          </div>
          
          <p style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" class="btn">Login to Your Dashboard</a>
          </p>
          
          <p><strong>Important:</strong></p>
          <ul>
            <li>Please change your password after first login</li>
            <li>Join our WhatsApp group for updates: [Link]</li>
            <li>Your classes will start within 3-5 business days</li>
          </ul>
          
          <p>Welcome to the HDS family! 🚀</p>
          
          <p>Best regards,<br>
          <strong>Hassan Digital Skills Team</strong></p>
        </div>
        <div class="footer">
          <p>© 2026 Hassan Digital Skills. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}


export function supportReplyTemplate(
  studentName: string, 
  subject: string, 
  reply: string, 
  status: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563EB, #38BDF8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .reply-box { background: white; border-left: 4px solid #2563EB; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .status { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .status-resolved { background: #D1FAE5; color: #059669; }
        .status-progress { background: #FEF3C7; color: #D97706; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Support Reply Received</h1>
        </div>
        <div class="content">
          <h2>Hi ${studentName},</h2>
          <p>You have received a reply to your support request regarding:</p>
          <p><strong>"${subject}"</strong></p>
          
          <div class="reply-box">
            <p><strong>Admin Reply:</strong></p>
            <p>${reply}</p>
          </div>
          
          <p>Status: <span class="status ${status === 'RESOLVED' ? 'status-resolved' : 'status-progress'}">${status}</span></p>
          
          <p>If you have any further questions, please don't hesitate to reach out.</p>
          
          <p>Best regards,<br>
          <strong>Hassan Digital Skills Support Team</strong></p>
        </div>
        <div class="footer">
          <p>© 2026 Hassan Digital Skills. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function enrollmentRejectedTemplate(fullName: string, courseTitle: string, reason?: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #EF4444, #F87171); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Enrollment Update</h1>
        </div>
        <div class="content">
          <h2>Dear ${fullName},</h2>
          <p>Thank you for your interest in <strong>${courseTitle}</strong> at Hassan Digital Skills.</p>
          
          <p>After careful review, we regret to inform you that your enrollment request has been <strong>not approved</strong> at this time.</p>
          
          ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
          
          <p>This could be due to:</p>
          <ul>
            <li>Course capacity has been reached</li>
            <li>Prerequisites not met</li>
            <li>Incomplete application information</li>
          </ul>
          
          <p>You are welcome to apply again in the future or contact us for more information.</p>
          
          <p>Best regards,<br>
          <strong>Hassan Digital Skills Team</strong></p>
        </div>
        <div class="footer">
          <p>© 2026 Hassan Digital Skills. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}



export function adminContactNotificationTemplate(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  referenceId: string;
  submittedAt: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563EB, #38BDF8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #2563EB; }
        .message-box { background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .btn { display: inline-block; background: #2563EB; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Contact Request</h1>
          <p>Hassan Digital Skills</p>
        </div>
        <div class="content">
          <h2>Contact Details</h2>
          
          <div class="info-box">
            <p><strong>Reference ID:</strong> ${data.referenceId}</p>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Submitted:</strong> ${data.submittedAt}</p>
          </div>

          <div class="message-box">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>

          <p style="text-align: center;">
            <a href="mailto:${data.email}?subject=Re: ${data.subject}" class="btn">Reply to ${data.name}</a>
          </p>
        </div>
        <div class="footer">
          <p>© 2026 Hassan Digital Skills. Admin Dashboard</p>
        </div>
      </div>
    </body>
    </html>
  `;
}





export function userContactConfirmationTemplate(data: {
  name: string;
  email:string,
  subject: string;
  referenceId: string;
  submittedAt: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10B981, #34D399); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .ref-box { background: #DBEAFE; border: 2px solid #3B82F6; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
        .ref-number { font-size: 24px; font-weight: bold; color: #2563EB; font-family: monospace; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Message Received!</h1>
          <p>Thank you for contacting Hassan Digital Skills</p>
        </div>
        <div class="content">
          <h2>Assalam-o-Alaikum ${data.name},</h2>
          
          <p>We have received your message regarding <strong>"${data.subject}"</strong>.</p>
          
          <div class="ref-box">
            <p style="margin: 0 0 10px 0; color: #6b7280;">Your Reference ID</p>
            <p class="ref-number">${data.referenceId}</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280;">Please keep this for future reference</p>
          </div>

          <p><strong>What happens next?</strong></p>
          <ul>
            <li>Our team will review your request within <strong>24-48 hours</strong></li>
            <li>You will receive a reply at <strong>${data.email}</strong></li>
            <li>For urgent queries, WhatsApp us at: <strong>+92-300-1234567</strong></li>
          </ul>

          <p style="margin-top: 30px;">
            <strong>Submitted on:</strong> ${data.submittedAt}
          </p>

          <p>Best regards,<br>
          <strong>Hassan Digital Skills Team</strong></p>
        </div>
        <div class="footer">
          <p>© 2026 Hassan Digital Skills. All rights reserved.</p>
          <p style="font-size: 12px; margin-top: 10px;">
            This is an automated confirmation. Please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}