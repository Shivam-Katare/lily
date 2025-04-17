export interface Paragraph {
  id: number;
  text: string;
  source?: string;
}

export const paragraphs: Paragraph[] = [
  {
    id: 1,
    text: "The leaves whispered secrets in the autumn breeze, their golden hues painting the landscape with warm tranquility. Each rustling sound was nature's gentle reminder to slow down and breathe with intention.",
    source: "Mindful Moments"
  },
  {
    id: 2,
    text: "Water follows the path of least resistance, flowing around obstacles rather than fighting against them. There is wisdom in this natural tendency—to adapt, to continue forward, to find peace in the journey rather than struggle.",
    source: "Nature's Lessons"
  },
  {
    id: 3,
    text: "Silence has its own melody, a composition of subtle sounds we rarely notice in our hurried lives. The distant bird's call, the soft hum of existence, the rhythm of your own breath—these are the notes of presence.",
    source: "Present Harmony"
  },
  {
    id: 4,
    text: "The mountain stands unwavering through storms and sunshine alike. It does not judge the weather as good or bad but simply exists in its steadfast nature. We too can learn to observe life's changing conditions with such equanimity.",
    source: "Mountain Wisdom"
  },
  {
    id: 5,
    text: "A single candle flame dances delicately yet remains centered. Though it moves with every subtle air current, its essence—light and warmth—continues uninterrupted. Our awareness can hold this same quality amidst life's movements.",
    source: "Illuminated Path"
  },
  {
    id: 6,
    text: "The ocean teaches us about our own depths. On the surface, waves may crash dramatically, while deep below, a vast stillness remains undisturbed. Both aspects exist simultaneously within us—motion and stillness, expression and peace.",
    source: "Ocean Reflections"
  },
  {
    id: 7,
    text: "Stars have traveled through darkness for billions of years just to grace our night sky. Their light persists long after their physical form has changed. What we create with our lives continues to ripple outward, touching the world in ways we may never witness.",
    source: "Cosmic Perspective"
  },
  {
    id: 8,
    text: "Each morning arrives as a blank canvas, unmarked by yesterday's strokes. The dawn offers this gift daily—a fresh beginning, a moment to choose again how we will approach the artistry of living this one precious day.",
    source: "Morning Reflections"
  }
];

export const getRandomParagraph = (): Paragraph => {
  // Use a fixed index during server-side rendering to avoid hydration mismatch
  if (typeof window === 'undefined') {
    return paragraphs[0];
  }
  
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[randomIndex];
}; 