export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export type LearningStyle = 'visual' | 'rhythmic' | 'structural' | 'storyteller' | null;

export interface AssessmentQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    style: LearningStyle;
    description: string;
  }[];
}

export interface StorySentence {
  original: string;
  translation: string;
  pinyinOrPhonetic?: string;
  highlightWords?: { word: string; mean: string }[];
}

export interface Story {
  id: string;
  title: string;
  language: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sentences: StorySentence[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface PracticePhrase {
  id: string;
  phrase: string;
  phonetic: string;
  translation: string;
  audioDuration: number; // in seconds
  idealPitchPattern: number[]; // relative pitch array e.g. [1, 2, 1.5, 3]
}
