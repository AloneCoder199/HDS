'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  BookOpen,
  BrainCircuit,
  Calendar,
  Clock,
  LineChart,
  Megaphone,
} from 'lucide-react';
import type { Mentorship } from '@/data/mentorship';

const iconMap = {
  brain: BrainCircuit,
  megaphone: Megaphone,
  chart: LineChart,
};

interface MentorshipSelectionProps {
  onSelect: (slug: string) => void;
  onBack: () => void;
  mentorships: Mentorship[];
  type: 'REGULAR' | 'ONE_TO_ONE'; // 🆕
}

export function MentorshipSelection({
  onSelect,
  onBack,
  mentorships,
  type, // 🆕
}: MentorshipSelectionProps) {
  const isOneToOne = type === 'ONE_TO_ONE';

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Select Your Mentorship
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {isOneToOne
            ? 'Choose from 3 top-demand mentorships. One-to-One full mentorship price.'
            : 'Choose from 3 top-demand mentorships. Market value Rs. 25,000 → seat fee Rs. 200.'}
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {mentorships.map((m, i) => {
          const Icon = iconMap[m.icon];
          const price = isOneToOne ? m.oneToOneFee : m.fee;

          return (
            <motion.button
              key={m.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => onSelect(m.slug)}
              className="group flex w-full items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Icon */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${m.colors.bg} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className={`h-5 w-5 ${m.colors.text}`} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-foreground transition-colors group-hover:text-primary-text">
                  {m.name}
                </h3>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {m.tagline}
                </p>

                {/* Meta pills */}
                <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                  <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-muted-foreground">
                    <Clock className="h-2.5 w-2.5" />
                    {m.timing}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-muted-foreground">
                    <Calendar className="h-2.5 w-2.5" />
                    {m.startDate}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-muted-foreground">
                    <BookOpen className="h-2.5 w-2.5" />
                    {m.lectures}
                  </span>
                </div>

                {/* Crypto warning */}
                {m.isCrypto && (
                  <div className="mt-2 flex items-start gap-1.5 rounded-md bg-destructive/10 px-2 py-1 text-[10px] text-destructive/90">
                    <AlertTriangle className="h-2.5 w-2.5 mt-0.5 shrink-0" />
                    <span>
                      Crypto trading mein nuqsan ka khatra hai. Yeh mentorship
                      sirf taleem hai.
                    </span>
                  </div>
                )}
              </div>

              {/* Price + Arrow — dynamic based on type */}
              <div className="flex shrink-0 items-center gap-2 self-center">
                <div className="text-right">
                  {!isOneToOne && (
                    <p className="text-[9px] text-muted-foreground line-through">
                      Rs. {m.marketValue.toLocaleString()}
                    </p>
                  )}
                  <p className="text-sm font-bold text-primary-text">
                    Rs. {price.toLocaleString()}
                  </p>
                  <p className="text-[8px] text-muted-foreground">
                    {isOneToOne ? 'Full Price' : 'Seat Fee'}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary-text" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Back */}
      <div className="mt-6 flex justify-start">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>
    </div>
  );
}