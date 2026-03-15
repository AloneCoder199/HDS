// src/types/index.ts
export interface EnrollmentStep1Data {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface EnrollmentStep2Data {
  fatherName: string;
  cnic: string;
  dob: string;
  address: string;
  qualification: string;
  experience?: string;
}

export interface EnrollmentStep3Data {
  courseId: string;
  batch: string;
  paymentMethod: string;
  trxId: string;
  screenshotUrl: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  duration: string;
  batch: ('morning' | 'afternoon' | 'evening')[];
  maxStudents: number;
  image: string;
  syllabus: string[];
  features: string[];
  isActive: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'wallet' | 'bank';
  accountTitle: string;
  accountNumber: string;
  instructions: string[];
  icon: string;
  color: string;
}

export interface StudentDashboardData {
  userId: string;
  name: string;
  email: string;
  mobile: string;
  enrollment: {
    courseName: string;
    batch: string;
    status: string;
    progress: number;
    paymentStatus: string;
  };
  announcements: any[];
}