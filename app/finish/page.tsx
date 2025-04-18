"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, RefreshCw } from "lucide-react";
import { useAppStore } from "@/store/store";
import { StatsDisplay } from "@/components/stats-display";
import { getCompletionQuote } from "@/lib/utils";
import { useUser, useSession } from "@clerk/nextjs";
import { useTypingSessionsStore } from "@/store/typing-sessions";

export default function FinishPage() {
  const router = useRouter();
  const resetSession = useAppStore((state) => state.resetSession);
  const [quote, setQuote] = useState(getCompletionQuote());
  const { user, isLoaded, isSignedIn } = useUser();
  const { session } = useSession();
  const { saveSession, status, isSaving } = useTypingSessionsStore();
  const saveAttemptedRef = useRef(false);
  const stats = useAppStore((state) => state.stats);
  
  // Prevent accessing this page directly without completing a session
  useEffect(() => {
    if (useAppStore.getState().stats.time === 0) {
      router.replace("/");
    }
  }, [router]);
  
  // Save session data if user is authenticated
  useEffect(() => {
    const saveTypingSession = async () => {
      // Check if save was already attempted to prevent double saves
      if (saveAttemptedRef.current) return;
      
      if (isLoaded && isSignedIn && user && session && stats.time > 0) {
        saveAttemptedRef.current = true;
        
        try {
          const token = await session.getToken();
          if (token) {
            await saveSession(
              {
                wpm: stats.wpm,
                accuracy: stats.accuracy,
                duration_seconds: stats.time,
              },
              user.id,
              token
            );
          }
        } catch (error) {
          console.error('Failed to save typing session:', error);
        }
      }
    };

    saveTypingSession();
  }, [isLoaded, isSignedIn, user, session, saveSession, stats]);
  
  const goHome = () => {
    resetSession();
    router.push("/");
  };
  
  const tryAgain = () => {
    resetSession();
    router.push("/playground");
  };
  
  return (
    <main className="min-h-[calc(100vh-5rem)] flex flex-col">
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
        
        {isSignedIn && status === 'loading' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              <span>Saving your session...</span>
            </div>
          </motion.div>
        )}
        
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