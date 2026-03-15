import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import CourseContent from '@/lib/db/models/course-content';
import LectureSchedule from '@/lib/db/models/lecture-schedule';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const studentId = searchParams.get('studentId');
    
    let result: any = {};
    
    // Get all content
    const allContent = await CourseContent.find().lean();
    result.allContent = allContent;
    result.contentCount = allContent.length;
    
    // Get content for specific course
    if (courseId) {
      const courseContent = await CourseContent.find({ 
        courseId,
        isActive: true 
      }).lean();
      result.courseContent = courseContent;
      result.courseContentCount = courseContent.length;
    }
    
    // Get all schedules
    const allSchedules = await LectureSchedule.find().lean();
    result.allSchedules = allSchedules;
    result.scheduleCount = allSchedules.length;
    
    // Get schedules for specific course
    if (courseId) {
      const courseSchedules = await LectureSchedule.find({ 
        courseId 
      }).lean();
      result.courseSchedules = courseSchedules;
      result.courseScheduleCount = courseSchedules.length;
    }
    
    return NextResponse.json({
      success: true,
      ...result,
      message: 'Debug data retrieved'
    });
    
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 });
  }
}