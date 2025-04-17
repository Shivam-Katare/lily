import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { Stats } from "./store";

/**
 * Calculates Words Per Minute (WPM)
 */
export const calculateWPM = (
  words: number,
  startTime: number | null,
  endTime: number | null
): number => {
  if (!startTime || !endTime) return 0;
  
  const timeInMinutes = (endTime - startTime) / 1000 / 60;
  if (timeInMinutes === 0) return 0;
  
  return Math.round(words / timeInMinutes);
};

/**
 * Calculates accuracy percentage
 */
export const calculateAccuracy = (
  correct: number,
  incorrect: number
): number => {
  const total = correct + incorrect;
  if (total === 0) return 100;
  
  return Math.round((correct / total) * 100);
};

/**
 * Formats time in seconds to MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

/**
 * Calculates final stats
 */
export const calculateStats = (
  correctWords: number,
  incorrectWords: number,
  startTime: number | null,
  endTime: number | null
): Stats => {
  if (!startTime || !endTime) {
    return { wpm: 0, accuracy: 0, time: 0 };
  }
  
  const timeInSeconds = Math.round((endTime - startTime) / 1000);
  const wpm = calculateWPM(correctWords, startTime, endTime);
  const accuracy = calculateAccuracy(correctWords, incorrectWords);
  
  return {
    wpm,
    accuracy,
    time: timeInSeconds,
  };
};

/**
 * Splits text into an array of words
 */
export const splitIntoWords = (text: string): string[] => {
  return text.split(/\s+/);
};

/**
 * Returns a random encouraging message
 */
export const getEncouragingMessage = (): string => {
  const messages = [
    "Beautiful typing flow...",
    "Every keystroke is a moment of presence...",
    "Let the words flow like a gentle stream...",
    "Breathe and type with intention...",
    "Each word is a step on your peaceful journey...",
    "Type with your heart, not just your fingers...",
    "Enjoy the rhythmic dance of your fingers...",
    "You're creating a moment of calm in your day...",
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

/**
 * Returns a completion quote
 */
export const getCompletionQuote = (): string => {
  const quotes = [
    "Each word typed is a breath released.",
    "In stillness comes the clarity we seek.",
    "The journey of a thousand words begins with a single keystroke.",
    "Typing becomes meditation when we bring our full presence to it.",
    "In the rhythm of typing, we find our own inner cadence.",
    "Words are the vessels that carry our thoughts across the sea of silence.",
    "The space between keystrokes holds as much meaning as the words themselves.",
    "When we type with intention, even the simplest words become profound.",
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};