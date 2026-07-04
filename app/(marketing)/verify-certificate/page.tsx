"use client";

import { useState } from "react";
import { 
  Search, ShieldCheck, ShieldAlert, User, 
  BookOpen, Mail, Phone, CalendarDays, Loader2 
} from "lucide-react";

export default function VerifyStudentPage() {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;

    setLoading(true);
    setError("");
    setStudentData(null);

    try {
      const res = await fetch(`/api/verify-student?studentId=${studentId}`);
      const data = await res.json();

      if (data.success) {
        setStudentData(data.data);
      } else {
        setError(data.message || "Student not found");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-gradient-soft flex flex-col items-center justify-center p-4 sm:p-8 theme-transition font-sans">
      
      {/* Search Container */}
      <div className="glass shadow-soft p-8 rounded-2xl w-full max-w-2xl border border-border transition-smooth mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-3 tracking-tight">
            Verify Student Status
          </h1>
          <p className="text-muted-foreground">
            Enter your Student ID to view enrollment details and verification status.
          </p>
        </div>

        <form onSubmit={handleVerify} className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-32 py-4 bg-input/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth shadow-sm"
            placeholder="e.g. ADMIN-001"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value.toUpperCase())}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 gradient-primary hover-lift text-primary-foreground px-6 rounded-lg font-medium flex items-center justify-center disabled:opacity-70 disabled:hover:transform-none"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive flex items-center gap-3 animate-in fade-in zoom-in duration-300">
            <ShieldAlert className="h-5 w-5" />
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>

      {/* Student Details Card */}
      {studentData && (
        <div className="glass shadow-soft p-8 rounded-2xl w-full max-w-2xl border border-border animate-in slide-in-from-bottom-4 fade-in duration-500">
          
          {/* Header Profile Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border pb-6 mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full gradient-accent flex items-center justify-center text-white text-2xl font-bold shadow-glow">
                {studentData.fullName.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{studentData.fullName}</h2>
                <p className="text-muted-foreground font-medium">ID: {studentData.studentId}</p>
              </div>
            </div>

            {/* Verification Badge */}
            {studentData.isActive ? (
              <div className="flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-4 py-2 rounded-full shadow-sm">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-semibold text-sm">Verified Student</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive/20 px-4 py-2 rounded-full shadow-sm">
                <ShieldAlert className="h-5 w-5" />
                <span className="font-semibold text-sm">Inactive / Suspended</span>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Course Information */}
            <div className="p-4 rounded-xl bg-card border border-border hover:shadow-soft transition-smooth">
              <div className="flex items-center gap-3 text-muted-foreground mb-1">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Enrolled Course</span>
              </div>
              <p className="text-foreground font-semibold text-lg">{studentData.courseTitle}</p>
              <p className="text-xs text-muted-foreground mt-1 capitalize">
                Type: {studentData.enrollmentType.toLowerCase()}
              </p>
            </div>

            {/* Email Address */}
            <div className="p-4 rounded-xl bg-card border border-border hover:shadow-soft transition-smooth">
              <div className="flex items-center gap-3 text-muted-foreground mb-1">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Email Address</span>
              </div>
              <p className="text-foreground font-semibold truncate">{studentData.email}</p>
            </div>

            {/* Phone Number */}
            <div className="p-4 rounded-xl bg-card border border-border hover:shadow-soft transition-smooth">
              <div className="flex items-center gap-3 text-muted-foreground mb-1">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Phone Number</span>
              </div>
              <p className="text-foreground font-semibold">{studentData.phone}</p>
            </div>

            {/* Join Date */}
            <div className="p-4 rounded-xl bg-card border border-border hover:shadow-soft transition-smooth">
              <div className="flex items-center gap-3 text-muted-foreground mb-1">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Joining Date</span>
              </div>
              <p className="text-foreground font-semibold">
                {new Date(studentData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}