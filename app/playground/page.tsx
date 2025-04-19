"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useAppStore } from "@/store/store";
import { getRandomParagraph } from "@/data/paragraphs";
import { TypingInterface } from "@/components/typing-interface";
import { getEncouragingMessage } from "@/lib/utils";

export default function PlaygroundPage() {
  const router = useRouter();
  const resetSession = useAppStore((state) => state.resetSession);
  const [paragraph, setParagraph] = useState({ id: 1, text: "" });
  const [message, setMessage] = useState("");
  
  // Reset session and set paragraph when component mounts
  useEffect(() => {
    resetSession();
    setParagraph(getRandomParagraph());
  }, [resetSession]);
  
  // Set initial message and change it every 10 seconds
  useEffect(() => {
    // Set the initial message on client-side only
    setMessage(getEncouragingMessage());
    
    const interval = setInterval(() => {
      setMessage(getEncouragingMessage());
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goBack = () => {
    router.push("/");
  };
  
  return (
    <main className="min-h-[calc(100vh-5rem)] flex flex-col">
      <header className="w-full p-4 flex justify-between items-center">
        <button
          onClick={goBack}
          className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </button>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-10 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <p className="text-muted-foreground italic mb-10">
            {message}
          </p>
        </motion.div>
        
        <TypingInterface paragraph={paragraph} />
      </div>
    </main>
  );
} 