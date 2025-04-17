"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { formatTime } from "@/lib/utils";

export function StatsDisplay() {
  const { stats } = useAppStore();
  
  return (
    <motion.div 
      className="flex flex-col items-center gap-6 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="grid grid-cols-3 gap-4 w-full">
        <StatsCard 
          title="WPM" 
          value={stats.wpm.toString()} 
          delay={0.1}
        />
        <StatsCard 
          title="Accuracy" 
          value={`${stats.accuracy}%`} 
          delay={0.2}
        />
        <StatsCard 
          title="Time" 
          value={formatTime(stats.time)} 
          delay={0.3}
        />
      </div>
    </motion.div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  delay: number;
}

function StatsCard({ title, value, delay }: StatsCardProps) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-4 bg-card rounded-lg shadow-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="text-sm text-muted-foreground font-medium mb-1">
        {title}
      </div>
      <div className="text-2xl font-serif">
        {value}
      </div>
    </motion.div>
  );
} 