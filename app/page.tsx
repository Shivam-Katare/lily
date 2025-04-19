"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getRandomParagraph } from "@/data/paragraphs";
import { getEncouragingMessage } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  const [quote, setQuote] = useState("");
  const [previewParagraph, setPreviewParagraph] = useState({ id: 1, text: "" });
  
  // Set initial data on client-side only
  useEffect(() => {
    // Set the initial quote on client-side only
    setQuote(getEncouragingMessage());
    setPreviewParagraph(getRandomParagraph());
    
    const interval = setInterval(() => {
      setQuote(getEncouragingMessage());
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const beginTyping = () => {
    router.push("/playground");
  };
  
  return (
    <main className="min-h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-serif tracking-wide mb-3">Lily</h1>
          <p className="text-lg text-muted-foreground">
            Type softly. Feel deeply.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-10 max-w-md"
        >
          <p className="italic text-muted-foreground">{quote}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <button
            onClick={beginTyping}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-medium text-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            Begin Calm Typing
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 max-w-lg"
        >
          <div className="p-5 bg-card rounded-lg shadow-sm hover:shadow transition-all duration-300">
            <p className="text-sm text-card-foreground/80 font-serif leading-relaxed">
              {previewParagraph.text}
            </p>
            <p className="mt-3 text-xs text-muted-foreground text-right">
              — Preview of typing content
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
