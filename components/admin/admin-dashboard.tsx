"use client"

import { useState, useEffect } from "react"
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  Users, UserCheck, Clock, BookOpen, Calendar, Award,
  MessageSquare, LogOut, Plus, FileText, Video, Trash2,
  CheckCircle, XCircle, Eye, Download, Send, Filter,
  Upload, Link as LinkIcon, User, CheckCheck, Loader2,
  GraduationCap, CreditCard, Smartphone, Building2,
  Banknote, AlertTriangle, ZoomIn, ShieldCheck, ShieldAlert,
  Phone, Mail, BookMarked, Tag, ImageIcon, ChevronRight,
} from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { format } from "date-fns"
import {
  getEnrollmentRequests,
  approveEnrollmentRequest,
  rejectEnrollmentRequest,
} from "@/app/actions/enrollment"
import {
  uploadCourseContent, getCourseContent, deleteCourseContent,
  createLectureSchedule, getLectureSchedules, deleteLectureSchedule,
  getSupportTickets, replyToTicket, getOneToOneSessions, approveOneToOneSession,
} from "@/app/actions/admin-content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { coursesData } from "@/lib/CourseData"

// ── Types ──────────────────────────────────────────────────────────────────

interface EnrollmentRequest {
  _id: string
  type: "REGULAR" | "ONE_TO_ONE"
  fullName: string
  studentId?: string
  email: string
  phone: string
  courseId: string
  courseTitle: string
  preferredTime?: string
  specificRequirements?: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  adminNotes?: string
  createdAt: string
  paymentMethod: "EASYPAISA" | "JAZZCASH" | "BANK_TRANSFER" | "CASH"
  transactionId: string
  paymentAmount: number
  paymentScreenshot: string
  paymentDate: string
}

interface CourseContent {
  _id: string; title: string; fileType: string; fileUrl: string; createdAt: string
}
interface LectureSchedule {
  _id: string; title: string; date: string; time: string; meetingLink: string; status: string; courseId: string
}
interface SupportTicket {
  _id: string; studentName: string; courseTitle: string; subject: string; message: string; status: string; createdAt: string; adminReply?: string
}
interface OneToOneSession {
  _id: string; studentName: string; courseId: string; topic: string; description?: string; requestedDate: string; requestedTime: string
  status: "REQUESTED" | "APPROVED" | "COMPLETED" | "REJECTED"; meetingLink?: string; meetingPlatform?: string; adminNotes?: string; createdAt: string
}

// ── Payment helpers ────────────────────────────────────────────────────────

const paymentMeta: Record<string, { label: string; Icon: React.ElementType; color: string; bg: string }> = {
  EASYPAISA:     { label: "EasyPaisa",     Icon: Smartphone, color: "text-green-700 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30"  },
  JAZZCASH:      { label: "JazzCash",      Icon: CreditCard, color: "text-red-700 dark:text-red-400",     bg: "bg-red-100 dark:bg-red-900/30"      },
  BANK_TRANSFER: { label: "Bank Transfer", Icon: Building2,  color: "text-blue-700 dark:text-blue-400",   bg: "bg-blue-100 dark:bg-blue-900/30"    },
  CASH:          { label: "Cash Payment",  Icon: Banknote,   color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30"  },
}

// ── Component ──────────────────────────────────────────────────────────────

export function AdminDashboard() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("enrollments")
  const [processing, setProcessing] = useState(false)

  const [enrollments, setEnrollments] = useState<EnrollmentRequest[]>([])
  const [enrollmentLoading, setEnrollmentLoading] = useState(true)
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentRequest | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [paymentVerified, setPaymentVerified] = useState(false)

  const [selectedCourse, setSelectedCourse] = useState(coursesData[0].id)
  const [courseContent, setCourseContent] = useState<CourseContent[]>([])
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({ title: "", description: "", fileUrl: "", fileType: "PDF" as "PDF"|"VIDEO"|"LINK"|"DOC", fileSize: "" })

  const [schedules, setSchedules] = useState<LectureSchedule[]>([])
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [scheduleForm, setScheduleForm] = useState({
    courseId: coursesData[0].id, title: "", description: "", date: "", time: "", duration: 60,
    meetingLink: "", meetingPlatform: "ZOOM" as "ZOOM"|"GOOGLE_MEET"|"TEAMS"|"OTHER", meetingId: "", passcode: "", instructorName: "",
  })

  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")

  const [oneToOneSessions, setOneToOneSessions] = useState<OneToOneSession[]>([])
  const [sessionFilter, setSessionFilter] = useState("ALL")
  const [selectedSession, setSelectedSession] = useState<OneToOneSession | null>(null)
  const [isApproveSessionOpen, setIsApproveSessionOpen] = useState(false)
  const [sessionMeetingLink, setSessionMeetingLink] = useState("")
  const [sessionPlatform, setSessionPlatform] = useState("ZOOM")
  const [sessionNotes, setSessionNotes] = useState("")

  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false)
  const [certForm, setCertForm] = useState({ studentEmail: "", courseId: coursesData[0].id, certificateUrl: "", grade: "", remarks: "" })

  useEffect(() => {
    if (activeTab === "enrollments") loadEnrollments()
    if (activeTab === "courses") loadCourseContent()
    if (activeTab === "schedule") loadSchedules()
    if (activeTab === "support") loadTickets()
    if (activeTab === "onetoone") loadOneToOneSessions()
  }, [activeTab, selectedCourse]) // eslint-disable-line

  useEffect(() => { setPaymentVerified(false) }, [selectedEnrollment])

  async function loadEnrollments() {
    setEnrollmentLoading(true)
    const r = await getEnrollmentRequests()
    if (r.success && r.data) setEnrollments(r.data as EnrollmentRequest[])
    setEnrollmentLoading(false)
  }
  async function loadCourseContent() {
    const r = await getCourseContent(selectedCourse)
    if (r.success && r.data) setCourseContent(r.data as CourseContent[])
  }
  async function loadSchedules() {
    const r = await getLectureSchedules()
    if (r.success && r.data) setSchedules(r.data as LectureSchedule[])
  }
  async function loadTickets() {
    const r = await getSupportTickets()
    if (r.success && r.data) setTickets(r.data as SupportTicket[])
  }
  async function loadOneToOneSessions() {
    const r = await getOneToOneSessions()
    if (r.success && r.data) setOneToOneSessions(r.data as OneToOneSession[])
    else toast.error("Failed to load sessions")
  }

  async function handleApprove(id: string) {
    if (!paymentVerified) { toast.warning("Please verify payment before approving."); return }
    setProcessing(true)
    const r = await approveEnrollmentRequest(id)
    if (r.success) { toast.success("Enrollment approved!"); loadEnrollments(); setIsDetailOpen(false) }
    else toast.error(r.error ?? "Failed to approve")
    setProcessing(false)
  }

  async function handleReject() {
    if (!selectedEnrollment) return
    setProcessing(true)
    const r = await rejectEnrollmentRequest(selectedEnrollment._id, rejectReason)
    if (r.success) {
      toast.success("Enrollment rejected")
      loadEnrollments(); setIsRejectDialogOpen(false); setIsDetailOpen(false); setRejectReason("")
    } else toast.error(r.error ?? "Failed to reject")
    setProcessing(false)
  }

  async function handleUploadContent() {
    if (!uploadForm.title || !uploadForm.fileUrl) { toast.error("Title and File URL required"); return }
    setProcessing(true)
    const r = await uploadCourseContent({ ...uploadForm, courseId: selectedCourse, uploadedBy: session?.user?.id ?? "admin" })
    if (r.success) {
      toast.success("Uploaded!"); setIsUploadDialogOpen(false); loadCourseContent()
      setUploadForm({ title: "", description: "", fileUrl: "", fileType: "PDF", fileSize: "" })
    } else toast.error(r.error ?? "Failed")
    setProcessing(false)
  }

  async function handleDeleteContent(id: string) {
    const r = await deleteCourseContent(id)
    if (r.success) { toast.success("Deleted"); loadCourseContent() } else toast.error(r.error ?? "Failed")
  }

  async function handleCreateSchedule() {
    if (!scheduleForm.title || !scheduleForm.date || !scheduleForm.time || !scheduleForm.meetingLink) {
      toast.error("Fill all required fields"); return
    }
    setProcessing(true)
    const r = await createLectureSchedule({ ...scheduleForm, date: new Date(scheduleForm.date), createdBy: session?.user?.id ?? "admin" })
    if (r.success) {
      toast.success("Schedule created!"); setIsScheduleDialogOpen(false); loadSchedules()
      setScheduleForm({ courseId: coursesData[0].id, title: "", description: "", date: "", time: "", duration: 60, meetingLink: "", meetingPlatform: "ZOOM", meetingId: "", passcode: "", instructorName: "" })
    } else toast.error(r.error ?? "Failed")
    setProcessing(false)
  }

  async function handleDeleteSchedule(id: string) {
    const r = await deleteLectureSchedule(id)
    if (r.success) { toast.success("Deleted"); loadSchedules() } else toast.error(r.error ?? "Failed")
  }

  async function handleReplyTicket() {
    if (!selectedTicket || !replyMessage.trim()) return
    setProcessing(true)
    const r = await replyToTicket(selectedTicket._id, replyMessage, session?.user?.id ?? "admin", session?.user?.name ?? "Admin", "RESOLVED")
    if (r.success) { toast.success("Reply sent!"); setIsTicketDialogOpen(false); setReplyMessage(""); loadTickets() }
    else toast.error(r.error ?? "Failed")
    setProcessing(false)
  }

  async function handleApproveSession() {
    if (!selectedSession || !sessionMeetingLink) { toast.error("Meeting link required"); return }
    setProcessing(true)
    const r = await approveOneToOneSession(selectedSession._id, sessionMeetingLink, sessionPlatform, sessionNotes)
    if (r.success) {
      toast.success("Session approved!"); setIsApproveSessionOpen(false)
      setSessionMeetingLink(""); setSessionNotes(""); loadOneToOneSessions()
    } else toast.error(r.error ?? "Failed")
    setProcessing(false)
  }

  const stats = {
    total: enrollments.length,
    pending: enrollments.filter(e => e.status === "PENDING").length,
    approved: enrollments.filter(e => e.status === "APPROVED").length,
    rejected: enrollments.filter(e => e.status === "REJECTED").length,
    regular: enrollments.filter(e => e.type === "REGULAR").length,
    onetoone: enrollments.filter(e => e.type === "ONE_TO_ONE").length,
  }
  const sessionStats = {
    total: oneToOneSessions.length,
    pending: oneToOneSessions.filter(s => s.status === "REQUESTED").length,
    approved: oneToOneSessions.filter(s => s.status === "APPROVED").length,
    completed: oneToOneSessions.filter(s => s.status === "COMPLETED").length,
  }
  const filteredSessions = oneToOneSessions.filter(s => sessionFilter === "ALL" || s.status === sessionFilter)
  const expectedAmount = selectedEnrollment ? (coursesData.find(c => c.id === selectedEnrollment.courseId)?.price ?? 0) : 0
  const amountMatches = selectedEnrollment?.paymentAmount === expectedAmount

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">HDS Admin</p>
              <p className="text-[10px] text-slate-400 hidden sm:block">Management Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:block">{session?.user?.name}</p>
            <Button variant="ghost" size="icon" onClick={() => signOut()} className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">

          {/* Tabs nav — scrollable on mobile */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="inline-flex h-9 min-w-max sm:grid sm:w-full sm:max-w-3xl sm:mx-auto sm:grid-cols-6">
              {[
                { value: "enrollments", Icon: Users,         label: "Enrollments" },
                { value: "courses",     Icon: BookOpen,      label: "Courses" },
                { value: "schedule",    Icon: Calendar,      label: "Schedule" },
                { value: "support",     Icon: MessageSquare, label: "Support" },
                { value: "onetoone",    Icon: User,          label: "1-to-1" },
                { value: "certificates",Icon: Award,         label: "Certs" },
              ].map(({ value, Icon, label }) => (
                <TabsTrigger key={value} value={value} className="flex items-center gap-1.5 px-3 text-xs whitespace-nowrap">
                  <Icon className="h-3.5 w-3.5 shrink-0" />{label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* ══ ENROLLMENTS ══ */}
          <TabsContent value="enrollments" className="space-y-4 focus-visible:outline-none">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard title="Total" value={stats.total} icon={Users} color="blue" />
              <StatCard title="Pending" value={stats.pending} icon={Clock} color="amber" urgent={stats.pending > 0} />
              <StatCard title="Approved" value={stats.approved} icon={UserCheck} color="green" />
              <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="red" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ProgressCard label="Regular Enrollments" value={stats.regular} total={stats.total} barColor="bg-blue-500" badgeClass="bg-blue-100 text-blue-700" />
              <ProgressCard label="One-to-One Enrollments" value={stats.onetoone} total={stats.total} barColor="bg-cyan-500" badgeClass="bg-cyan-100 text-cyan-700" />
            </div>
            <Card className="overflow-hidden">
              <CardHeader className="px-4 py-3 sm:px-5 border-b border-slate-100 dark:border-slate-800">
                <CardTitle className="text-sm font-semibold">Enrollment Requests</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {enrollmentLoading ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-14">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                    <p className="text-xs text-slate-400">Loading...</p>
                  </div>
                ) : enrollments.length === 0 ? (
                  <div className="py-14 text-center">
                    <Users className="mx-auto mb-2 h-10 w-10 text-slate-200 dark:text-slate-700" />
                    <p className="text-sm text-slate-400">No enrollment requests yet</p>
                  </div>
                ) : (
                  <>
                    {/* Desktop table */}
                    <div className="hidden sm:block">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-100 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/40">
                            {["Student","Type","Course","Payment","Status",""].map(h => (
                              <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                          {enrollments.map(req => {
                            const exp = coursesData.find(c => c.id === req.courseId)?.price ?? 0
                            const ok = req.paymentAmount === exp
                            return (
                              <tr key={req._id} className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                <td className="px-4 py-3">
                                  <p className="text-sm font-medium text-slate-900 dark:text-white">{req.fullName}</p>
                                  <p className="text-xs text-slate-400 max-w-[160px] truncate">{req.email}</p>
                                </td>
                                <td className="px-4 py-3">
                                  <Badge className={req.type === "REGULAR" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"}>
                                    {req.type === "REGULAR" ? "Regular" : "1-to-1"}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 max-w-[180px]">
                                  <p className="text-sm text-slate-600 dark:text-slate-300 truncate">{req.courseTitle}</p>
                                </td>
                                <td className="px-4 py-3">
                                  {req.paymentAmount ? (
                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${ok ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                                      {ok ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                                      PKR {req.paymentAmount.toLocaleString()}
                                    </span>
                                  ) : <span className="text-xs text-slate-300">—</span>}
                                </td>
                                <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                                <td className="px-4 py-3 text-right">
                                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs opacity-60 group-hover:opacity-100"
                                    onClick={() => { setSelectedEnrollment(req); setIsDetailOpen(true) }}>
                                    <Eye className="h-3.5 w-3.5" /> Review
                                  </Button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile list */}
                    <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
                      {enrollments.map(req => (
                        <button key={req._id} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                          onClick={() => { setSelectedEnrollment(req); setIsDetailOpen(true) }}>
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{req.fullName.charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{req.fullName}</p>
                            <p className="text-xs text-slate-400 truncate">{req.courseTitle}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <StatusBadge status={req.status} />
                            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ══ COURSES ══ */}
          <TabsContent value="courses" className="space-y-4 focus-visible:outline-none">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full sm:w-[280px] h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>{coursesData.map(c => <SelectItem key={c.id} value={c.id} className="text-sm">{c.title}</SelectItem>)}</SelectContent>
              </Select>
              <Button size="sm" onClick={() => setIsUploadDialogOpen(true)} className="w-full sm:w-auto">
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Upload Content
              </Button>
            </div>
            <Card>
              <CardHeader className="px-4 py-3 sm:px-5 border-b border-slate-100 dark:border-slate-800">
                <CardTitle className="text-sm font-semibold">Course Materials</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                {courseContent.length === 0 ? (
                  <div className="py-12 text-center">
                    <BookOpen className="mx-auto mb-2 h-10 w-10 text-slate-200 dark:text-slate-700" />
                    <p className="text-sm text-slate-400">No content yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {courseContent.map(c => (
                      <div key={c._id} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-slate-700">
                          {c.fileType === "PDF" ? <FileText className="h-4 w-4 text-red-500" /> : c.fileType === "VIDEO" ? <Video className="h-4 w-4 text-blue-500" /> : <LinkIcon className="h-4 w-4 text-green-500" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{c.title}</p>
                          <p className="text-xs text-slate-400">{c.fileType} · {format(new Date(c.createdAt), "MMM dd, yyyy")}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500" asChild>
                            <a href={c.fileUrl} target="_blank" rel="noopener noreferrer"><Download className="h-3.5 w-3.5" /></a>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => handleDeleteContent(c._id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ══ SCHEDULE ══ */}
          <TabsContent value="schedule" className="space-y-4 focus-visible:outline-none">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Lecture Schedules</h2>
              <Button size="sm" onClick={() => setIsScheduleDialogOpen(true)}><Plus className="mr-1.5 h-3.5 w-3.5" /> New</Button>
            </div>
            {schedules.length === 0 ? (
              <div className="py-14 text-center">
                <Calendar className="mx-auto mb-2 h-10 w-10 text-slate-200 dark:text-slate-700" />
                <p className="text-sm text-slate-400">No schedules yet</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {schedules.map(s => (
                  <Card key={s._id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                          <span className="text-[9px] font-bold uppercase text-blue-500">{format(new Date(s.date), "MMM")}</span>
                          <span className="text-lg font-extrabold leading-none text-blue-700 dark:text-blue-300">{format(new Date(s.date), "dd")}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{s.title}</p>
                          <p className="mt-0.5 text-xs text-slate-500 truncate">{s.time} · {coursesData.find(c => c.id === s.courseId)?.title ?? s.courseId}</p>
                          <a href={s.meetingLink} target="_blank" rel="noopener noreferrer" className="mt-0.5 inline-block text-xs text-blue-600 hover:underline">Join →</a>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <ScheduleStatusBadge status={s.status} />
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600" onClick={() => handleDeleteSchedule(s._id)}>
                            <Trash2 className="h-3.5 w-3.5" />
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
          <TabsContent value="support" className="space-y-4 focus-visible:outline-none">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Support Tickets</h2>
            {tickets.length === 0 ? (
              <div className="py-14 text-center">
                <MessageSquare className="mx-auto mb-2 h-10 w-10 text-slate-200 dark:text-slate-700" />
                <p className="text-sm text-slate-400">No tickets yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tickets.map(t => (
                  <Card key={t._id} className={t.status === "OPEN" ? "border-amber-200 dark:border-amber-800" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.studentName}</p>
                            <TicketStatusBadge status={t.status} />
                          </div>
                          <p className="text-xs text-slate-400 truncate">{t.courseTitle} · {format(new Date(t.createdAt), "MMM dd, yyyy")}</p>
                        </div>
                        <Button variant="outline" size="sm" className="shrink-0 h-7 text-xs" onClick={() => { setSelectedTicket(t); setIsTicketDialogOpen(true) }}>
                          {t.status === "OPEN" ? "Reply" : "View"}
                        </Button>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800">
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mb-0.5">{t.subject}</p>
                        <p className="text-xs text-slate-500 line-clamp-2">{t.message}</p>
                      </div>
                      {t.adminReply && (
                        <div className="mt-2 border-l-4 border-blue-400 bg-blue-50 p-2.5 rounded-r-lg dark:bg-blue-900/20">
                          <p className="text-xs text-blue-700 dark:text-blue-300 line-clamp-2"><strong>Reply:</strong> {t.adminReply}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ══ ONE-TO-ONE ══ */}
          <TabsContent value="onetoone" className="space-y-4 focus-visible:outline-none">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">1-to-1 Sessions</h2>
                <p className="text-xs text-slate-400">Manage private sessions</p>
              </div>
              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 shrink-0">{sessionStats.pending} Pending</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard title="Total" value={sessionStats.total} icon={User} color="blue" />
              <StatCard title="Pending" value={sessionStats.pending} icon={Clock} color="amber" urgent={sessionStats.pending > 0} />
              <StatCard title="Approved" value={sessionStats.approved} icon={CheckCircle} color="green" />
              <StatCard title="Completed" value={sessionStats.completed} icon={CheckCheck} color="purple" />
            </div>
            <Card>
              <CardHeader className="px-4 py-3 sm:px-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-sm font-semibold">Requests</CardTitle>
                  <Select value={sessionFilter} onValueChange={setSessionFilter}>
                    <SelectTrigger className="h-7 w-[120px] text-xs">
                      <Filter className="mr-1.5 h-3 w-3 text-slate-400" /><SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[["ALL","All"],["REQUESTED","Pending"],["APPROVED","Approved"],["COMPLETED","Completed"],["REJECTED","Rejected"]].map(([v,l]) => (
                        <SelectItem key={v} value={v} className="text-xs">{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                {filteredSessions.length === 0 ? (
                  <div className="py-12 text-center">
                    <User className="mx-auto mb-2 h-10 w-10 text-slate-200 dark:text-slate-700" />
                    <p className="text-sm text-slate-400">No sessions found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredSessions.map(s => (
                      <div key={s._id} className={`rounded-xl border-2 p-4 ${s.status === "REQUESTED" ? "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-900/10" : s.status === "APPROVED" ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10" : "border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900"}`}>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{s.topic}</h3>
                              <SessionStatusBadge status={s.status} />
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs mb-2">
                              <div><p className="text-slate-400">Student</p><p className="font-medium text-slate-700 dark:text-slate-200">{s.studentName}</p></div>
                              <div><p className="text-slate-400">Course</p><p className="font-medium text-slate-700 dark:text-slate-200 truncate">{coursesData.find(c => c.id === s.courseId)?.title ?? s.courseId}</p></div>
                              <div><p className="text-slate-400">Date & Time</p><p className="font-medium text-slate-700 dark:text-slate-200">{format(new Date(s.requestedDate), "MMM dd")} · {s.requestedTime}</p></div>
                              <div><p className="text-slate-400">Submitted</p><p className="font-medium text-slate-700 dark:text-slate-200">{format(new Date(s.createdAt), "MMM dd, yyyy")}</p></div>
                            </div>
                            {s.meetingLink && (
                              <div className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 dark:bg-blue-900/20">
                                <Video className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                                <a href={s.meetingLink} target="_blank" rel="noopener noreferrer" className="truncate text-xs text-blue-600 hover:underline">{s.meetingLink}</a>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {s.status === "REQUESTED" && (
                              <>
                                <Button size="sm" className="h-7 bg-green-600 text-white hover:bg-green-700 text-xs" onClick={() => { setSelectedSession(s); setIsApproveSessionOpen(true) }}>
                                  <CheckCircle className="mr-1 h-3 w-3" /> Approve
                                </Button>
                                <Button size="sm" variant="outline" className="h-7 border-red-200 text-red-500 text-xs" onClick={() => toast.info("Implement reject if needed")}>
                                  <XCircle className="mr-1 h-3 w-3" /> Reject
                                </Button>
                              </>
                            )}
                            {s.status === "APPROVED" && (
                              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.info("Implement complete if needed")}>
                                <CheckCheck className="mr-1 h-3 w-3" /> Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ══ CERTIFICATES ══ */}
          <TabsContent value="certificates" className="space-y-4 focus-visible:outline-none">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Certificates</h2>
              <Button size="sm" onClick={() => setIsCertDialogOpen(true)}><Upload className="mr-1.5 h-3.5 w-3.5" /> Issue</Button>
            </div>
            <Card>
              <CardContent className="py-16 text-center text-slate-400">
                <Award className="mx-auto mb-3 h-12 w-12 text-slate-200 dark:text-slate-700" />
                <p className="text-sm">Select a student and upload their certificate</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ══════════════════════════════════════════════════════
          ENROLLMENT DETAIL — fixed header + scrollable body
      ══════════════════════════════════════════════════════ */}
      <Dialog open={isDetailOpen} onOpenChange={v => { setIsDetailOpen(v); if (!v) setPaymentVerified(false) }}>
        <DialogContent className="flex max-h-[92dvh] w-[calc(100vw-2rem)] max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:w-full">

          {/* Fixed dialog header */}
          <DialogHeader className="shrink-0 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <DialogTitle className="flex items-center gap-2 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/30">
                <Eye className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              Enrollment Review
            </DialogTitle>
            <DialogDescription className="text-xs">Verify payment before taking action.</DialogDescription>
          </DialogHeader>

          {/* Scrollable content */}
          {selectedEnrollment && (
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              <div className="space-y-4">

                {/* Status + date */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <StatusBadge status={selectedEnrollment.status} />
                  <span className="text-xs text-slate-400">{format(new Date(selectedEnrollment.createdAt), "MMM dd, yyyy · h:mm a")}</span>
                </div>

                {/* ── Student Info ── */}
                <section className="space-y-1.5">
                  <SectionLabel>Student Information</SectionLabel>
                  <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    <InfoRow icon={User}      label="Full Name" value={selectedEnrollment.fullName} />
                    <InfoRow icon={Mail}      label="Email"     value={selectedEnrollment.email} mono />
                    <InfoRow icon={Phone}     label="Phone"     value={selectedEnrollment.phone} />
                    <InfoRow icon={Tag}       label="Type"      value={selectedEnrollment.type === "REGULAR" ? "Regular Class" : "One-to-One"} />
                    <div className="sm:col-span-2">
                      <InfoRow icon={BookMarked} label="Course" value={selectedEnrollment.courseTitle} />
                    </div>
                    {selectedEnrollment.preferredTime && (
                      <InfoRow icon={Clock} label="Preferred Time" value={selectedEnrollment.preferredTime} />
                    )}
                  </div>
                  {selectedEnrollment.specificRequirements && (
                    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                      <p className="text-[10px] text-slate-400 mb-1">Requirements / Notes</p>
                      <p className="text-xs text-slate-700 dark:text-slate-200">{selectedEnrollment.specificRequirements}</p>
                    </div>
                  )}
                </section>

                <Separator className="my-1" />

                {/* ── Payment ── */}
                {selectedEnrollment.paymentMethod ? (
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <SectionLabel>Payment Verification</SectionLabel>
                      {amountMatches
                        ? <span className="flex items-center gap-1 text-[11px] font-semibold text-green-600"><CheckCircle className="h-3 w-3" /> Amount OK</span>
                        : <span className="flex items-center gap-1 text-[11px] font-semibold text-red-600"><AlertTriangle className="h-3 w-3" /> Mismatch</span>}
                    </div>

                    {/* Method */}
                    {(() => {
                      const m = paymentMeta[selectedEnrollment.paymentMethod]
                      return (
                        <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 ${m.bg}`}>
                          <m.Icon className={`h-4 w-4 ${m.color}`} />
                          <span className={`text-sm font-semibold ${m.color}`}>{m.label}</span>
                        </div>
                      )
                    })()}

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <PayCard label="Transaction ID"  value={selectedEnrollment.transactionId} mono />
                      <PayCard label="Amount Paid"     value={`PKR ${selectedEnrollment.paymentAmount?.toLocaleString()}`} highlight={amountMatches ? "green" : "red"} sub={!amountMatches ? `Expected: PKR ${expectedAmount.toLocaleString()}` : undefined} />
                      <PayCard label="Payment Date"    value={new Date(selectedEnrollment.paymentDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} />
                      <PayCard label="Expected Amount" value={`PKR ${expectedAmount.toLocaleString()}`} />
                    </div>

                    {/* Mismatch warning */}
                    {!amountMatches && (
                      <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
                        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600" />
                        <p className="text-xs text-red-700 dark:text-red-400">
                          <strong>Amount mismatch!</strong> Paid PKR {selectedEnrollment.paymentAmount?.toLocaleString()} but fee is PKR {expectedAmount.toLocaleString()}. Verify carefully before approving.
                        </p>
                      </div>
                    )}

                    {/* Screenshot */}
                    {selectedEnrollment.paymentScreenshot ? (
                      <div>
                        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Payment Screenshot</p>
                        <div className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                          <img
                            src={selectedEnrollment.paymentScreenshot}
                            alt="Payment Proof"
                            className="w-full cursor-zoom-in object-contain transition-opacity group-hover:opacity-90"
                            style={{ maxHeight: "260px" }}
                            onClick={() => window.open(selectedEnrollment.paymentScreenshot, "_blank")}
                          />
                          <button
                            onClick={() => window.open(selectedEnrollment.paymentScreenshot, "_blank")}
                            className="absolute bottom-2 right-2 flex items-center gap-1 rounded-lg bg-black/60 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
                          >
                            <ZoomIn className="h-3 w-3" /> Full Size
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
                        <ImageIcon className="h-4 w-4 text-red-400 shrink-0" />
                        <p className="text-xs text-red-600 dark:text-red-400">No payment screenshot uploaded.</p>
                      </div>
                    )}

                    {/* Verify checkbox */}
                    {selectedEnrollment.status === "PENDING" && (
                      <div className={`rounded-xl border-2 p-3.5 transition-all ${paymentVerified ? "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-900/20" : "border-dashed border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-800/50"}`}>
                        <label className="flex cursor-pointer items-start gap-3">
                          <Checkbox
                            id="verify-payment"
                            checked={paymentVerified}
                            onCheckedChange={(v: CheckedState) => setPaymentVerified(v === true)}
                            className="mt-0.5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                          />
                          <div>
                            <p className={`text-sm font-semibold leading-snug ${paymentVerified ? "text-green-800 dark:text-green-300" : "text-slate-700 dark:text-slate-200"}`}>
                              I have verified the payment screenshot and transaction details
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400">Required before approving this enrollment.</p>
                          </div>
                        </label>
                      </div>
                    )}
                  </section>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                    <p className="text-xs text-amber-700 dark:text-amber-300">No payment information found for this enrollment.</p>
                  </div>
                )}

                {/* Already processed */}
                {selectedEnrollment.status !== "PENDING" && (
                  <div className={`flex items-center gap-2 rounded-lg px-3 py-2.5 ${selectedEnrollment.status === "APPROVED" ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}>
                    {selectedEnrollment.status === "APPROVED"
                      ? <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                      : <XCircle className="h-4 w-4 shrink-0 text-red-500" />}
                    <p className={`text-sm font-medium ${selectedEnrollment.status === "APPROVED" ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                      This enrollment was <strong>{selectedEnrollment.status.toLowerCase()}</strong>.
                      {selectedEnrollment.adminNotes && <span className="font-normal opacity-80 ml-1">Reason: {selectedEnrollment.adminNotes}</span>}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fixed footer */}
          {selectedEnrollment?.status === "PENDING" && (
            <div className="shrink-0 border-t border-slate-100 bg-white/80 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/80 backdrop-blur-sm">
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-900/20"
                  onClick={() => setIsRejectDialogOpen(true)}>
                  <XCircle className="mr-1.5 h-3.5 w-3.5" /> Reject
                </Button>
                <Button size="sm" disabled={processing || !paymentVerified} onClick={() => handleApprove(selectedEnrollment._id)}
                  className={`transition-all ${paymentVerified ? "bg-green-600 text-white hover:bg-green-700" : "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500"}`}>
                  {processing ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />}
                  {paymentVerified ? "Approve Enrollment" : "Verify Payment First"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Reject ── */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 text-sm"><XCircle className="h-4 w-4" /> Reject Enrollment</DialogTitle>
            <DialogDescription className="text-xs">Reason is optional.</DialogDescription>
          </DialogHeader>
          <Textarea className="text-sm" placeholder="e.g. Course is full. Please reapply next semester." value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={3} />
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={handleReject} disabled={processing}>
              {processing && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />} Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Upload Content ── */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="text-sm">Upload Course Content</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><label className="text-xs font-medium text-slate-500">Title *</label>
              <Input className="mt-1 h-9 text-sm" value={uploadForm.title} onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })} /></div>
            <div><label className="text-xs font-medium text-slate-500">File URL *</label>
              <Input className="mt-1 h-9 text-sm" value={uploadForm.fileUrl} onChange={e => setUploadForm({ ...uploadForm, fileUrl: e.target.value })} placeholder="https://..." /></div>
            <Select value={uploadForm.fileType} onValueChange={(v: any) => setUploadForm({ ...uploadForm, fileType: v })}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>{["PDF","VIDEO","LINK","DOC"].map(t => <SelectItem key={t} value={t} className="text-sm">{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleUploadContent} disabled={processing}>
              {processing && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />} Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Create Schedule ── */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="text-sm">Create Schedule</DialogTitle></DialogHeader>
          <div className="space-y-2.5">
            <Select value={scheduleForm.courseId} onValueChange={v => setScheduleForm({ ...scheduleForm, courseId: v })}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>{coursesData.map(c => <SelectItem key={c.id} value={c.id} className="text-sm">{c.title}</SelectItem>)}</SelectContent>
            </Select>
            <Input className="h-9 text-sm" placeholder="Lecture Title *" value={scheduleForm.title} onChange={e => setScheduleForm({ ...scheduleForm, title: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <Input className="h-9 text-sm" type="date" value={scheduleForm.date} onChange={e => setScheduleForm({ ...scheduleForm, date: e.target.value })} />
              <Input className="h-9 text-sm" type="time" value={scheduleForm.time} onChange={e => setScheduleForm({ ...scheduleForm, time: e.target.value })} />
            </div>
            <Input className="h-9 text-sm" placeholder="Meeting Link *" value={scheduleForm.meetingLink} onChange={e => setScheduleForm({ ...scheduleForm, meetingLink: e.target.value })} />
            <Select value={scheduleForm.meetingPlatform} onValueChange={(v: any) => setScheduleForm({ ...scheduleForm, meetingPlatform: v })}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>{["ZOOM","GOOGLE_MEET","TEAMS","OTHER"].map(p => <SelectItem key={p} value={p} className="text-sm">{p.replace("_"," ")}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsScheduleDialogOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleCreateSchedule} disabled={processing}>
              {processing && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />} Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Reply Ticket ── */}
      <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="text-sm">Reply to Ticket</DialogTitle></DialogHeader>
          {selectedTicket && (
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">{selectedTicket.subject}</p>
                <p className="text-xs text-slate-500">{selectedTicket.message}</p>
                <p className="mt-1.5 text-xs text-slate-400">— {selectedTicket.studentName}</p>
              </div>
              <Textarea className="text-sm" placeholder="Type your reply..." value={replyMessage} onChange={e => setReplyMessage(e.target.value)} rows={4} />
              <DialogFooter className="gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsTicketDialogOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={handleReplyTicket} disabled={!replyMessage.trim() || processing}>
                  {processing ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Send className="mr-1.5 h-3.5 w-3.5" />} Send & Resolve
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Approve Session ── */}
      <Dialog open={isApproveSessionOpen} onOpenChange={setIsApproveSessionOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm">Approve Session</DialogTitle>
            <DialogDescription className="text-xs">{selectedSession && `${selectedSession.topic} — ${selectedSession.studentName}`}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2.5">
            <div><label className="text-xs font-medium text-slate-500">Meeting Link *</label>
              <Input className="mt-1 h-9 text-sm" value={sessionMeetingLink} onChange={e => setSessionMeetingLink(e.target.value)} placeholder="https://zoom.us/j/..." /></div>
            <Select value={sessionPlatform} onValueChange={setSessionPlatform}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>{["ZOOM","GOOGLE_MEET","TEAMS","OTHER"].map(p => <SelectItem key={p} value={p} className="text-sm">{p.replace("_"," ")}</SelectItem>)}</SelectContent>
            </Select>
            <Textarea className="text-sm" placeholder="Notes (optional)" value={sessionNotes} onChange={e => setSessionNotes(e.target.value)} rows={2} />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsApproveSessionOpen(false)}>Cancel</Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleApproveSession} disabled={!sessionMeetingLink || processing}>
              {processing ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <CheckCircle className="mr-1.5 h-3.5 w-3.5" />} Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Issue Certificate ── */}
      <Dialog open={isCertDialogOpen} onOpenChange={setIsCertDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="text-sm">Issue Certificate</DialogTitle></DialogHeader>
          <div className="space-y-2.5">
            <Input className="h-9 text-sm" placeholder="Student Email" value={certForm.studentEmail} onChange={e => setCertForm({ ...certForm, studentEmail: e.target.value })} />
            <Select value={certForm.courseId} onValueChange={v => setCertForm({ ...certForm, courseId: v })}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>{coursesData.map(c => <SelectItem key={c.id} value={c.id} className="text-sm">{c.title}</SelectItem>)}</SelectContent>
            </Select>
            <Input className="h-9 text-sm" placeholder="Certificate PDF URL" value={certForm.certificateUrl} onChange={e => setCertForm({ ...certForm, certificateUrl: e.target.value })} />
            <Input className="h-9 text-sm" placeholder="Grade (optional)" value={certForm.grade} onChange={e => setCertForm({ ...certForm, grade: e.target.value })} />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsCertDialogOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => { toast.info("Implement student lookup"); setIsCertDialogOpen(false) }}>Issue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

type StatColor = "blue" | "green" | "amber" | "red" | "purple"

function StatCard({ title, value, icon: Icon, color, urgent }: { title: string; value: number; icon: React.ElementType; color: StatColor; urgent?: boolean }) {
  const p: Record<StatColor, string> = {
    blue:   "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    green:  "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    amber:  "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    red:    "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  }
  return (
    <div className={`rounded-xl border bg-white p-3.5 sm:p-4 dark:bg-slate-900 ${urgent ? "border-amber-200 dark:border-amber-800" : "border-slate-200 dark:border-slate-800"}`}>
      <div className={`mb-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg ${p[color]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{title}</p>
    </div>
  )
}

function ProgressCard({ label, value, total, barColor, badgeClass }: { label: string; value: number; total: number; barColor: string; badgeClass: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-2.5 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
        <Badge className={`text-xs ${badgeClass}`}>{value}</Badge>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
        <div className={`h-1.5 rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${total ? (value / total) * 100 : 0}%` }} />
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{children}</p>
}

function InfoRow({ icon: Icon, label, value, mono }: { icon: React.ElementType; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-slate-800">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-slate-400 leading-none mb-0.5">{label}</p>
        <p className={`text-sm font-medium text-slate-800 dark:text-slate-100 break-all ${mono ? "font-mono text-xs" : ""}`}>{value}</p>
      </div>
    </div>
  )
}

function PayCard({ label, value, mono, highlight, sub }: { label: string; value: string; mono?: boolean; highlight?: "green" | "red"; sub?: string }) {
  const bg = highlight === "green" ? "bg-green-50 dark:bg-green-900/20" : highlight === "red" ? "bg-red-50 dark:bg-red-900/20" : "bg-slate-50 dark:bg-slate-800"
  const textColor = highlight === "green" ? "text-green-700 dark:text-green-400" : highlight === "red" ? "text-red-700 dark:text-red-400" : "text-slate-800 dark:text-slate-100"
  return (
    <div className={`rounded-lg p-2.5 ${bg}`}>
      <p className="text-[10px] text-slate-400 mb-0.5">{label}</p>
      <p className={`text-sm font-semibold break-all ${textColor} ${mono ? "font-mono text-xs" : ""}`}>{value}</p>
      {sub && <p className="text-[10px] text-red-500 mt-0.5">{sub}</p>}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const m: Record<string, string> = {
    PENDING:  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    APPROVED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }
  return <Badge className={`text-xs ${m[status] ?? "bg-slate-100 text-slate-600"}`}>{status.charAt(0) + status.slice(1).toLowerCase()}</Badge>
}

function ScheduleStatusBadge({ status }: { status: string }) {
  const m: Record<string, string> = { SCHEDULED: "bg-blue-100 text-blue-700", LIVE: "bg-green-100 text-green-700", COMPLETED: "bg-slate-100 text-slate-600", CANCELLED: "bg-red-100 text-red-700" }
  return <Badge className={`text-xs ${m[status] ?? "bg-slate-100 text-slate-600"}`}>{status}</Badge>
}

function TicketStatusBadge({ status }: { status: string }) {
  const m: Record<string, string> = { OPEN: "bg-amber-100 text-amber-700", IN_PROGRESS: "bg-blue-100 text-blue-700", RESOLVED: "bg-green-100 text-green-700", CLOSED: "bg-slate-100 text-slate-600" }
  return <Badge className={`text-xs ${m[status] ?? "bg-slate-100 text-slate-600"}`}>{status}</Badge>
}

function SessionStatusBadge({ status }: { status: string }) {
  const m: Record<string, string> = {
    REQUESTED: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    APPROVED:  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    COMPLETED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    REJECTED:  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }
  return <Badge className={`text-xs ${m[status] ?? "bg-slate-100 text-slate-600"}`}>{status.charAt(0) + status.slice(1).toLowerCase()}</Badge>
}