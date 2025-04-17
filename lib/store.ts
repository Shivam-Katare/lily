import { create } from 'zustand'

export type TypingMode = 'free' | 'timed'
export type SoundTheme = 'forest' | 'rain' | 'fireplace' | 'none'

export interface Stats {
  wpm: number
  accuracy: number
  time: number
}

interface AppState {
  // Current state
  mode: TypingMode
  soundTheme: SoundTheme
  isSoundEnabled: boolean
  currentParagraphIndex: number
  
  // Current progress
  currentInput: string
  currentWordIndex: number
  correctWords: number
  incorrectWords: number
  startTime: number | null
  endTime: number | null
  
  // Stats
  stats: Stats

  // Actions
  setMode: (mode: TypingMode) => void
  setSoundTheme: (theme: SoundTheme) => void
  toggleSound: () => void
  setCurrentParagraphIndex: (index: number) => void
  setCurrentInput: (input: string) => void
  setCurrentWordIndex: (index: number) => void
  incrementCorrectWords: () => void
  incrementIncorrectWords: () => void
  setStartTime: (time: number) => void
  setEndTime: (time: number) => void
  setStats: (stats: Stats) => void
  resetSession: () => void
}

export const useAppStore = create<AppState>()((set) => ({
  // Initial state
  mode: 'free',
  soundTheme: 'none',
  isSoundEnabled: true,
  currentParagraphIndex: 0,
  currentInput: '',
  currentWordIndex: 0,
  correctWords: 0,
  incorrectWords: 0,
  startTime: null,
  endTime: null,
  stats: { wpm: 0, accuracy: 0, time: 0 },

  // Actions
  setMode: (mode) => set({ mode }),
  setSoundTheme: (theme) => set({ soundTheme: theme }),
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  setCurrentParagraphIndex: (index) => set({ currentParagraphIndex: index }),
  setCurrentInput: (input) => set({ currentInput: input }),
  setCurrentWordIndex: (index) => set({ currentWordIndex: index }),
  incrementCorrectWords: () => set((state) => ({ correctWords: state.correctWords + 1 })),
  incrementIncorrectWords: () => set((state) => ({ incorrectWords: state.incorrectWords + 1 })),
  setStartTime: (time) => set({ startTime: time }),
  setEndTime: (time) => set({ endTime: time }),
  setStats: (stats) => set({ stats }),
  resetSession: () => set({
    currentInput: '',
    currentWordIndex: 0,
    correctWords: 0,
    incorrectWords: 0,
    startTime: null,
    endTime: null,
    stats: { wpm: 0, accuracy: 0, time: 0 },
  }),
})) 