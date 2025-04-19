"use client";

import { useAppStore } from "@/store/store";
import { Clock, Feather } from "lucide-react";

export function ModeToggle() {
  const { mode, setMode, resetSession } = useAppStore();

  const handleModeChange = (newMode: 'free' | 'timed') => {
    setMode(newMode);
    resetSession();
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="text-sm font-medium text-muted-foreground mb-1">Mode</div>
      <div className="flex space-x-2">
        <button
          onClick={() => handleModeChange('free')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
            mode === 'free'
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
          aria-label="Free mode"
        >
          <Feather className="h-4 w-4" />
          <span className="text-sm">Free Flow</span>
        </button>
        
        <button
          onClick={() => handleModeChange('timed')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
            mode === 'timed'
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
          aria-label="Timed mode"
        >
          <Clock className="h-4 w-4" />
          <span className="text-sm">Timed</span>
        </button>
      </div>
    </div>
  );
} 