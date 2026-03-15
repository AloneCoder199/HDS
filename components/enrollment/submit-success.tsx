'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Mail, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SubmitSuccess() {
  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
      </motion.div>

      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        Request Submitted Successfully!
      </h2>
      
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto">
        Your enrollment request has been received and is now under review by our admin team.
      </p>

      <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Check Email</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Confirmation sent to your inbox</p>
        </div>
        
        <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
          <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Wait for Review</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">24-48 hours processing time</p>
        </div>
        
        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Get Approved</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Receive login credentials</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/">
          <Button variant="outline" size="lg">
            Back to Home
          </Button>
        </Link>
        
        <Link href="/courses">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500">
            Browse More Courses <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}