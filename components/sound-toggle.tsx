"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAppStore } from "@/lib/store";

export function SoundToggle() {
  const { isSoundEnabled, toggleSound } = useAppStore();

  return (
    <button
      className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={toggleSound}
      aria-label={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
    >
      {isSoundEnabled ? (
        <Volume2 className="h-5 w-5 text-primary transition-all" />
      ) : (
        <VolumeX className="h-5 w-5 text-primary transition-all" />
      )}
    </button>
  );
} 