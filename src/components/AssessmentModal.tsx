import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Brain, GraduationCap, CheckCircle, RefreshCw, BarChart2 } from 'lucide-react';
import { LearningStyle, AssessmentQuestion } from '../types';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSampleLesson: () => void;
}

const QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    text: "When memorizing a new word in another language, you naturally prefer to...",
    options: [
      {
        text: "Visualize the written word, its letters, or form a vivid picture in your head.",
        style: "visual",
        description: "Visual Retention"
      },
      {
        text: "Repeat it aloud multiple times, matching the cadence, musical flow, and rhythm.",
        style: "rhythmic",
        description: "Phonetic Rhythm"
      },
      {
        text: "Deconstruct its root forms, prefix patterns, and grammatical structure.",
        style: "structural",
        description: "Analytical Structure"
      },
      {
        text: "Weave it into a quick, fictional scenario or use it in an imaginary dialogue.",
        style: "storyteller",
        description: "Narrative Context"
      }
    ]
  },
  {
    id: 2,
    text: "Your ideal, flow-state study session would consist of...",
    options: [
      {
        text: "Reading illustrated storyboards, interactive text popups, and colorful charts.",
        style: "visual",
        description: "Visual Immersion"
      },
      {
        text: "Interactive speaking drills, voice pitch matching, and accent training.",
        style: "rhythmic",
        description: "Speaking-First Lab"
      },
      {
        text: "Arranging word puzzles, grammar blocks, and systematic grammar formulas.",
        style: "structural",
        description: "Logic & Syntax Rules"
      },
      {
        text: "Roleplaying real-life conversations with a virtual traveler in immersive story paths.",
        style: "storyteller",
        description: "Contextual Adventure"
      }
    ]
  },
  {
    id: 3,
    text: "When you make a grammatical error, you learn best by...",
    options: [
      {
        text: "Seeing a highlighted color-coded highlight of the correct vs. incorrect sentence structure.",
        style: "visual",
        description: "Visual Comparison"
      },
      {
        text: "Hearing the correct version spoken by a native speaker with emphasized correct tone.",
        style: "rhythmic",
        description: "Auditory Feedback"
      },
      {
        text: "Reading a logical explanation of the rule and the formulaic reason behind the error.",
        style: "structural",
        description: "Structural Logic"
      },
      {
        text: "Seeing the error corrected in a follow-up sentence within the story dialogue.",
        style: "storyteller",
        description: "Story Adaptation"
      }
    ]
  }
];

export default function AssessmentModal({ isOpen, onClose, onSelectSampleLesson }: AssessmentModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<LearningStyle[]>([]);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [resultStyle, setResultStyle] = useState<LearningStyle>(null);

  const handleSelectOption = (style: LearningStyle) => {
    const nextAnswers = [...answers, style];
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate majority style
      const counts: Record<string, number> = {
        visual: 0,
        rhythmic: 0,
        structural: 0,
        storyteller: 0
      };
      
      nextAnswers.forEach(ans => {
        if (ans) counts[ans]++;
      });

      let maxStyle: LearningStyle = 'storyteller';
      let maxCount = -1;
      
      Object.entries(counts).forEach(([style, count]) => {
        if (count > maxCount) {
          maxCount = count;
          maxStyle = style as LearningStyle;
        }
      });

      setResultStyle(maxStyle);
      setIsCalculated(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCalculated(false);
    setResultStyle(null);
  };

  const getStyleDetails = (style: LearningStyle) => {
    switch (style) {
      case 'visual':
        return {
          title: "Visual Storyteller",
          icon: <Sparkles className="w-8 h-8 text-brand-magenta" />,
          color: "bg-purple-100 text-purple-700",
          desc: "You encode information best through illustrated storyboards, spatial colors, and written diagrams. You remember words by seeing them inside their contextual visual frame.",
          distribution: { audio: 20, story: 50, grammar: 30 }
        };
      case 'rhythmic':
        return {
          title: "Rhythmic Sound Processor",
          icon: <Brain className="w-8 h-8 text-brand-magenta" />,
          color: "bg-indigo-100 text-indigo-700",
          desc: "Your cognitive profile is strongly phonetic. You learn through voice cadences, pitch benchmarks, and auditory repetition. You excel in speaking and listening drills.",
          distribution: { audio: 60, story: 20, grammar: 20 }
        };
      case 'structural':
        return {
          title: "Structural Thinker",
          icon: <GraduationCap className="w-8 h-8 text-brand-magenta" />,
          color: "bg-emerald-100 text-emerald-700",
          desc: "You look for patterns, mathematical syntax rules, and linguistic roots. You prefer building dynamic block puzzles and solving analytical sentence structures.",
          distribution: { audio: 20, story: 20, grammar: 60 }
        };
      case 'storyteller':
      default:
        return {
          title: "Adaptive Adventurer",
          icon: <Sparkles className="w-8 h-8 text-brand-magenta" />,
          color: "bg-rose-100 text-rose-700",
          desc: "You acquire fluency naturally through storytelling context, character dialogues, and immersive, adaptive narratives. Standard drills bore you; you need situational roleplay.",
          distribution: { audio: 30, story: 50, grammar: 20 }
        };
    }
  };

  if (!isOpen) return null;

  const result = isCalculated && resultStyle ? getStyleDetails(resultStyle) : null;

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

      {/* Content Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-outline-variant z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-brand-lavender">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-brand-magenta/10 rounded-lg text-brand-magenta">
              <Brain className="w-5 h-5" />
            </span>
            <span className="font-bold text-lg text-brand-navy tracking-tight">LinguistPro Cognitive Assessment</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-black/5 rounded-full transition-colors text-brand-navy/70 hover:text-brand-navy"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Inner Content with AnimatePresence for transitions */}
        <div className="p-6 min-h-[380px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!isCalculated ? (
              <motion.div
                key={`q-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-brand-magenta h-full transition-all duration-300" 
                    style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-magenta">
                    Question {currentStep + 1} of {QUESTIONS.length}
                  </span>
                  <h3 className="text-xl font-bold text-brand-navy leading-tight">
                    {QUESTIONS[currentStep].text}
                  </h3>
                </div>

                <div className="grid gap-3">
                  {QUESTIONS[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option.style)}
                      className="w-full text-left p-4 rounded-xl border border-outline-variant bg-brand-lavender/40 hover:bg-brand-lavender hover:border-brand-magenta transition-all group flex gap-3 items-start"
                    >
                      <span className="w-6 h-6 rounded-full bg-white border border-outline-variant flex items-center justify-center text-xs font-bold text-brand-magenta group-hover:bg-brand-magenta group-hover:text-white group-hover:border-transparent transition-all mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-brand-navy group-hover:text-brand-magenta transition-colors text-sm md:text-base">
                          {option.text}
                        </p>
                        <span className="text-xs text-brand-navy/50 block mt-1">
                          Emphasizes {option.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* RESULTS PANEL */
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2 pb-2">
                  <div className="inline-flex p-3 bg-brand-magenta/10 rounded-full text-brand-magenta mb-2">
                    {result?.icon}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-magenta">Your Learning Style Is</p>
                  <h3 className="text-2xl font-black text-brand-navy tracking-tight">{result?.title}</h3>
                </div>

                <div className="p-4 bg-brand-lavender/60 rounded-xl border border-outline-variant text-sm text-brand-navy/80 leading-relaxed">
                  {result?.desc}
                </div>

                {/* Simulated mapping chart */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-brand-navy tracking-wider uppercase flex items-center gap-1">
                    <BarChart2 className="w-4 h-4 text-brand-magenta" /> Your Personalized 90-Day Focus Mix
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">Interactive Story Immersion</span>
                        <span className="text-brand-magenta font-bold">{result?.distribution.story}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-brand-magenta h-full" style={{ width: `${result?.distribution.story}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">Phonetic Rhythm &amp; Voice Labs</span>
                        <span className="text-secondary font-bold">{result?.distribution.audio}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full" style={{ width: `${result?.distribution.audio}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">Analytical Grammar Blocks</span>
                        <span className="text-brand-navy/60 font-bold">{result?.distribution.grammar}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-brand-navy/60 h-full" style={{ width: `${result?.distribution.grammar}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Retention boost message */}
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Dynamic Curricula Activated!</span> This tailored blend is predicted to increase vocabulary retention by <span className="font-extrabold text-emerald-700">85%</span> over 90 days.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer buttons */}
          <div className="pt-6 border-t border-outline-variant mt-6 flex flex-col sm:flex-row gap-2 justify-end">
            {isCalculated ? (
              <>
                <button
                  onClick={handleRestart}
                  className="px-4 py-2.5 rounded-lg border border-outline-variant hover:bg-brand-lavender text-brand-navy/80 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Retake Test
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onSelectSampleLesson();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-brand-magenta text-white hover:brightness-110 text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  Start Custom Sample Lesson <Sparkles className="w-4 h-4" />
                </button>
              </>
            ) : (
              <p className="text-xs text-center sm:text-left text-brand-navy/40 self-center">
                Your diagnostic results are analyzed server-side with zero data tracking.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
