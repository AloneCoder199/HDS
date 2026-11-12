'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Mail, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SubmitSuccess() {
  return (
    <div className="text-center py-12">
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 dark:text-green-400" />
      </motion.div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
        Request Submitted Successfully!
      </h2>

      <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
        Your enrollment request has been received and is now under review by our
        admin team. You will receive an email once your payment is verified.
      </p>

      {/* Steps grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl"
        >
          <Mail className="w-7 h-7 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Check Email
          </h3>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Confirmation sent to your inbox
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl"
        >
          <Clock className="w-7 h-7 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Wait for Review
          </h3>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            24–48 hours processing time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 bg-green-500/10 border border-green-500/20 rounded-xl"
        >
          <CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Get Approved
          </h3>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Receive login credentials
          </p>
        </motion.div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/">
          <Button variant="outline" size="lg" className="rounded-xl">
            Back to Home
          </Button>
        </Link>

        <Link href="/mentorships">
          <Button
            size="lg"
            className="gradient-primary text-white rounded-xl border-0"
          >
            Browse All Mentorships
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* WhatsApp help */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 pt-6 border-t border-border max-w-md mx-auto"
      >
        <p className="text-[11px] text-muted-foreground mb-2">
          Questions about your enrollment?
        </p>
        <a
          href="https://wa.me/923271543140"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-text hover:underline"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp us at 0327 1543140
        </a>
      </motion.div>
    </div>
  );
}