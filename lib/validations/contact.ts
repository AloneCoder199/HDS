import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().refine((val) => {
    if (!val) return true;
    // Pakistani/International phone format
    return /^(\+92|0|92)?[ -]?\d{3}[ -]?\d{7}$/.test(val) || 
           /^\+?[1-9]\d{1,14}$/.test(val);
  }, 'Invalid phone number'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;