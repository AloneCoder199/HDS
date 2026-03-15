import * as z from "zod";

// Ye export missing hai, isay add karen:
export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Type export bhi zaroori hai
export type ContactSchema = z.infer<typeof contactSchema>;

// Pehle se mojood loginSchema wahan rehne den
export const loginSchema = z.object({
  // aapka login logic...
});
