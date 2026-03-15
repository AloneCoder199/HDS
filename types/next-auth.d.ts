import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    studentId: string;
    courseId: string;
    courseTitle: string;
    enrollmentType: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      studentId: string;
      courseId: string;
      courseTitle: string;
      enrollmentType: string;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    studentId: string;
    courseId: string;
    courseTitle: string;
    enrollmentType: string;
  }
}
