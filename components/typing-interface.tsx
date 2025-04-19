"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/store";
import { splitIntoWords, calculateStats } from "@/lib/utils";
import { playKeypressSound, playErrorSound, playCompleteSound } from "@/lib/sound";
import { useRouter } from "next/navigation";
import { Paragraph } from "@/data/paragraphs";

interface TypingInterfaceProps {
  paragraph: Paragraph;
}

export function TypingInterface({ paragraph }: TypingInterfaceProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const words = splitIntoWords(paragraph.text);
  
  const {
    currentInput,
    setCurrentInput,
    currentWordIndex,
    setCurrentWordIndex,
    correctWords,
    incorrectWords,
    incrementCorrectWords,
    incrementIncorrectWords,
    setStartTime,
    setEndTime,
    setStats,
    isSoundEnabled,
    mode,
  } = useAppStore();
  
  const [typedWords, setTypedWords] = useState<{ text: string; correct: boolean }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLimit] = useState(mode === 'timed' ? 60 : 0); // 60 seconds for timed mode
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    return () => {
      // Clean up on unmount
      setCurrentInput("");
      setCurrentWordIndex(0);
    };
  }, [setCurrentInput, setCurrentWordIndex]);
  
  // Handle timer for timed mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && mode === 'timed' && timeLimit > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleCompletion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, mode, timeLimit]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);
    
    // Start timer on first keystroke
    if (!timerActive && value.length === 1) {
      setTimerActive(true);
      setStartTime(Date.now());
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Space key - check word
    if (e.key === " " && currentInput.trim()) {
      e.preventDefault();
      
      const isCorrect = currentInput.trim() === words[currentWordIndex];
      
      // Play sound
      if (isSoundEnabled) {
        if (isCorrect) {
          playKeypressSound();
        } else {
          playErrorSound();
        }
      }
      
      // Update stats
      if (isCorrect) {
        incrementCorrectWords();
      } else {
        incrementIncorrectWords();
      }
      
      // Update typed words
      setTypedWords([...typedWords, { text: currentInput.trim(), correct: isCorrect }]);
      
      // Move to next word
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setCurrentInput("");
      } else {
        handleCompletion();
      }
    }
  };
  
  const handleCompletion = () => {
    if (!isComplete) {
      setIsComplete(true);
      setEndTime(Date.now());
      
      if (isSoundEnabled) {
        playCompleteSound();
      }
      
      // Calculate final stats
      const stats = calculateStats(
        correctWords,
        incorrectWords,
        useAppStore.getState().startTime,
        Date.now()
      );
      
      setStats(stats);
      
      // Navigate to finish screen after a short delay
      setTimeout(() => {
        router.push("/finish");
      }, 1000);
    }
  };
  
  // Word display variants for animation
  const wordVariants = {
    inactive: { opacity: 0.6 },
    active: { opacity: 1, scale: 1.05 },
    correct: { opacity: 0.8, color: "#4CAF50" },
    incorrect: { opacity: 0.8, color: "#FF5252" },
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      {mode === 'timed' && timeLimit > 0 && (
        <div className="mb-6 text-xl font-medium">
          Time: {timeRemaining}s
        </div>
      )}
      
      <div className="w-full mb-8 p-6 bg-card rounded-lg shadow-sm">
        <div className="font-serif text-xl leading-relaxed tracking-wide flex flex-wrap">
          {words.map((word, index) => {
            const isTyped = index < typedWords.length;
            const isCurrent = index === currentWordIndex;
            const typedWord = typedWords[index];
            
            return (
              <motion.span
                key={index}
                className={`mr-2 mb-2 px-0.5 rounded ${
                  isCurrent ? "bg-accent/20" : ""
                }`}
                initial="inactive"
                animate={
                  isTyped
                    ? typedWord.correct
                      ? "correct"
                      : "incorrect"
                    : isCurrent
                    ? "active"
                    : "inactive"
                }
                variants={wordVariants}
                transition={{ duration: 0.2 }}
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full max-w-xl px-4 py-3 bg-secondary rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        placeholder="Type here..."
        disabled={isComplete}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      />
      
      <p className="mt-6 italic text-muted-foreground text-center">
        Press <span className="font-medium">space</span> after each word to continue
      </p>
    </div>
  );
} 