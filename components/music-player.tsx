"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause, Play, Volume2, VolumeX, Volume1 } from "lucide-react";
import { useMusicPlayerStore, MusicMood } from "@/store/music-player";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { crossfadeAudio, getRandomTrack } from "@/lib/audio-utils";
import { useSoundIntegration } from "@/lib/hooks/use-sound-integration";
import { Slider } from "@/components/ui/slider";

const musicTracks: Record<MusicMood, string> = {
  forestLullaby: "/songs/forestLullaby.mp3",
  summerRain: "/songs/forestLullaby.mp3", // Using same file for now
  winterCalm: "/songs/forestLullaby.mp3", // Using same file for now
  windyForest: "/songs/forestLullaby.mp3", // Using same file for now
  "90sSummerChill": "/songs/forestLullaby.mp3", // Using same file for now
  random: "/songs/forestLullaby.mp3", // Using same file for now
};

export function MusicPlayer() {
  const {
    isPlaying,
    currentTrack,
    volume,
    isPlayerOpen,
    togglePlayPause,
    setCurrentTrack,
    setVolume,
    togglePlayerOpen,
    setIsPlaying,
  } = useMusicPlayerStore();

  // Integrate with sound toggle
  const { isSoundEnabled } = useSoundIntegration();

  // Ref for audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const previousSoundEnabledRef = useRef(isSoundEnabled);

  // Auto-play on first load
  useEffect(() => {
    const audio = new Audio(musicTracks[currentTrack]);
    audio.volume = volume;
    audio.loop = false; // We'll handle track ending to play next

    // Handle track ending
    audio.addEventListener('ended', handleTrackEnded);

    // Track current time
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audioRef.current = audio;
    setIsInitialized(true);

    // Auto-play if sound is enabled
    if (isSoundEnabled) {
      setIsPlaying(true);
    }

    return () => {
      audio.removeEventListener('ended', handleTrackEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Handle track ended
  const handleTrackEnded = () => {
    // Play next track 
    if (currentTrack === 'random') {
      // Get another random track
      const nextTrack = getRandomTrack(
        Object.keys(musicTracks).filter(key => key !== 'random') as MusicMood[],
        currentTrack
      );
      setCurrentTrack(nextTrack);
    } else {
      // Get next track in the list
      const trackList = moodOptions.map(option => option.value);
      const currentIndex = trackList.indexOf(currentTrack);
      const nextIndex = (currentIndex + 1) % trackList.length;
      setCurrentTrack(trackList[nextIndex]);
    }
  };

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !isInitialized) return;

    if (isPlaying && isSoundEnabled) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isSoundEnabled, isInitialized]);

  // Handle sound toggle change
  useEffect(() => {
    if (!audioRef.current || !isInitialized) return;

    // If sound was disabled and now enabled, resume playback at the same position
    if (!previousSoundEnabledRef.current && isSoundEnabled && isPlaying) {
      audioRef.current.currentTime = currentTime;
      audioRef.current.play().catch(error => {
        console.error("Error resuming audio:", error);
      });
    }

    previousSoundEnabledRef.current = isSoundEnabled;
  }, [isSoundEnabled, isInitialized, isPlaying, currentTime]);

  // Handle track change with crossfade
  useEffect(() => {
    if (!audioRef.current || !isInitialized) return;

    // For 'random' mode, pick a random track
    const effectiveTrack = currentTrack === 'random'
      ? getRandomTrack(
        Object.keys(musicTracks).filter(key => key !== 'random') as MusicMood[],
        currentTrack
      )
      : currentTrack;

    const currentAudio = audioRef.current;
    const newAudio = new Audio(musicTracks[effectiveTrack]);
    newAudio.loop = false; // We'll handle track ending for auto-next

    // Handle track ending for the new audio
    newAudio.addEventListener('ended', handleTrackEnded);

    // Track current time
    newAudio.addEventListener('timeupdate', () => {
      setCurrentTime(newAudio.currentTime);
    });

    if (isPlaying && isSoundEnabled) {
      crossfadeAudio(currentAudio, newAudio, volume, 1000)
        .then(audio => {
          audioRef.current = audio;
        });
    } else {
      currentAudio.pause();
      newAudio.volume = volume;
      audioRef.current = newAudio;
    }

    return () => {
      if (currentAudio !== newAudio) {
        currentAudio.removeEventListener('ended', handleTrackEnded);
        currentAudio.pause();
      }
    };
  }, [currentTrack, isInitialized, isSoundEnabled]);

  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  // Toggle mute
  const toggleMute = () => {
    if (volume > 0) {
      // Store the current volume to restore later
      audioRef.current?.dataset?.previousVolume && (audioRef.current.dataset.previousVolume = volume.toString());
      setVolume(0);
    } else {
      // Restore previous volume or set to default 0.5
      const previousVolume = audioRef.current?.dataset?.previousVolume
        ? parseFloat(audioRef.current.dataset.previousVolume)
        : 0.5;
      setVolume(previousVolume);
    }
  };

  // Determine which volume icon to show
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  const moodOptions: { value: MusicMood; label: string }[] = [
    { value: 'forestLullaby', label: 'Forest Lullaby' },
    { value: 'summerRain', label: 'Summer Rain' },
    { value: 'winterCalm', label: 'Winter Calm' },
    { value: 'windyForest', label: 'Windy Forest' },
    { value: '90sSummerChill', label: '90\'s Summer Chill' },
    { value: 'random', label: 'Random' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center">
        {isPlayerOpen ? (
          <div className="bg-background border border-border rounded-md p-3 shadow-md animate-in slide-in-from-right-5 duration-300">
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlayPause}
                className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
                disabled={!isSoundEnabled}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>

              <div className="min-w-32">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm font-medium truncate hover:underline cursor-pointer">
                    {moodOptions.find(option => option.value === currentTrack)?.label || 'Select Mood'}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="start" className="shadow-md mb-6" style={{
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.6)',
                  }}>
                    {moodOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        className={cn(
                          "cursor-pointer hover:bg-accent hover:text-accent-foreground",
                          currentTrack === option.value && "font-medium"
                        )}
                        onClick={() => setCurrentTrack(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  disabled={!isSoundEnabled}
                  className="text-primary hover:text-primary/80"
                >
                  <VolumeIcon className="h-4 w-4" />
                </button>
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.01}
                  className="w-24"
                  onValueChange={(newValue) => setVolume(newValue[0])}
                  disabled={!isSoundEnabled}
                />
              </div>
            </div>
          </div>
        ) : null}

        <button
          onClick={togglePlayerOpen}
          className={cn(
            "flex items-center justify-center h-10 w-10 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-colors cursor-pointer",
            isPlayerOpen && "rounded-l-none rounded-r-full"
          )}
          aria-label="Toggle music player"
        >
          <Music className={cn(
            "h-5 w-5",
            isPlaying && isSoundEnabled && "animate-spin duration-20000"
          )} />
        </button>
      </div>
    </div>
  );
} 