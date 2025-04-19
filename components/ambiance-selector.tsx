"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/store";
import { initializeAmbiance, playAmbiance, stopAmbiance } from "@/lib/sound";

export function AmbianceSelector() {
  const { soundTheme, setSoundTheme, isSoundEnabled } = useAppStore();

  useEffect(() => {
    // Initialize sounds on component mount
    initializeAmbiance();

    // Cleanup on unmount
    return () => {
      stopAmbiance(0);
    };
  }, []);

  useEffect(() => {
    if (isSoundEnabled) {
      playAmbiance(soundTheme);
    } else {
      stopAmbiance();
    }
  }, [soundTheme, isSoundEnabled]);

  const handleThemeChange = (theme: string) => {
    setSoundTheme(theme as any);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="text-sm font-medium text-muted-foreground mb-1">Ambiance</div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleThemeChange("none")}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
            soundTheme === "none"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          None
        </button>
        <button
          onClick={() => handleThemeChange("forest")}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
            soundTheme === "forest"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Forest
        </button>
        <button
          onClick={() => handleThemeChange("rain")}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
            soundTheme === "rain"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Rain
        </button>
        <button
          onClick={() => handleThemeChange("fireplace")}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
            soundTheme === "fireplace"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Fireplace
        </button>
      </div>
    </div>
  );
} 