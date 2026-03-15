'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from "next/link"; 
import { 
  User, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Video,
  Target,
  BookOpen,
  LogOut,
  Star,
  CheckCircle,
  Phone,
  MessageCircle,
  Send,
  // WhatsApp,
  Clock3,
  ChevronRight,
  Award,
  FileText,
  Download,
  Play
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { format, parseISO, isToday, isTomorrow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { coursesData } from '@/lib/CourseData';
import { getStudentSchedules, getCourseContent, getStudentCertificates } from '@/app/actions/admin-content';
import { requestOneToOneSession, getOneToOneSessions } from '@/app/actions/student-actions';

interface Schedule {
  _id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  meetingLink: string;
  meetingPlatform: string;
  status: string;
  instructorName?: string;
  isRecorded: boolean;
  recordingUrl?: string;
}

interface Content {
  _id: string;
  title: string;
  fileType: string;
  fileUrl: string;
  createdAt: string;
}

interface Certificate {
  _id: string;
  certificateNumber: string;
  courseTitle: string;
  certificateUrl: string;
  issueDate: string;
  grade?: string;
}

interface OneToOneSession {
  _id: string;
  topic: string;
  requestedDate: string;
  requestedTime: string;
  status: 'REQUESTED' | 'APPROVED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
  meetingLink?: string;
  adminNotes?: string;
}

export function OneToOneDashboard({ session }: { session: any }) {
  const { data: sessionData } = useSession();
  const [activeTab, setActiveTab] = useState('mentor');
  
  // Data states
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [sessions, setSessions] = useState<OneToOneSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Session request form
  const [sessionTopic, setSessionTopic] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  const [requesting, setRequesting] = useState(false);

  const course = coursesData.find(c => c.id === session.user.courseId);
  const user = session.user;

  // WhatsApp and Call settings (these would come from admin settings)
  const supportSettings = {
    whatsappNumber: '+92-300-1234567',
    callNumber: '+92-300-1234567',
    availableHours: '9:00 AM - 9:00 PM',
    responseTime: 'Usually responds in 10-30 minutes',
  };

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    
    const scheduleResult = await getStudentSchedules(user.id, user.courseId);
    if (scheduleResult.success) setSchedules(scheduleResult.data as Schedule[]);
    
    const contentResult = await getCourseContent(user.courseId);
    if (contentResult.success) setContents(contentResult.data as Content[]);
    
    const certResult = await getStudentCertificates(user.id);
    if (certResult.success) setCertificates(certResult.data as Certificate[]);
    
    const sessionResult = await getOneToOneSessions(user.id);
    if (sessionResult.success) setSessions(sessionResult.data as OneToOneSession[]);
    
    setLoading(false);
  }

  async function handleRequestSession(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionTopic.trim() || !sessionDate || !sessionTime) return;
    
    setRequesting(true);
    const result = await requestOneToOneSession({
      studentId: user.id,
      userId: user.id,
      studentName: user.name,
      courseId: user.courseId,
      requestedDate: new Date(sessionDate),
      requestedTime: sessionTime,
      topic: sessionTopic,
      description: sessionDescription,
    });
    
    if (result.success) {
      toast.success('Session requested! Admin will confirm shortly.');
      setSessionTopic('');
      setSessionDate('');
      setSessionTime('');
      setSessionDescription('');
      loadAllData();
    } else {
      toast.error(result.error || 'Failed to request session');
    }
    setRequesting(false);
  }

  const upcomingSchedules = schedules.filter(s => 
    new Date(s.date) >= new Date() && s.status !== 'CANCELLED'
  ).slice(0, 3);

  const approvedSessions = sessions.filter(s => s.status === 'APPROVED');
  const pendingSessions = sessions.filter(s => s.status === 'REQUESTED');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white">HDS Premium</h1>
              <p className="text-xs text-slate-500">One-to-One Learning</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
              {user.studentId}
            </Badge>
            <Button variant="ghost" size="icon" onClick={() => signOut()}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Premium Welcome Banner */}
        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span className="text-cyan-100 font-medium tracking-wide uppercase text-sm">Premium One-to-One Learning</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.name}! 🎯</h2>
            <p className="text-cyan-100 text-lg">Your personal mentor is ready to guide you</p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full max-w-4xl gap-10">
            <TabsTrigger value="mentor" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Mentor</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Sessions</span>
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Materials</span>
            </TabsTrigger>
            <TabsTrigger value="materials" asChild>
  <Link href="/dashboard/videos" className="flex items-center">
    <FileText className="w-4 h-4 mr-1" />
    <span className="hidden sm:inline">Recorded Sessions</span>
  </Link>
</TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="certificate" className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Certificate</span>
            </TabsTrigger>
          </TabsList>

          {/* MENTOR TAB */}
          <TabsContent value="mentor" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Mentor Profile */}
              <div className="lg:col-span-2">
                <Card className="border-cyan-200 dark:border-cyan-800">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
                      <div className="relative">
                        <Avatar className="w-24 h-24 border-4 border-cyan-100 dark:border-cyan-900">
                          <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-3xl font-bold">
                            MK
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Mentor Name</h3>
                          <Badge className="bg-cyan-100 text-cyan-700">Premium Mentor</Badge>
                        </div>
                        <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-3">
                          Senior {course?.category} Expert • 8+ Years Experience
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-lg">
                          Specialized in {course?.title} with extensive industry experience. 
                          Passionate about helping students achieve their goals through personalized guidance.
                        </p>
                        
                        {/* Direct Contact Options */}
                        <div className="flex flex-wrap gap-3">
                          <Button className="bg-green-600 hover:bg-green-700" asChild>
                            <a href={`https://wa.me/${supportSettings.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              WhatsApp
                            </a>
                          </Button>
                          <Button variant="outline" asChild>
                            <a href={`tel:${supportSettings.callNumber}`}>
                              <Phone className="w-4 h-4 mr-2" />
                              Direct Call
                            </a>
                          </Button>
                          <Button variant="outline">
                            <Video className="w-4 h-4 mr-2" />
                            Video Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">12</p>
                      <p className="text-sm text-slate-500">Sessions Completed</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">24h</p>
                      <p className="text-sm text-slate-500">Total Learning</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-3xl font-bold text-green-600">98%</p>
                      <p className="text-sm text-slate-500">Attendance</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar - Contact Info */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Direct Support
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-cyan-100 text-sm mb-1">WhatsApp</p>
                        <p className="font-semibold text-lg">{supportSettings.whatsappNumber}</p>
                        <p className="text-xs text-cyan-200 mt-1">{supportSettings.responseTime}</p>
                      </div>
                      <div className="pt-4 border-t border-white/20">
                        <p className="text-cyan-100 text-sm mb-1">Available Hours</p>
                        <p className="font-semibold">{supportSettings.availableHours}</p>
                      </div>
                      <div className="pt-4 border-t border-white/20">
                        <p className="text-cyan-100 text-sm mb-1">Direct Call</p>
                        <p className="font-semibold">{supportSettings.callNumber}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Learning Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { goal: 'Complete React Advanced', progress: 80 },
                        { goal: 'Build Portfolio Project', progress: 60 },
                        { goal: 'Master Node.js', progress: 40 },
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-700 dark:text-slate-300">{item.goal}</span>
                            <span className="text-cyan-600 font-medium">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${item.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* SCHEDULE TAB */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upcoming Sessions */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Your Private Sessions
                </h3>

                {upcomingSchedules.length === 0 && approvedSessions.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-slate-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                      <p>No upcoming sessions</p>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {upcomingSchedules.map((schedule) => {
                      const scheduleDate = parseISO(schedule.date);
                      const isTodayClass = isToday(scheduleDate);
                      const isTomorrowClass = isTomorrow(scheduleDate);
                      
                      return (
                        <Card key={schedule._id} className={isTodayClass ? 'border-cyan-400 shadow-lg' : ''}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-4">
                                <div className={`
                                  w-16 h-16 rounded-xl flex flex-col items-center justify-center
                                  ${isTodayClass ? 'bg-cyan-100 text-cyan-700' : 'bg-slate-100 text-slate-700'}
                                `}>
                                  <span className="text-xs font-bold uppercase">
                                    {isTodayClass ? 'Today' : isTomorrowClass ? 'Tomorrow' : format(scheduleDate, 'MMM')}
                                  </span>
                                  <span className="text-xl font-bold">{format(scheduleDate, 'dd')}</span>
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">{schedule.title}</h4>
                                  <p className="text-cyan-600 dark:text-cyan-400 font-medium">{schedule.time}</p>
                                  <p className="text-slate-500 text-sm">{schedule.duration} minutes • {schedule.meetingPlatform}</p>
                                  {schedule.instructorName && (
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                      with {schedule.instructorName}
                                    </p>
                                  )}
                                </div>
                              </div>
                              
                              <Button 
                                className={isTodayClass ? 'bg-cyan-600 hover:bg-cyan-700' : ''}
                                asChild
                              >
                                <a href={schedule.meetingLink} target="_blank" rel="noopener noreferrer">
                                  {isTodayClass ? 'Join Now' : 'Join'}
                                  <ChevronRight className="w-4 h-4 ml-1" />
                                </a>
                              </Button>
                            </div>

                            {schedule.isRecorded && schedule.recordingUrl && (
                              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <Button variant="outline" size="sm" asChild>
                                  <a href={schedule.recordingUrl} target="_blank" rel="noopener noreferrer">
                                    <Play className="w-4 h-4 mr-2" />
                                    Watch Recording
                                  </a>
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </>
                )}

                {/* Request New Session */}
                <Card className="border-dashed border-2 border-cyan-300 dark:border-cyan-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Send className="w-5 h-5 mr-2" />
                      Request New Session
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRequestSession} className="space-y-4">
                      <Input
                        placeholder="What topic do you want to cover?"
                        value={sessionTopic}
                        onChange={(e) => setSessionTopic(e.target.value)}
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="date"
                          value={sessionDate}
                          onChange={(e) => setSessionDate(e.target.value)}
                          required
                        />
                        <Input
                          type="time"
                          value={sessionTime}
                          onChange={(e) => setSessionTime(e.target.value)}
                          required
                        />
                      </div>
                      <Textarea
                        placeholder="Any specific requirements or questions?"
                        value={sessionDescription}
                        onChange={(e) => setSessionDescription(e.target.value)}
                        rows={3}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-cyan-600 hover:bg-cyan-700"
                        disabled={requesting}
                      >
                        {requesting ? (
                          <>
                            <Clock3 className="w-4 h-4 mr-2 animate-spin" />
                            Requesting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Request Session
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Session History */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center mb-4">
                  <Clock className="w-5 h-5 mr-2" />
                  Session History
                </h3>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {sessions.length === 0 ? (
                        <p className="text-center text-slate-500 py-4">No session history yet</p>
                      ) : (
                        sessions.map((session) => (
                          <div 
                            key={session._id} 
                            className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                          >
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-white">{session.topic}</h4>
                              <p className="text-sm text-slate-500">
                                {format(new Date(session.requestedDate), 'MMM dd, yyyy')} at {session.requestedTime}
                              </p>
                            </div>
                            <Badge className={
                              session.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                              session.status === 'REQUESTED' ? 'bg-amber-100 text-amber-700' :
                              session.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                              'bg-red-100 text-red-700'
                            }>
                              {session.status}
                            </Badge>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* MATERIALS TAB */}
          <TabsContent value="materials" className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Your Learning Materials
            </h3>

            {contents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>No materials uploaded yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contents.map((content) => (
                  <Card key={content._id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                        {content.fileType === 'PDF' && <FileText className="w-6 h-6 text-cyan-600" />}
                        {content.fileType === 'VIDEO' && <Play className="w-6 h-6 text-purple-600" />}
                        {content.fileType === 'LINK' && <Download className="w-6 h-6 text-green-600" />}
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                        {content.title}
                      </h4>
                      <p className="text-sm text-slate-500 mb-4">
                        {content.fileType} • {format(new Date(content.createdAt), 'MMM dd')}
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={content.fileUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* SUPPORT TAB */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Direct Contact */}
              <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <MessageCircle className="w-6 h-6 mr-3" />
                    Instant Support
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">WhatsApp Support</p>
                        <p className="text-green-100 text-sm">{supportSettings.responseTime}</p>
                      </div>
                      <Button className="bg-white text-green-600 hover:bg-green-50" asChild>
                        <a href={`https://wa.me/${supportSettings.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                          Chat
                        </a>
                      </Button>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">Direct Call</p>
                        <p className="text-green-100 text-sm">{supportSettings.availableHours}</p>
                      </div>
                      <Button className="bg-white text-green-600 hover:bg-green-50" asChild>
                        <a href={`tel:${supportSettings.callNumber}`}>
                          Call
                        </a>
                      </Button>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Video className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">Video Call</p>
                        <p className="text-green-100 text-sm">Schedule a video session</p>
                      </div>
                      <Button className="bg-white text-green-600 hover:bg-green-50" onClick={() => setActiveTab('schedule')}>
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ / Help */}
              <Card>
                <CardHeader>
                  <CardTitle>Common Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { q: 'How do I reschedule a session?', a: 'Go to Schedule tab and click "Reschedule" on any upcoming session.' },
                      { q: 'Can I request extra sessions?', a: 'Yes! Use the "Request New Session" form in the Schedule tab.' },
                      { q: 'How do I contact my mentor urgently?', a: 'Use WhatsApp for quick responses or direct call during available hours.' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="font-medium text-slate-900 dark:text-white mb-1">{item.q}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CERTIFICATE TAB */}
          <TabsContent value="certificate" className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Your Achievement
            </h3>

            {certificates.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-12 h-12 text-amber-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Complete Your Course!
                  </h4>
                  <p className="text-slate-500 max-w-md mx-auto mb-6">
                    Finish all your one-to-one sessions and assignments to earn your personalized certificate.
                  </p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 max-w-xs mx-auto mb-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full" style={{ width: '40%' }} />
                  </div>
                  <p className="text-sm text-slate-500">40% completed • 12/30 sessions done</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <Card key={cert._id} className="border-amber-200 dark:border-amber-800 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-amber-100 text-sm mb-1">HDS Premium Certificate</p>
                          <h4 className="text-2xl font-bold">{cert.courseTitle}</h4>
                        </div>
                        <Award className="w-16 h-16 text-white/30" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Certificate #</span>
                          <span className="font-mono font-medium text-slate-900 dark:text-white">{cert.certificateNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Issue Date</span>
                          <span className="font-medium text-slate-900 dark:text-white">{format(new Date(cert.issueDate), 'MMMM dd, yyyy')}</span>
                        </div>
                        {cert.grade && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Grade</span>
                            <span className="font-bold text-green-600 text-lg">{cert.grade}</span>
                          </div>
                        )}
                        <div className="pt-4">
                          <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" asChild>
                            <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-2" />
                              Download Certificate
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}