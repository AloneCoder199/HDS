"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Play, Volume2, VolumeX } from "lucide-react";

export default function HDSWelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Show popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Handle video autoplay when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isOpen]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Close popup function
  const closePopup = () => {
    setIsOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closePopup();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      {/* Main Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0B1220] rounded-2xl shadow-2xl overflow-hidden border border-[#E5E7EB] dark:border-[#1F2937]">
        
        {/* CLOSE BUTTON - Top Right Corner */}
        <button
          onClick={closePopup}
          className="absolute top-3 right-3 z-50 w-10 h-10 rounded-full bg-white dark:bg-[#111827] hover:bg-red-50 dark:hover:bg-red-900/30 border-2 border-[#E5E7EB] dark:border-[#1F2937] hover:border-red-200 flex items-center justify-center text-[#111827] dark:text-white hover:text-red-500 transition-all duration-200 shadow-lg"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          
          {/* LEFT SIDE - Info */}
          <div className="p-6 flex flex-col justify-center bg-[#F9FAFB] dark:bg-[#111827]">
            <div className="space-y-4">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3495EB] flex items-center justify-center text-white text-xl font-bold">
                  H
                </div>
                <div>
                  <h3 className="font-bold text-[#111827] dark:text-white text-sm">Hassan Digital Skills</h3>
                  <p className="text-xs text-gray-500">Pakistan's #1 Digital Skills</p>
                </div>
              </div>

              {/* Content */}
              <div>
                <Badge className="bg-[#3495EB]/10 text-[#3495EB] border-0 text-xs mb-2">
                  🎓 Welcome to HDS
                </Badge>
                <h2 className="text-xl font-bold text-[#111827] dark:text-white mb-2 leading-tight">
                  Start Earning with <span className="text-[#3495EB]">Digital Skills</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                  Join 10,000+ students learning SMM, Web Development & Freelancing.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E5E7EB] dark:border-[#1F2937]">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#3495EB]">10K+</div>
                  <div className="text-xs text-gray-500">Students</div>
                </div>
                <div className="text-center border-x border-[#E5E7EB] dark:border-[#1F2937]">
                  <div className="text-lg font-bold text-[#3495EB]">95%</div>
                  <div className="text-xs text-gray-500">Success</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#3495EB]">100</div>
                  <div className="text-xs text-gray-500">PKR</div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>Scholarship Based</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>1-Month Internship</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>Verified Certificate</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/enroll" className="w-full">
                  <Button className="bg-[#3495EB] hover:bg-[#347ce0] text-white h-10 text-sm font-semibold rounded-lg w-full">
                    Apply Now - PKR 100
                  </Button>
                </Link>
                <Link href="/courses" className="w-full">
                  <Button variant="outline" className="border-[#E5E7EB] text-[#111827] h-10 text-sm rounded-lg w-full dark:text-white">
                    View Courses
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Video */}
          <div className="relative bg-black h-[300px] md:h-auto">
            <video
              ref={videoRef}
              className="w-full h-full object-contain bg-black"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              poster="/videos/review-thumbnail.jpg"
              onClick={togglePlay}
            >
              <source src="/videos/student-review.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Play Button */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="w-16 h-16 rounded-full bg-[#3495EB] flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 ml-1" />
                </div>
              </button>
            )}

            {/* Top Badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-red-500 text-white border-0 text-xs animate-pulse">
                ● Live Review
              </Badge>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  >
                    {isPlaying ? <span className="text-sm">⏸</span> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-white text-sm font-medium">Student Review</span>
                </div>
                <span className="text-white/80 text-xs">Ali Hassan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}