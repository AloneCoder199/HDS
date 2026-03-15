'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  BookOpen, Users, Calendar, Award, LogOut,
  MessageCircle, FileText, Video, Download,
  Clock3, Send, ChevronRight, Play,
  MessageSquare, HelpCircle,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { coursesData } from '@/lib/CourseData';
import { getStudentSchedules, getCourseContent, getStudentCertificates } from '@/app/actions/admin-content';
import { createSupportTicket, getStudentTickets } from '@/app/actions/student-actions';

interface Schedule {
  _id: string; title: string; date: string; time: string;
  duration: number; meetingLink: string; meetingPlatform: string;
  status: string; isRecorded: boolean; recordingUrl?: string;
}
interface Content {
  _id: string; title: string; fileType: string;
  fileUrl: string; fileSize?: string; createdAt: string;
}
interface Certificate {
  _id: string; certificateNumber: string; courseTitle: string;
  certificateUrl: string; issueDate: string; grade?: string;
}
interface Ticket {
  _id: string; subject: string; message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  adminReply?: string; createdAt: string; repliedAt?: string;
}

export function RegularStudentDashboard({ session }: { session: any }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const user = session.user;
  const course = coursesData.find(c => c.id === user.courseId);

  useEffect(() => {
    loadAllData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ COMPLETE loadAllData — saari 4 calls hain, koi comment nahi
  async function loadAllData() {
    setLoading(true);

    // 1. Course Content
    const contentResult = await getCourseContent(user.courseId);
    console.log('contentResult:', JSON.stringify(contentResult));
    if (contentResult.success && contentResult.data) {
      setContents(contentResult.data as Content[]);
    }

    // 2. Schedules
    const scheduleResult = await getStudentSchedules(user.id, user.courseId);
    console.log('scheduleResult:', JSON.stringify(scheduleResult));
    if (scheduleResult.success && scheduleResult.data) {
      setSchedules(scheduleResult.data as Schedule[]);
    }

    // 3. Certificates
    const certResult = await getStudentCertificates(user.id);
    console.log('certResult:', JSON.stringify(certResult));
    if (certResult.success && certResult.data) {
      setCertificates(certResult.data as Certificate[]);
    }

    // 4. Support Tickets
    const ticketResult = await getStudentTickets(user.id);
    console.log('ticketResult:', JSON.stringify(ticketResult));
    if (ticketResult.success && ticketResult.data) {
      setTickets(ticketResult.data as Ticket[]);
    }

    setLoading(false);
  }

  async function handleSubmitSupport(e: React.FormEvent) {
    e.preventDefault();
    if (!supportSubject.trim() || !supportMessage.trim()) return;
    setSubmitting(true);
    const result = await createSupportTicket({
      studentId: user.id, userId: user.id,
      studentName: user.name, studentEmail: user.email,
      courseId: user.courseId, courseTitle: user.courseTitle,
      subject: supportSubject, message: supportMessage, priority: 'MEDIUM',
    });
    if (result.success) {
      toast.success('Question submit ho gaya! Admin jald reply karega.');
      setSupportSubject(''); setSupportMessage('');
      loadAllData();
    } else {
      toast.error(result.error || 'Question submit nahi ho saka');
    }
    setSubmitting(false);
  }

  const upcomingSchedules = schedules
    .filter(s => new Date(s.date) >= new Date() && s.status !== 'CANCELLED')
    .slice(0, 5);

  const getScheduleStatus = (schedule: Schedule) => {
    const d = parseISO(schedule.date);
    if (isToday(d)) return { text: 'Today', color: 'bg-green-100 text-green-700' };
    if (isTomorrow(d)) return { text: 'Tomorrow', color: 'bg-blue-100 text-blue-700' };
    return { text: format(d, 'MMM dd'), color: 'bg-slate-100 text-slate-700' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Clock3 className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-3" />
          <p className="text-slate-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white">HDS Student Portal</h1>
              <p className="text-xs text-slate-500">Regular Class Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {user.studentId}
            </Badge>
            <Button variant="ghost" size="icon" onClick={() => signOut()}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Continue your learning journey</p>
        </div>

        {/* Course Card */}
        {course && (
          <Card className="mb-8 border-blue-200 dark:border-blue-800 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="bg-white/20 text-white border-0 mb-2">Regular Class</Badge>
                  <CardTitle className="text-2xl text-white mb-1">{course.title}</CardTitle>
                  <p className="text-blue-100">{course.shortDesc}</p>
                </div>
                <course.icon className="w-16 h-16 text-white/30" />
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{course.duration}</p>
                  <p className="text-sm text-slate-500">Duration</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{course.hours}h</p>
                  <p className="text-sm text-slate-500">Total Hours</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{contents.length}</p>
                  <p className="text-sm text-slate-500">Materials</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">{schedules.length}</p>
                  <p className="text-sm text-slate-500">Classes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl gap-10">
            <TabsTrigger value="overview"><Calendar className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Schedule</span></TabsTrigger>
            <TabsTrigger value="materials"><FileText className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Materials</span></TabsTrigger>
            <TabsTrigger value="materials" asChild>
  <Link href="/dashboard/videos" className="flex items-center">
    <FileText className="w-4 h-4 mr-1" />
    <span className="hidden sm:inline">Recorded Sessions</span>
  </Link>
</TabsTrigger>
            <TabsTrigger value="support"><MessageSquare className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Support</span></TabsTrigger>
            <TabsTrigger value="certificate"><Award className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Certificate</span></TabsTrigger>
          </TabsList>

          {/* ══ SCHEDULE ══ */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2" /> Upcoming Classes
                </h3>
                {upcomingSchedules.length === 0 ? (
  <Card>
    <CardContent className="p-12 text-center text-slate-500">
      <Clock3 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
      <p className="font-medium">No upcoming classes scheduled</p>
      <p className="text-xs mt-2 text-slate-400">Total: {schedules.length} • Course: {user.courseId}</p>
    </CardContent>
  </Card>
) : (
  <div className="rounded-md border bg-white dark:bg-slate-950">
    <Table>
      <TableHeader className="bg-slate-50 dark:bg-slate-900">
        <TableRow>
          <TableHead className="w-[150px]">Status & Time</TableHead>
          <TableHead>Session Details</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {upcomingSchedules.map((schedule) => {
          const status = getScheduleStatus(schedule);
          const isLive = schedule.status === 'LIVE';
          
          return (
            <TableRow key={schedule._id} className={isLive ? "bg-red-50/30 dark:bg-red-900/10" : ""}>
              {/* Column 1: Time & Badge */}
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {schedule.time}
                  </span>
                  {isLive ? (
                    <Badge className="bg-red-500 text-white animate-pulse text-[10px] py-0 px-2 w-fit">🔴 LIVE</Badge>
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-slate-400">{status.text}</span>
                  )}
                </div>
              </TableCell>

              {/* Column 2: Title & Date */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{schedule.title}</span>
                  <span className="text-xs text-slate-500">
                    {format(parseISO(schedule.date), 'EEE, MMM dd')} • {schedule.duration} min
                  </span>
                </div>
              </TableCell>

              {/* Column 3: Platform */}
              <TableCell>
                <Badge variant="secondary" className="font-medium">
                  {schedule.meetingPlatform}
                </Badge>
              </TableCell>

              {/* Column 4: Buttons */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {schedule.isRecorded && schedule.recordingUrl && (
                    <Button variant="ghost" size="sm" asChild title="Watch Recording">
                      <a href={schedule.recordingUrl} target="_blank" rel="noopener noreferrer">
                        <Play className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    className={isLive ? 'bg-red-600 hover:bg-red-700 shadow-md' : 'variant-outline'} 
                    asChild
                  >
                    <a href={schedule.meetingLink} target="_blank" rel="noopener noreferrer">
                      {isLive ? 'Join Now' : 'Join'}
                    </a>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
)}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg">Quick Stats</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: 'Total Classes', value: schedules.length },
                      { label: 'Materials', value: contents.length },
                      { label: 'Tickets', value: tickets.length },
                      { label: 'Certificates', value: certificates.length },
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">{s.label}</span>
                        <span className="font-bold text-slate-900 dark:text-white">{s.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center"><Users className="w-5 h-5 mr-2" /> Your Batch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'Ahmad Ali', avatar: 'AA', online: true },
                        { name: 'Fatima Khan', avatar: 'FK', online: false },
                        { name: 'Usman Ghani', avatar: 'UG', online: true },
                        { name: 'Ayesha Tariq', avatar: 'AT', online: false },
                      ].map((mate, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {mate.avatar}
                            </div>
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${mate.online ? 'bg-green-500' : 'bg-slate-400'}`} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white text-sm">{mate.name}</p>
                            <p className="text-xs text-slate-500">{mate.online ? 'Online' : 'Offline'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ══ MATERIALS ══ */}
          <TabsContent value="materials" className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <FileText className="w-5 h-5 mr-2" /> Course Materials ({contents.length})
            </h3>
            {contents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>No materials uploaded yet</p>
                  <p className="text-xs mt-2 text-slate-400">Course ID: {user.courseId}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {contents.map((content) => (
                  <Card key={content._id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                          ${content.fileType === 'PDF' ? 'bg-red-100 text-red-600' :
                            content.fileType === 'VIDEO' ? 'bg-purple-100 text-purple-600' :
                            content.fileType === 'LINK' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'}`}>
                          {content.fileType === 'VIDEO' ? <Video className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-1 truncate">{content.title}</h4>
                          <p className="text-sm text-slate-500 mb-3">
                            {content.fileType} • {format(new Date(content.createdAt), 'MMM dd, yyyy')}
                            {content.fileSize && ` • ${content.fileSize}`}
                          </p>
                          <Button size="sm" variant="outline" asChild>
                            <a href={content.fileUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-2" /> Download
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

          {/* ══ SUPPORT ══ */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><HelpCircle className="w-5 h-5 mr-2" /> Ask a Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitSupport} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Subject</label>
                      <Input placeholder="e.g., Doubt in React Hooks" value={supportSubject}
                        onChange={(e) => setSupportSubject(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Your Question</label>
                      <Textarea placeholder="Describe your question in detail..." value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)} rows={5} required />
                    </div>
                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting
                        ? <><Clock3 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                        : <><Send className="w-4 h-4 mr-2" /> Submit Question</>}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" /> Your Questions ({tickets.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {tickets.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                      <p>No questions asked yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                      {tickets.map((ticket) => (
                        <div key={ticket._id} className={`p-4 rounded-lg border ${
                          ticket.status === 'OPEN' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200' :
                          ticket.status === 'RESOLVED' ? 'bg-green-50 dark:bg-green-900/20 border-green-200' :
                          'bg-slate-50 dark:bg-slate-800 border-slate-200'}`}>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">{ticket.subject}</h4>
                            <Badge className={
                              ticket.status === 'OPEN' ? 'bg-amber-100 text-amber-700' :
                              ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-700' :
                              'bg-blue-100 text-blue-700'
                            }>{ticket.status}</Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{ticket.message}</p>
                          <p className="text-xs text-slate-400">{format(new Date(ticket.createdAt), 'MMM dd, yyyy')}</p>
                          {ticket.adminReply && (
                            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                              <p className="text-sm">
                                <span className="font-medium text-blue-600">Admin Reply:</span> {ticket.adminReply}
                              </p>
                              {ticket.repliedAt && (
                                <p className="text-xs text-slate-400 mt-1">
                                  Replied: {format(new Date(ticket.repliedAt), 'MMM dd, yyyy')}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ══ CERTIFICATE ══ */}
          <TabsContent value="certificate" className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <Award className="w-5 h-5 mr-2" /> Your Certificates
            </h3>
            {certificates.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Award className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No Certificates Yet</h4>
                  <p className="text-slate-500 max-w-md mx-auto">Complete your course to earn your certificate!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <Card key={cert._id} className="border-green-200 dark:border-green-800">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Award className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <Badge className="bg-green-100 text-green-700 mb-2">Verified</Badge>
                          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{cert.courseTitle}</h4>
                          <p className="text-sm text-slate-500 mb-1">Certificate #{cert.certificateNumber}</p>
                          <p className="text-sm text-slate-500 mb-4">{format(new Date(cert.issueDate), 'MMMM dd, yyyy')}</p>
                          {cert.grade && (
                            <p className="text-sm mb-3">Grade: <span className="text-green-600 font-bold">{cert.grade}</span></p>
                          )}
                          <Button asChild>
                            <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-2" /> Download Certificate
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