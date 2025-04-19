"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAppStore } from "@/store/store";
import { useMusicPlayerStore } from "@/store/music-player";

export function SoundToggle() {
  const { isSoundEnabled, toggleSound } = useAppStore();
  const { togglePlayPause } = useMusicPlayerStore();

  const handleToggle = () => {
    toggleSound();
    togglePlayPause();
  };

  return (
    <button
      className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      onClick={handleToggle}
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