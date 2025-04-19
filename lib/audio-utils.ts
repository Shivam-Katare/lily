/**
 * Perform crossfade between two audio elements
 */
export const crossfadeAudio = (
  currentAudio: HTMLAudioElement,
  newAudio: HTMLAudioElement,
  targetVolume: number = 0.5,
  fadeDuration: number = 1000
): Promise<HTMLAudioElement> => {
  return new Promise((resolve) => {
    const fadeStep = 0.05;
    const stepInterval = fadeDuration / (targetVolume / fadeStep);
    
    // Start with new audio at zero volume
    newAudio.volume = 0;
    
    // Prepare new track
    const playPromise = newAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play was prevented
      });
    }
    
    // Fade out current track
    const fadeOutInterval = setInterval(() => {
      if (currentAudio.volume > fadeStep) {
        currentAudio.volume -= fadeStep;
      } else {
        currentAudio.pause();
        clearInterval(fadeOutInterval);
      }
    }, stepInterval);
    
    // Fade in new track
    const fadeInInterval = setInterval(() => {
      if (newAudio.volume < targetVolume - fadeStep) {
        newAudio.volume += fadeStep;
      } else {
        newAudio.volume = targetVolume;
        clearInterval(fadeInInterval);
        resolve(newAudio);
      }
    }, stepInterval);
  });
};

/**
 * Get a random track from the available tracks
 */
export const getRandomTrack = <T>(tracks: T[], excludeCurrent?: T): T => {
  if (tracks.length === 0) return tracks[0];
  if (tracks.length === 1) return tracks[0];
  
  let availableTracks = excludeCurrent
    ? tracks.filter(track => track !== excludeCurrent)
    : tracks;
    
  const randomIndex = Math.floor(Math.random() * availableTracks.length);
  return availableTracks[randomIndex];
}; 