import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Student from '@/models/Student';

export async function GET(request: Request) {
  try {
    // URL se studentId nikalna
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json({ success: false, message: "Student ID is required" }, { status: 400 });
    }

    // Database connection
    // await dbConnect();

    // Database query (Password exclude kar diya security ke liye)
    // const student = await Student.findOne({ studentId }).select('-password');

    // MOCK DATA: Jab tak aap DB connect na karein, testing ke liye yeh use hoga
    const student = {
      _id: "69b2e4d3d54e149acfea1b68",
      studentId: studentId,
      email: "Hassan digital skills",
      fullName: "HDS Administrator",
      phone: "+92-300-1234567",
      role: "ADMIN",
      courseId: "admin",
      courseTitle: "System Admin",
      enrollmentType: "REGULAR",
      isActive: true, // Verification ke liye main field
      createdAt: "2026-03-12T16:07:47.890Z"
    };

    // Agar student na mile
    if (!student || student.studentId !== studentId) {
      return NextResponse.json({ success: false, message: "Student record not found!" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: student }, { status: 200 });

  } catch (error) {
    console.error("Verification API Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}