import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, HelpCircle, X, Sparkles, CheckCircle2, AlertCircle, Volume2, Globe, ArrowRight } from 'lucide-react';
import { Story } from '../types';

interface LessonReaderProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_STORIES: Story[] = [
  {
    id: "story_es",
    title: "Un Paseo Bajo las Estrellas",
    language: "🇪🇸 Spanish",
    difficulty: "Beginner",
    sentences: [
      {
        original: "Mateo caminaba lentamente por la vieja calle de adoquines en Sevilla.",
        translation: "Mateo was walking slowly along the old cobblestone street in Seville.",
        pinyinOrPhonetic: "mah-TEH-oh kah-mee-NAH-bah len-tah-MEN-teh por lah bee-EH-hah KAH-yeh deh ah-doh-KEE-nes en seh-BEE-yah",
        highlightWords: [
          { word: "caminaba", mean: "was walking (imperfect tense)" },
          { word: "adoquines", mean: "cobblestones" }
        ]
      },
      {
        original: "El aire de la noche olía a jazmín dulce y café recién molido.",
        translation: "The night air smelled of sweet jasmine and freshly ground coffee.",
        pinyinOrPhonetic: "el EYE-reh deh lah NOH-cheh oh-LEE-ah ah hahs-MEEN DOOL-seh ee kah-FEH rreh-SYEN moh-LEE-doh",
        highlightWords: [
          { word: "olía a", mean: "smelled like / of" },
          { word: "recién molido", mean: "freshly ground" }
        ]
      },
      {
        original: "Se detuvo frente a un pequeño letrero de madera que decía 'El Rincón de la Música'.",
        translation: "He stopped in front of a small wooden sign that read 'The Music Corner'.",
        pinyinOrPhonetic: "seh deh-TOO-boh FREN-teh ah oon peh-KEH-nyoh leh-TREH-roh deh mah-DEH-rah keh deh-SEE-ah 'El reen-COHN deh lah MOO-see-kah'",
        highlightWords: [
          { word: "se detuvo", mean: "stopped himself (preterite)" },
          { word: "letrero", mean: "sign / signboard" }
        ]
      }
    ],
    quiz: [
      {
        question: "What sensory detail was specifically present in Seville's night air?",
        options: [
          "Freshly baked churros and hot chocolate",
          "Sweet jasmine and freshly ground coffee",
          "Salty ocean breeze and lavender flowers",
          "Dry citrus orange blossoms and red wine"
        ],
        correctIndex: 1,
        explanation: "The story states 'olía a jazmín dulce y café recién molido' (smelled of sweet jasmine and freshly ground coffee). Jasmine (jazmín) is highly iconic of Sevillian courtyards!"
      }
    ]
  },
  {
    id: "story_fr",
    title: "Le Petit Bistro de la Rue d'Or",
    language: "🇫🇷 French",
    difficulty: "Intermediate",
    sentences: [
      {
        original: "Élise s'installa sur la terrasse d'un café caché, à l'écart de l'agitation parisienne.",
        translation: "Élise settled on the terrace of a hidden café, away from the Parisian bustle.",
        pinyinOrPhonetic: "ay-leez san-stah-lah syoor lah teh-rahs dun kah-fay kah-shay, ah lay-kar duh lah-zhee-tah-syohn pah-ree-zyen",
        highlightWords: [
          { word: "s'installa", mean: "settled down (passé simple)" },
          { word: "l'agitation", mean: "bustle / excitement" }
        ]
      },
      {
        original: "Le vieux serveur lui apporta un expresso serré accompagné d'un croissant tout chaud.",
        translation: "The old waiter brought her a strong espresso accompanied by a warm croissant.",
        pinyinOrPhonetic: "luh vyuh sair-vuhr lwee ah-por-tah uhn ex-preh-so seh-ray ah-cohn-pahn-yay dun crwah-sahn too shoh",
        highlightWords: [
          { word: "serré", mean: "tight / strong (referring to espresso)" },
          { word: "accompagné", mean: "accompanied" }
        ]
      }
    ],
    quiz: [
      {
        question: "What kind of espresso drink was Élise served?",
        options: [
          "A decaf latte with foam",
          "A sweet iced coffee",
          "A strong, short espresso (expresso serré)",
          "An espresso macchiato with cocoa"
        ],
        correctIndex: 2,
        explanation: "'Un expresso serré' is a short, concentrated shot of espresso in French coffee culture, packed with intense flavor!"
      }
    ]
  }
];

export default function LessonReader({ isOpen, onClose }: LessonReaderProps) {
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState<number | null>(null);
  const [selectedWord, setSelectedWord] = useState<{ word: string; mean: string } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  
  const currentStory = SAMPLE_STORIES[activeStoryIdx];

  const handleSpeechSentence = (text: string, langId: string) => {
    const synth = window.speechSynthesis;
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langId === 'story_es' ? 'es-ES' : 'fr-FR';
      synth.speak(utterance);
    }
  };

  const handleSelectAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
      />

      {/* Lesson Window */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-outline-variant z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-brand-lavender">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-brand-magenta/10 rounded-lg text-brand-magenta">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <span className="font-bold text-lg text-brand-navy tracking-tight">Interactive Adaptive Stories</span>
              <span className="text-xs text-brand-magenta font-semibold block -mt-1">Active Cognitive Lesson</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-black/5 rounded-full transition-colors text-brand-navy/70 hover:text-brand-navy"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Story Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Story Selector tabs */}
          <div className="flex gap-2 border-b border-outline-variant pb-2">
            {SAMPLE_STORIES.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => {
                  setActiveStoryIdx(idx);
                  setSelectedSentenceIdx(null);
                  setSelectedWord(null);
                  handleResetQuiz();
                }}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                  activeStoryIdx === idx
                    ? 'bg-brand-magenta/10 text-brand-magenta'
                    : 'text-brand-navy/60 hover:text-brand-navy hover:bg-brand-lavender'
                }`}
              >
                {story.language} - {story.difficulty}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-brand-navy tracking-tight">
                {currentStory.title}
              </h3>
              <span className="px-2.5 py-1 bg-brand-lavender rounded-full text-xs font-bold text-brand-magenta">
                Interactive Text Popovers
              </span>
            </div>

            <p className="text-xs text-brand-navy/50 font-medium">
              💡 Tap any sentence to translate it, get pronunciation phonetic codes, or highlight vocabulary words!
            </p>

            {/* Immersive interactive paragraph */}
            <div className="p-6 bg-brand-lavender/30 rounded-2xl border border-brand-lavender space-y-4 leading-relaxed">
              {currentStory.sentences.map((sentence, idx) => {
                const isSelected = selectedSentenceIdx === idx;
                return (
                  <div 
                    key={idx}
                    className={`p-3 rounded-xl transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-white shadow-md border-l-4 border-brand-magenta translate-x-1' 
                        : 'hover:bg-brand-lavender/60 border-l-4 border-transparent'
                    }`}
                    onClick={() => {
                      setSelectedSentenceIdx(isSelected ? null : idx);
                      setSelectedWord(null);
                    }}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-lg font-semibold text-brand-navy tracking-tight leading-relaxed">
                        {sentence.original}
                      </p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeechSentence(sentence.original, currentStory.id);
                        }}
                        className="p-1 text-brand-magenta/70 hover:text-brand-magenta hover:bg-brand-lavender rounded transition-all"
                        title="Listen Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Expandable Translation */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-sm text-brand-navy/80"
                        >
                          <div className="flex gap-2 items-center text-xs font-bold text-brand-magenta">
                            <Globe className="w-3.5 h-3.5" /> Translation
                          </div>
                          <p className="font-semibold italic text-brand-navy">"{sentence.translation}"</p>
                          
                          <div className="text-xs font-mono bg-brand-lavender/40 p-2 rounded border border-brand-lavender">
                            <span className="font-bold text-[10px] uppercase block tracking-wider text-brand-navy/50 mb-0.5">Phonetic Flow</span>
                            {sentence.pinyinOrPhonetic}
                          </div>

                          {/* Words Highlight Sparks */}
                          {sentence.highlightWords && (
                            <div className="pt-1 flex flex-wrap gap-2">
                              {sentence.highlightWords.map((wordObj, wIdx) => (
                                <button
                                  key={wIdx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedWord(wordObj);
                                  }}
                                  className="px-2 py-1 bg-brand-magenta/5 border border-brand-magenta/25 hover:bg-brand-magenta/10 rounded-lg text-xs font-semibold text-brand-magenta flex items-center gap-1"
                                >
                                  <Sparkles className="w-3 h-3" /> {wordObj.word}
                                </button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Word Meaning Detail Card */}
          <AnimatePresence>
            {selectedWord && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-brand-magenta text-white rounded-xl shadow-lg flex justify-between items-start gap-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-black text-brand-lilac flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Vocabulary Nugget
                  </span>
                  <h4 className="text-lg font-black tracking-tight font-mono">{selectedWord.word}</h4>
                  <p className="text-xs font-medium text-brand-lilac">Context Meaning: <span className="text-white font-bold underline decoration-brand-lilac underline-offset-4">"{selectedWord.mean}"</span></p>
                </div>
                <button 
                  onClick={() => setSelectedWord(null)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mini Comprehension Quiz */}
          <div className="p-6 rounded-2xl border border-outline-variant bg-slate-50 space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brand-magenta" />
              <h4 className="font-bold text-brand-navy text-sm uppercase tracking-wider">Cognitive Check</h4>
            </div>

            <div className="space-y-3">
              <p className="font-bold text-base text-brand-navy">
                {currentStory.quiz[0].question}
              </p>

              <div className="grid gap-2">
                {currentStory.quiz[0].options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === currentStory.quiz[0].correctIndex;
                  
                  let btnStyle = "border-outline-variant hover:bg-brand-lavender";
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-800";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-50 border-rose-400 text-rose-800";
                    } else {
                      btnStyle = "opacity-50 border-outline-variant cursor-not-allowed";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-3 rounded-xl border font-semibold text-sm transition-all flex justify-between items-center ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {isAnswered && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-rose-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation box */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 rounded-xl bg-white border border-outline-variant text-xs space-y-1.5 leading-relaxed text-brand-navy/80"
                >
                  <p className="font-bold text-brand-magenta flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Cultural &amp; Grammatical Insight
                  </p>
                  <p>{currentStory.quiz[0].explanation}</p>
                  <button
                    onClick={handleResetQuiz}
                    className="mt-2 text-brand-magenta hover:underline font-bold flex items-center gap-1"
                  >
                    Retry Quiz <ArrowRight className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-outline-variant bg-brand-lavender/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl text-sm font-bold shadow-md transition-colors"
          >
            Finish Practice Lesson
          </button>
        </div>
      </motion.div>
    </div>
  );
}
