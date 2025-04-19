import { useEffect } from 'react';
import { useAppStore } from '@/store/store';
import { useMusicPlayerStore } from '@/store/music-player';

export const useSoundIntegration = () => {
  const { isSoundEnabled } = useAppStore();
  const { isPlaying, setIsPlaying } = useMusicPlayerStore();
  
  // Sync sound toggle with music player
  useEffect(() => {
    // If sound is disabled, pause music
    if (!isSoundEnabled && isPlaying) {
      setIsPlaying(false);
    }
  }, [isSoundEnabled, isPlaying, setIsPlaying]);
  
  return {
    isSoundEnabled,
  };
}; 