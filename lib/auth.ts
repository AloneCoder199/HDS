import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from './db/connect';
import User from './db/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        studentId: { label: "Student ID", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }

        await connectDB();
        
        const user = await User.findOne({ 
          $or: [
            { email: credentials.email },
            { studentId: credentials.studentId }
          ]
        }).select('+password'); 

        if (!user || !user.isActive) {
          throw new Error('No user found or account is inactive');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        user.lastLogin = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullName,
          studentId: user.studentId || "", 
          role: user.role || "REGULAR_STUDENT",
          courseId: user.courseId || "",
          courseTitle: user.courseTitle || "",
          enrollmentType: user.enrollmentType || "REGULAR",
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;           // ✅ FIX 1: yeh line missing thi — id explicitly save karo
        token.role = user.role;
        token.studentId = user.studentId;
        token.courseId = user.courseId;
        token.courseTitle = user.courseTitle;
        token.enrollmentType = user.enrollmentType;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;   // ✅ FIX 2: token.sub ki jagah token.id use karo
        session.user.role = token.role;
        session.user.studentId = token.studentId;
        session.user.courseId = token.courseId;
        session.user.courseTitle = token.courseTitle;
        session.user.enrollmentType = token.enrollmentType;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};