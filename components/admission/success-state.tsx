"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Plus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  onAnother: () => void
}

export function SuccessState({ onAnother }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md text-center rounded-3xl border border-border bg-card p-8 shadow-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
        >
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Enrollment Saved!
        </h1>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Student record has been added to the HDS master Google Sheet.
          Ali Hassan can now view this entry.
        </p>

        <div className="space-y-2.5">
          <Button
            onClick={onAnother}
            className="w-full h-11 gradient-primary text-white font-bold rounded-xl"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Student
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="w-full h-11 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}