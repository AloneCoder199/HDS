"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Review images data (30 items)
const reviewImages = [
  { id: 1, src: "/reviews/review (1).jpeg", name: "Ali R.", location: "Lahore", rating: 5 },
  { id: 2, src: "/reviews/review (2).jpeg", name: "Sara K.", location: "Karachi", rating: 5 },
  { id: 3, src: "/reviews/review (3).jpeg", name: "Ahmed M.", location: "Islamabad", rating: 5 },
  { id: 4, src: "/reviews/review (4).jpeg", name: "Fatima S.", location: "Faisalabad", rating: 5 },
  { id: 5, src: "/reviews/review (5).jpeg", name: "Hassan A.", location: "Rawalpindi", rating: 5 },
  { id: 6, src: "/reviews/review (6).jpeg", name: "Ayesha B.", location: "Multan", rating: 5 },
  { id: 7, src: "/reviews/review (7).jpeg", name: "Usman T.", location: "Gujranwala", rating: 5 },
  { id: 8, src: "/reviews/review (8).jpeg", name: "Maria G.", location: "Sialkot", rating: 5 },
  { id: 9, src: "/reviews/review (9).jpeg", name: "Bilal K.", location: "Peshawar", rating: 5 },
  { id: 10, src: "/reviews/review (10).jpeg", name: "Zainab H.", location: "Quetta", rating: 5 },
  { id: 11, src: "/reviews/review (11).jpeg", name: "Tariq M.", location: "Sargodha", rating: 5 },
  { id: 12, src: "/reviews/review (12).jpeg", name: "Nida F.", location: "Bahawalpur", rating: 5 },
  { id: 13, src: "/reviews/review (13).jpeg", name: "Kamran S.", location: "Sheikhupura", rating: 5 },
  { id: 14, src: "/reviews/review (14).jpeg", name: "Rabia A.", location: "Gujrat", rating: 5 },
  { id: 15, src: "/reviews/review (15).jpeg", name: "Fahad J.", location: "Sahiwal", rating: 5 },
  { id: 16, src: "/reviews/review (16).jpeg", name: "Sana I.", location: "Okara", rating: 5 },
  { id: 17, src: "/reviews/review (17).jpeg", name: "Imran H.", location: "Mardan", rating: 5 },
  { id: 18, src: "/reviews/review (18).jpeg", name: "Mehwish T.", location: "Larkana", rating: 5 },
  { id: 19, src: "/reviews/review (19).jpeg", name: "Shahid K.", location: "Mingora", rating: 5 },
  { id: 20, src: "/reviews/review (20).jpeg", name: "Asma L.", location: "Kasur", rating: 5 },
  { id: 21, src: "/reviews/review (21).jpeg", name: "Zara M.", location: "Hyderabad", rating: 5 },
  { id: 22, src: "/reviews/review (22).jpeg", name: "Omar F.", location: "Sukkur", rating: 5 },
  { id: 23, src: "/reviews/review (23).jpeg", name: "Nadia S.", location: "Jhang", rating: 5 },
  { id: 24, src: "/reviews/review (24).jpeg", name: "Waqar H.", location: "Rahim Yar Khan", rating: 5 },
  { id: 25, src: "/reviews/review (25).jpeg", name: "Saima R.", location: "Abbottabad", rating: 5 },
  { id: 26, src: "/reviews/review (26).jpeg", name: "Tahir J.", location: "Wah", rating: 5 },
  { id: 27, src: "/reviews/review (27).jpeg", name: "Farah K.", location: "Mirpur", rating: 5 },
  { id: 28, src: "/reviews/review (28).jpeg", name: "Adnan M.", location: "Gujar Khan", rating: 5 },
  { id: 29, src: "/reviews/review (29).jpeg", name: "Samina T.", location: "Chiniot", rating: 5 },
  { id: 30, src: "/reviews/review (30).jpeg", name: "Babar A.", location: "Swat", rating: 5 },
];

export default function ReviewsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof reviewImages[0] | null>(null);

  // Triple the array for seamless infinite scroll
  const tripleReviews = [...reviewImages, ...reviewImages, ...reviewImages];
  const tripleReviewsReverse = [...reviewImages.slice().reverse(), ...reviewImages.slice().reverse(), ...reviewImages.slice().reverse()];

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-[#0B1220] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <Badge className="bg-[#3495EB]/10 dark:bg-[#3495EB]/20 text-[#3495EB] border-0 mb-4">
            ⭐ Success Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white mb-4">
            What Our Students <span className="text-[#3495EB]">Say</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Join 10,000+ successful students who transformed their careers with HDS
          </p>
        </div>
      </div>

      {/* Row 1 - Left to Right */}
      <div 
        className="relative mb-6 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="flex gap-5"
          style={{
            animation: isPaused ? 'none' : 'scrollLeft 60s linear infinite',
            width: 'fit-content'
          }}
        >
          {tripleReviews.map((review, index) => (
            <div 
              key={`row1-${review.id}-${index}`}
              className="flex-shrink-0 w-64 cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedImage(review)}
            >
              <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-xl border border-[#E5E7EB] dark:border-[#1F2937] overflow-hidden hover:shadow-xl hover:border-[#3495EB]/30 transition-all duration-300">
                {/* Full Image Container - No Cropping */}
                <div className="relative w-full h-auto min-h-[200px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2">
                  <Image
                    src={review.src}
                    alt={`Review by ${review.name} from ${review.location}`}
                    width={256}
                    height={300}
                    className="w-full h-auto object-contain rounded-lg"
                    style={{ maxHeight: '350px' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#3495EB]/0 hover:bg-[#3495EB]/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="w-12 h-12 rounded-full bg-[#3495EB] flex items-center justify-center text-white shadow-lg">
                      <span className="text-xl">🔍</span>
                    </div>
                  </div>
                </div>
                
                {/* Compact Info */}
                <div className="p-3 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#3495EB]/10 flex items-center justify-center text-xs font-bold text-[#3495EB]">
                        {review.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-[#111827] dark:text-white">{review.name}</span>
                    </div>
                    <div className="flex text-yellow-500 text-xs">
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <span>📍</span>
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-[#0B1220] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-[#0B1220] to-transparent z-10 pointer-events-none" />
      </div>

      {/* Row 2 - Right to Left */}
      <div 
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="flex gap-5"
          style={{
            animation: isPaused ? 'none' : 'scrollRight 55s linear infinite',
            width: 'fit-content'
          }}
        >
          {tripleReviewsReverse.map((review, index) => (
            <div 
              key={`row2-${review.id}-${index}`}
              className="flex-shrink-0 w-64 cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedImage(review)}
            >
              <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-xl border border-[#E5E7EB] dark:border-[#1F2937] overflow-hidden hover:shadow-xl hover:border-[#3495EB]/30 transition-all duration-300">
                <div className="relative w-full h-auto min-h-[200px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2">
                  <Image
                    src={review.src}
                    alt={`Review by ${review.name} from ${review.location}`}
                    width={256}
                    height={300}
                    className="w-full h-auto object-contain rounded-lg"
                    style={{ maxHeight: '350px' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-[#3495EB]/0 hover:bg-[#3495EB]/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="w-12 h-12 rounded-full bg-[#3495EB] flex items-center justify-center text-white shadow-lg">
                      <span className="text-xl">🔍</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#3495EB]/10 flex items-center justify-center text-xs font-bold text-[#3495EB]">
                        {review.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-[#111827] dark:text-white">{review.name}</span>
                    </div>
                    <div className="flex text-yellow-500 text-xs">
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <span>📍</span>
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-[#0B1220] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-[#0B1220] to-transparent z-10 pointer-events-none" />
      </div>

      {/* Stats & CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
          {[
            { label: "Total Reviews", value: "500+", icon: "⭐" },
            { label: "Success Stories", value: "10K+", icon: "🎓" },
            { label: "Cities", value: "50+", icon: "📍" },
            { label: "Success Rate", value: "95%", icon: "📈" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 bg-[#F9FAFB] dark:bg-[#111827] rounded-xl border border-[#E5E7EB] dark:border-[#1F2937]">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-[#111827] dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Ready to write your own success story?</p>
          <Link href="/enroll">
            <Button className="bg-[#3495EB] hover:bg-[#347ce0] text-white px-8 h-12 rounded-lg font-semibold shadow-lg shadow-[#3495EB]/20">
              Join HDS Today
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white dark:bg-[#0B1220] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {/* Image Container */}
            <div className="relative w-full max-h-[80vh] bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
              <Image
                src={selectedImage.src}
                alt={`Review by ${selectedImage.name}`}
                width={800}
                height={1000}
                className="w-full h-auto object-contain max-h-[70vh]"
                priority
              />
            </div>

            {/* Info Footer */}
            <div className="p-6 border-t border-[#E5E7EB] dark:border-[#1F2937]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#3495EB]/10 flex items-center justify-center text-xl font-bold text-[#3495EB]">
                    {selectedImage.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] dark:text-white">
                      {selectedImage.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>📍 {selectedImage.location}</span>
                      <span>•</span>
                      <span className="text-yellow-500">{"★".repeat(selectedImage.rating)}</span>
                    </div>
                  </div>
                </div>
                <Link href="/enroll">
                  <Button className="bg-[#3495EB] hover:bg-[#347ce0] text-white rounded-lg">
                    Start Your Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}