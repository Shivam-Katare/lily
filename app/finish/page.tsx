"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, RefreshCw } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { StatsDisplay } from "@/components/stats-display";
import { ThemeToggle } from "@/components/theme-toggle";
import { SoundToggle } from "@/components/sound-toggle";
import { getCompletionQuote } from "@/lib/utils";

export default function FinishPage() {
  const router = useRouter();
  const resetSession = useAppStore((state) => state.resetSession);
  const [quote, setQuote] = useState(getCompletionQuote());
  
  // Prevent accessing this page directly without completing a session
  useEffect(() => {
    if (useAppStore.getState().stats.time === 0) {
      router.replace("/");
    }
  }, [router]);
  
  const goHome = () => {
    resetSession();
    router.push("/");
  };
  
  const tryAgain = () => {
    resetSession();
    router.push("/playground");
  };
  
  return (
    <main className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-end items-center">
        <div className="flex items-center gap-1">
          <SoundToggle />
          <ThemeToggle />
        </div>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-serif mb-3">Calm Complete</h1>
          <p className="text-muted-foreground">
            Your typing journey has reached its peaceful conclusion.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-lg mb-10"
        >
          <blockquote className="text-xl font-serif italic">
            "{quote}"
          </blockquote>
        </motion.div>
        
        <StatsDisplay />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={tryAgain}
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow transition-all"
            aria-label="Try again"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Type Again</span>
          </button>
          
          <button
            onClick={goHome}
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            aria-label="Return home"
          >
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </button>
        </motion.div>
      </div>
    </main>
  );
} 