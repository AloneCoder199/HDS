'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Copy,
  CreditCard,
  Building2,
  Loader2,
  MessageCircle,
  Smartphone,
  Upload,
  X,
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { mentorships } from '@/data/mentorship';
import { submitEnrollmentRequest } from '@/app/actions/enrollment';  // 🆕 server action

interface Props {
  type: 'REGULAR' | 'ONE_TO_ONE';
  mentorshipSlug: string;
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
    activeBg: 'bg-green-500/10',
  },
  {
    value: 'JAZZCASH',
    label: 'JazzCash',
    icon: CreditCard,
    color: 'text-red-600',
    activeBorder: 'border-red-500',
    activeBg: 'bg-red-500/10',
  },
  {
    value: 'BANK_TRANSFER',
    label: 'Bank Transfer',
    icon: Building2,
    color: 'text-blue-600',
    activeBorder: 'border-blue-500',
    activeBg: 'bg-blue-500/10',
  },
];

export function EnrollmentForm({
  type,
  mentorshipSlug,
  onBack,
  onSuccess,
}: Props) {
  const mentorship = mentorships.find((m) => m.slug === mentorshipSlug);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Personal
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [education, setEducation] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [specificRequirements, setSpecificRequirements] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [copied, setCopied] = useState(false);
  const num = '03271543140';

  if (!mentorship) return null;

  // 💰 Dynamic pricing based on type
  const PRICE = type === 'ONE_TO_ONE' ? mentorship.oneToOneFee : mentorship.fee;
  const MARKET_VALUE = mentorship.marketValue;
  const SHOW_STRIKE = type === 'REGULAR';

  const copyNum = () => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

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

      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Upload failed');

      setPaymentScreenshot(data.secure_url);
      toast.success('Screenshot uploaded successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload image';
      toast.error(message);
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Validation
    if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim() || !education.trim()) {
      setError('Please fill in all required personal information fields.');
      return;
    }
    if (!/^03\d{9}$/.test(phone.replace(/\s/g, ''))) {
      setError('Enter a valid Pakistani number (e.g. 03271543140).');
      return;
    }
    if (type === 'ONE_TO_ONE' && !preferredTime) {
      setError('Please select a preferred time slot.');
      return;
    }
    if (!paymentMethod) {
      setError('Please select a payment method.');
      return;
    }
    if (!transactionId.trim()) {
      setError('Please enter the transaction ID.');
      return;
    }
    if (!paymentScreenshot) {
      setError('Please upload your payment screenshot.');
      return;
    }

    setIsSubmitting(true);

    // 🆕 Call server action directly (no /api/enroll fetch)
    const result = await submitEnrollmentRequest({
      type,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      education: education.trim(),
      mentorshipSlug,
      preferredTime: type === 'ONE_TO_ONE' ? preferredTime : undefined,
      specificRequirements:
        type === 'ONE_TO_ONE' ? specificRequirements.trim() : undefined,
      paymentMethod: paymentMethod as 'EASYPAISA' | 'JAZZCASH' | 'BANK_TRANSFER',
      transactionId: transactionId.trim(),
      paymentScreenshot,
    });

    setIsSubmitting(false);

    if (result.success) {
      toast.success('Enrollment submitted successfully!');
      onSuccess();
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
      toast.error(result.error || 'Submission failed');
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-3xl space-y-5"
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary-text"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>

      {/* Header — dynamic pricing */}
      <div className="rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/90 p-5 sm:p-6 text-white overflow-hidden relative">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
        <div className="relative">
          <p className="text-[11px] font-medium text-white/80 uppercase tracking-wider mb-1">
            {type === 'REGULAR' ? 'Regular Enrollment' : 'One-to-One Session'}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">{mentorship.name}</h2>
          <p className="text-xs text-white/75 mb-3">
            {mentorship.timing} · {mentorship.duration} · {mentorship.lectures}
          </p>

          <div className="flex items-baseline gap-2.5 flex-wrap">
            {SHOW_STRIKE && (
              <span className="text-sm text-white/60 line-through">
                Rs. {MARKET_VALUE.toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-bold">Rs. {PRICE.toLocaleString()}</span>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-[10px]">
              {type === 'ONE_TO_ONE' ? 'Full Price' : 'Seat Fee'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Crypto warning */}
      {mentorship.isCrypto && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed">
            <strong>Crypto trading mein nuqsan ka khatra hai.</strong> Yeh mentorship sirf taleem hai, munafa ki guarantee nahi.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
            <X className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Personal Info */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary-text text-xs font-bold">1</span>
            <h3 className="text-sm font-bold text-foreground">Personal Information</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-[11px]">Full Name <span className="text-destructive">*</span></Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ali Ahmad" className="h-10 text-sm bg-background border-border" autoComplete="name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[11px]">Email <span className="text-destructive">*</span></Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="h-10 text-sm bg-background border-border" autoComplete="email" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-[11px]">WhatsApp <span className="text-destructive">*</span></Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="03271543140" className="h-10 text-sm bg-background border-border" autoComplete="tel" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-[11px]">City <span className="text-destructive">*</span></Label>
              <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Lahore" className="h-10 text-sm bg-background border-border" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="education" className="text-[11px]">Education <span className="text-destructive">*</span></Label>
              <Input id="education" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="e.g. BBA, FSc, Matric" className="h-10 text-sm bg-background border-border" />
            </div>
          </div>

          {type === 'ONE_TO_ONE' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.25 }}
              className="mt-4 pt-4 border-t border-border space-y-3 overflow-hidden"
            >
              <div className="space-y-1.5">
                <Label htmlFor="preferredTime" className="text-[11px]">Preferred Time <span className="text-destructive">*</span></Label>
                <Select value={preferredTime} onValueChange={setPreferredTime}>
                  <SelectTrigger className="h-10 text-sm bg-background border-border" id="preferredTime">
                    <SelectValue placeholder="Select preferred time slot" />
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
              <div className="space-y-1.5">
                <Label htmlFor="specificRequirements" className="text-[11px]">Specific Requirements</Label>
                <Textarea id="specificRequirements" value={specificRequirements} onChange={(e) => setSpecificRequirements(e.target.value)} placeholder="Your goals, prior experience…" rows={3} className="text-sm bg-background border-border resize-none" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Payment */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary-text text-xs font-bold">2</span>
            <h3 className="text-sm font-bold text-foreground">Payment</h3>
          </div>

          <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2.5">Payment Details</p>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-muted-foreground">Account Holder</p>
                <p className="text-sm font-bold text-foreground uppercase">Ali Hassan</p>
              </div>
              <div className="flex items-center justify-between bg-background rounded-lg p-2.5 border border-border">
                <div>
                  <p className="text-[10px] font-bold text-primary-text">EasyPaisa / JazzCash</p>
                  <p className="text-base font-mono font-bold tracking-wider text-foreground">{num}</p>
                </div>
                <button type="button" onClick={copyNum} aria-label="Copy" className="p-1.5 hover:bg-primary/10 rounded-md">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-2.5 mb-4">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-destructive mt-0.5" />
            <p className="text-[11px] text-destructive/90 leading-relaxed">
              <strong>Payment sirf upar diye gaye official number par karein.</strong> HDS ka koi aur number nahi hai.
            </p>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 mb-4 text-[11px] text-foreground leading-relaxed">
            <span className="font-bold">{type === 'ONE_TO_ONE' ? 'Full Fee:' : 'Seat Fee:'}</span>{' '}
            PKR {PRICE.toLocaleString()}{' '}
            {SHOW_STRIKE && (
              <span className="text-muted-foreground line-through ml-1">
                (market value PKR {MARKET_VALUE.toLocaleString()})
              </span>
            )}
            <br />
            Pay the exact amount and upload your screenshot below.
          </div>

          <div className="space-y-2 mb-4">
            <Label className="text-[11px]">Payment Method <span className="text-destructive">*</span></Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isActive = paymentMethod === method.value;
                return (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setPaymentMethod(method.value)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${isActive ? `${method.activeBorder} ${method.activeBg}` : 'border-border hover:border-primary/40'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 shrink-0 ${isActive ? method.color : 'text-muted-foreground'}`} />
                      <span className={`font-medium text-xs ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{method.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5 mb-4">
            <Label htmlFor="transactionId" className="text-[11px]">Transaction ID <span className="text-destructive">*</span></Label>
            <Input id="transactionId" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="e.g. EP123456789" className="h-10 text-sm font-mono bg-background border-border" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px]">Payment Screenshot <span className="text-destructive">*</span></Label>
            <div className={`border-2 border-dashed rounded-xl p-5 text-center transition-colors ${paymentScreenshot ? 'border-green-500/40 bg-green-500/5' : 'border-border hover:border-primary/40'}`}>
              {paymentScreenshot ? (
                <div className="space-y-2">
                  <div className="relative inline-block">
                    <img src={paymentScreenshot} alt="Screenshot" className="max-h-40 rounded-lg mx-auto" />
                    <button type="button" onClick={() => setPaymentScreenshot('')} aria-label="Remove" className="absolute -top-1.5 -right-1.5 h-6 w-6 bg-destructive text-white rounded-full flex items-center justify-center">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 font-semibold">✓ Screenshot uploaded</p>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage} />
                  <div className="space-y-1.5 pointer-events-none">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mx-auto">
                      {uploadingImage ? <Loader2 className="h-5 w-5 text-primary animate-spin" /> : <Upload className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <p className="text-xs text-foreground font-medium">{uploadingImage ? 'Uploading…' : 'Click to upload payment screenshot'}</p>
                    <p className="text-[10px] text-muted-foreground">JPG, PNG, WebP — max 5 MB</p>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            By submitting, you agree to our{' '}
            <Link href="/terms" className="text-primary-text hover:underline font-medium">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-primary-text hover:underline font-medium">Privacy Policy</Link>.
            Review within 24–48 hours.
          </p>
        </div>

        {/* Submit */}
        <div className="space-y-3">
          <Button
            type="submit"
            disabled={isSubmitting || uploadingImage}
            className="w-full h-12 text-sm font-bold gradient-primary text-white rounded-xl shadow-glow disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting Enrollment…
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Complete Enrollment — PKR {PRICE.toLocaleString()}
              </>
            )}
          </Button>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <button type="button" onClick={onBack} className="inline-flex items-center gap-1 font-semibold hover:text-primary-text">
              <ArrowLeft className="h-3 w-3" /> Back
            </button>
            <a href="https://wa.me/923271543140" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium hover:text-primary-text">
              <MessageCircle className="h-3 w-3" /> Need help? WhatsApp us
            </a>
          </div>
        </div>
      </form>
    </motion.div>
  );
}