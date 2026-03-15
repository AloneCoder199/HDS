'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Loader2,
  Upload,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
  X,
  Award,
} from 'lucide-react';
import { submitEnrollmentRequest } from '@/app/actions/enrollment';
import { coursesData } from '@/lib/CourseData';
import { scholarshipsData } from '@/lib/scholarshipData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// ✅ FIXED: Added scholarshipId to interface
interface Props {
  type: 'REGULAR' | 'ONE_TO_ONE';
  courseId: string;
  scholarshipId?: string | null; // Yeh add kiya hai
  onBack: () => void;
  onSuccess: () => void;
}

const paymentMethods = [
  {
    value: 'EASYPAISA',
    label: 'EasyPaisa',
    icon: Smartphone,
    color: 'text-green-600',
    activeBorder: 'border-green-500',
    activeBg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    value: 'JAZZCASH',
    label: 'JazzCash',
    icon: CreditCard,
    color: 'text-red-600',
    activeBorder: 'border-red-500',
    activeBg: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    value: 'BANK_TRANSFER',
    label: 'Bank Transfer',
    icon: Building2,
    color: 'text-blue-600',
    activeBorder: 'border-blue-500',
    activeBg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    value: 'CASH',
    label: 'Cash Payment',
    icon: Banknote,
    color: 'text-amber-600',
    activeBorder: 'border-amber-500',
    activeBg: 'bg-amber-50 dark:bg-amber-900/20',
  },
];

// ✅ FIXED: Added scholarshipId parameter
export function EnrollmentForm({ type, courseId, scholarshipId, onBack, onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Personal info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [specificRequirements, setSpecificRequirements] = useState('');

  // Payment info
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const course = coursesData.find((c) => c.id === courseId);
  
  // ✅ FIXED: Calculate price with scholarship discount
  const scholarship = scholarshipId ? scholarshipsData.find((s) => s.id === scholarshipId) : null;
  const originalPrice = course?.price || 0;
  
  // Calculate discounted price
  const getDiscountedPrice = () => {
    if (!scholarship) return originalPrice;
    
    // Parse discount percentage from string like "50% OFF"
    const discountMatch = scholarship.discount.match(/(\d+)%/);
    if (discountMatch) {
      const discountPercent = parseInt(discountMatch[1], 10);
      return Math.round(originalPrice * (1 - discountPercent / 100));
    }
    
    // If discount is in amount format like "5000 PKR OFF"
    const amountMatch = scholarship.discount.match(/(\d+)/);
    if (amountMatch) {
      const discountAmount = parseInt(amountMatch[1], 10);
      return Math.max(0, originalPrice - discountAmount);
    }
    
    return originalPrice;
  };
  
  const finalPrice = getDiscountedPrice();
  const hasDiscount = scholarship && finalPrice < originalPrice;

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPG, PNG, etc.)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setPaymentScreenshot(data.secure_url);
      toast.success('Screenshot uploaded successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload image';
      toast.error(message);
      console.error('[Upload Error]', err);
    } finally {
      setUploadingImage(false);
      // Reset input so the same file can be re-selected if needed
      e.target.value = '';
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Validation
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all required personal information fields.');
      return;
    }

    if (type === 'ONE_TO_ONE' && !preferredTime) {
      setError('Please select a preferred time slot for the one-to-one session.');
      return;
    }

    if (!paymentMethod) {
      setError('Please select a payment method.');
      return;
    }

    if (!transactionId.trim() || !paymentAmount) {
      setError('Please fill in the transaction ID and amount paid.');
      return;
    }

    if (!paymentScreenshot) {
      setError('Please upload your payment screenshot to proceed.');
      return;
    }

    setIsSubmitting(true);

    // ✅ FIXED: Include scholarshipId in submission data
    const data = {
      type,
      courseId,
      scholarshipId: scholarshipId || undefined, // Include scholarship if selected
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      preferredTime: type === 'ONE_TO_ONE' ? preferredTime : undefined,
      specificRequirements: type === 'ONE_TO_ONE' ? specificRequirements.trim() : undefined,
      paymentMethod: paymentMethod as 'EASYPAISA' | 'JAZZCASH' | 'BANK_TRANSFER' | 'CASH',
      transactionId: transactionId.trim(),
      paymentAmount: parseInt(paymentAmount, 10),
      paymentScreenshot,
      originalPrice, // Track original price
      finalPrice,    // Track discounted price
    };

    try {
      const result = await submitEnrollmentRequest(data);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!course) return null;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#111827]/70 dark:text-white/70 hover:text-[#3495EB] transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Course Header */}
      <div className="bg-[#3495EB] rounded-xl p-6 text-white">
        <p className="text-sm opacity-80 mb-1">
          {type === 'REGULAR' ? 'Regular Class Enrollment' : 'One-to-One Session Enrollment'}
        </p>
        <h2 className="text-2xl font-bold">{course.title}</h2>
        
        {/* ✅ FIXED: Show scholarship badge and pricing */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {scholarship && (
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Award className="w-3 h-3 mr-1" />
              {scholarship.title}
            </Badge>
          )}
          
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="text-white/60 line-through text-sm">
                PKR {originalPrice.toLocaleString()}
              </span>
            )}
            <span className="font-semibold text-lg">
              PKR {finalPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-white">
                {scholarship?.discount}
              </span>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Error Banner */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            <X className="w-4 h-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {/* ── Section 1: Personal Information ── */}
        <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-xl p-6 border border-[#E5E7EB] dark:border-[#1F2937]">
          <h3 className="text-lg font-semibold text-[#111827] dark:text-white mb-5 flex items-center gap-3">
            <span className="w-8 h-8 bg-[#3495EB]/10 rounded-full flex items-center justify-center text-[#3495EB] text-sm font-bold shrink-0">
              1
            </span>
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#111827] dark:text-white">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="h-12 bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937]"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#111827] dark:text-white">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937]"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="phone" className="text-[#111827] dark:text-white">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+92 300 1234567"
              className="h-12 bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937]"
              autoComplete="tel"
            />
          </div>

          {/* One-to-One Extra Fields */}
          {type === 'ONE_TO_ONE' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.25 }}
              className="mt-6 pt-6 border-t border-[#E5E7EB] dark:border-[#1F2937] space-y-4 overflow-hidden"
            >
              <div className="space-y-2">
                <Label htmlFor="preferredTime" className="text-[#111827] dark:text-white">
                  Preferred Learning Time <span className="text-red-500">*</span>
                </Label>
                <Select value={preferredTime} onValueChange={setPreferredTime}>
                  <SelectTrigger className="h-12 bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937]" id="preferredTime">
                    <SelectValue placeholder="Select your preferred time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9 AM – 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM – 5 PM)</SelectItem>
                    <SelectItem value="evening">Evening (5 PM – 9 PM)</SelectItem>
                    <SelectItem value="weekend">Weekends Only</SelectItem>
                    <SelectItem value="flexible">Flexible / Anytime</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specificRequirements" className="text-[#111827] dark:text-white">
                  Specific Requirements
                </Label>
                <Textarea
                  id="specificRequirements"
                  value={specificRequirements}
                  onChange={(e) => setSpecificRequirements(e.target.value)}
                  placeholder="Share your learning goals, prior experience, or any specific requirements…"
                  rows={3}
                  className="bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937]"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Section 2: Payment Details ── */}
        <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-xl p-6 border border-[#E5E7EB] dark:border-[#1F2937]">
          <h3 className="text-lg font-semibold text-[#111827] dark:text-white mb-5 flex items-center gap-3">
            <span className="w-8 h-8 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center text-[#8B5CF6] text-sm font-bold shrink-0">
              2
            </span>
            Payment Details
          </h3>

          {/* Fee Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6 text-sm text-amber-800 dark:text-amber-400">
            <p>
              {hasDiscount ? (
                <>
                  <span className="font-semibold">Original Fee: PKR {originalPrice.toLocaleString()}</span>
                  <br />
                  <span className="font-semibold text-green-600">
                    Scholarship Applied: {scholarship?.discount} → You Pay: PKR {finalPrice.toLocaleString()}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-semibold">Course Fee: PKR {originalPrice.toLocaleString()}</span>
                </>
              )}
              <br />
              Please pay the amount using any method below, then upload your payment screenshot.
            </p>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2 mb-5">
            <Label className="text-[#111827] dark:text-white">
              Payment Method <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isActive = paymentMethod === method.value;
                return (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setPaymentMethod(method.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                      isActive
                        ? `${method.activeBorder} ${method.activeBg}`
                        : 'border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 shrink-0 ${isActive ? method.color : 'text-[#111827]/40 dark:text-white/40'}`} />
                      <span
                        className={`font-medium text-sm ${
                          isActive ? 'text-[#111827] dark:text-white' : 'text-[#111827]/70 dark:text-white/70'
                        }`}
                      >
                        {method.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transaction ID & Amount */}
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="space-y-2">
              <Label htmlFor="transactionId" className="text-[#111827] dark:text-white">
                Transaction ID (TRX ID) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g. EP123456789"
                className="h-12 font-mono bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937]"
              />
              <p className="text-xs text-[#111827]/50 dark:text-white/50">Found on your payment receipt or confirmation SMS</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentAmount" className="text-[#111827] dark:text-white">
                Amount Paid (PKR) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="paymentAmount"
                type="number"
                min={1}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder={finalPrice.toString()}
                className="h-12 bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937]"
              />
              <p className="text-xs text-[#111827]/50 dark:text-white/50">
                Expected: PKR {finalPrice.toLocaleString()}
                {hasDiscount && ` (Discounted from ${originalPrice.toLocaleString()})`}
              </p>
            </div>
          </div>

          {/* Screenshot Upload */}
          <div className="space-y-2">
            <Label className="text-[#111827] dark:text-white">
              Payment Screenshot <span className="text-red-500">*</span>
            </Label>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                paymentScreenshot
                  ? 'border-green-400 dark:border-green-600'
                  : 'border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB] dark:hover:border-[#3495EB]'
              }`}
            >
              {paymentScreenshot ? (
                <div className="space-y-3">
                  <div className="relative inline-block">
                    <img
                      src={paymentScreenshot}
                      alt="Payment Screenshot"
                      className="max-h-48 rounded-lg mx-auto shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setPaymentScreenshot('')}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow transition-colors"
                      aria-label="Remove screenshot"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    ✓ Screenshot uploaded successfully
                  </p>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                  <div className="space-y-2 pointer-events-none">
                    <div className="w-12 h-12 bg-[#F9FAFB] dark:bg-[#111827] rounded-full flex items-center justify-center mx-auto">
                      {uploadingImage ? (
                        <Loader2 className="w-6 h-6 text-[#3495EB] animate-spin" />
                      ) : (
                        <Upload className="w-6 h-6 text-[#111827]/40 dark:text-white/40" />
                      )}
                    </div>
                    <p className="text-sm text-[#111827]/70 dark:text-white/70 font-medium">
                      {uploadingImage ? 'Uploading screenshot…' : 'Click to upload payment screenshot'}
                    </p>
                    <p className="text-xs text-[#111827]/50 dark:text-white/50">JPG, PNG, WebP — max 5 MB</p>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || uploadingImage}
            className="w-full h-14 text-base font-semibold bg-[#3495EB] hover:bg-[#347ce0] text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all rounded-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting Enrollment…
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                {hasDiscount 
                  ? `Complete Enrollment — PKR ${finalPrice.toLocaleString()} (Save ${scholarship?.discount})`
                  : `Complete Enrollment — PKR ${finalPrice.toLocaleString()}`
                }
              </>
            )}
          </Button>

          <p className="text-center text-xs text-[#111827]/50 dark:text-white/50 mt-4">
            By submitting, you agree to our terms and conditions. Your enrollment will be reviewed
            within 24–48 hours.
          </p>
        </div>
      </form>
    </div>
  );
}