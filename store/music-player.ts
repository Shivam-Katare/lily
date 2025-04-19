import { create } from 'zustand';

export type MusicMood = 'forestLullaby' | 'summerRain' | 'winterCalm' | 'windyForest' | '90sSummerChill' | 'random';

interface MusicPlayerState {
  // Current state
  isPlaying: boolean;
  currentTrack: MusicMood;
  volume: number;
  isPlayerOpen: boolean;
  
  // Actions
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlayPause: () => void;
  setCurrentTrack: (track: MusicMood) => void;
  setVolume: (volume: number) => void;
  togglePlayerOpen: () => void;
}

export const useMusicPlayerStore = create<MusicPlayerState>()((set) => ({
  // Initial state
  isPlaying: false,
  currentTrack: 'forestLullaby',
  volume: 0.5,
  isPlayerOpen: false,
  
  // Actions
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setVolume: (volume) => set({ volume }),
  togglePlayerOpen: () => set((state) => ({ isPlayerOpen: !state.isPlayerOpen })),
})); 