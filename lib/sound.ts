"use client";

import { Howl } from "howler";
import { SoundTheme } from "./store";

// Sound file locations
const SOUNDS = {
  keypress: "/sounds/keypress.mp3",
  error: "/sounds/error.mp3",
  complete: "/sounds/complete.mp3",
  forest: "/sounds/forest.mp3",
  rain: "/sounds/rain.mp3",
  fireplace: "/sounds/fireplace.mp3",
};

// Global howls for background ambiance
let forestSound: Howl | null = null;
let rainSound: Howl | null = null;
let fireplaceSound: Howl | null = null;
let currentAmbiance: Howl | null = null;

// Sound effects
export const playKeypressSound = (volume = 0.3) => {
  try {
    const sound = new Howl({
      src: [SOUNDS.keypress],
      volume,
    });
    sound.play();
  } catch (error) {
    console.error("Error playing keypress sound:", error);
  }
};

export const playErrorSound = (volume = 0.3) => {
  try {
    const sound = new Howl({
      src: [SOUNDS.error],
      volume,
    });
    sound.play();
  } catch (error) {
    console.error("Error playing error sound:", error);
  }
};

export const playCompleteSound = (volume = 0.5) => {
  try {
    const sound = new Howl({
      src: [SOUNDS.complete],
      volume,
    });
    sound.play();
  } catch (error) {
    console.error("Error playing complete sound:", error);
  }
};

// Ambiance
export const initializeAmbiance = () => {
  try {
    forestSound = new Howl({
      src: [SOUNDS.forest],
      loop: true,
      volume: 0.4,
    });

    rainSound = new Howl({
      src: [SOUNDS.rain],
      loop: true,
      volume: 0.4,
    });

    fireplaceSound = new Howl({
      src: [SOUNDS.fireplace],
      loop: true,
      volume: 0.4,
    });
  } catch (error) {
    console.error("Error initializing ambiance sounds:", error);
  }
};

export const playAmbiance = (theme: SoundTheme, fadeTime = 1000) => {
  if (theme === "none") {
    stopAmbiance(fadeTime);
    return;
  }

  try {
    // Stop current ambiance with fade
    if (currentAmbiance) {
      currentAmbiance.fade(currentAmbiance.volume(), 0, fadeTime);
      setTimeout(() => {
        currentAmbiance?.stop();
      }, fadeTime);
    }

    // Set and play new ambiance
    switch (theme) {
      case "forest":
        currentAmbiance = forestSound;
        break;
      case "rain":
        currentAmbiance = rainSound;
        break;
      case "fireplace":
        currentAmbiance = fireplaceSound;
        break;
      default:
        return;
    }

    if (currentAmbiance) {
      currentAmbiance.volume(0);
      currentAmbiance.play();
      currentAmbiance.fade(0, 0.4, fadeTime);
    }
  } catch (error) {
    console.error("Error playing ambiance:", error);
  }
};

export const stopAmbiance = (fadeTime = 1000) => {
  try {
    if (currentAmbiance) {
      currentAmbiance.fade(currentAmbiance.volume(), 0, fadeTime);
      setTimeout(() => {
        currentAmbiance?.stop();
        currentAmbiance = null;
      }, fadeTime);
    }
  } catch (error) {
    console.error("Error stopping ambiance:", error);
  }
};

export const cleanupSounds = () => {
  try {
    stopAmbiance(0);
    
    if (forestSound) forestSound.unload();
    if (rainSound) rainSound.unload();
    if (fireplaceSound) fireplaceSound.unload();
    
    forestSound = null;
    rainSound = null;
    fireplaceSound = null;
    currentAmbiance = null;
  } catch (error) {
    console.error("Error cleaning up sounds:", error);
  }
}; 