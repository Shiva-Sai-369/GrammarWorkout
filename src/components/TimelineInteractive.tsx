import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, RefreshCw, Layers, Map, Calendar, Sparkles, Brain } from 'lucide-react';

interface TimelineInteractiveProps {
  onOpenAssessment: () => void;
}

interface StepDetails {
  title: string;
  desc: string;
  accent: string;
}

const STEPS: StepDetails[] = [
  {
    title: "Cognitive Assessment",
    desc: "A 5-minute interactive diagnostic to identify your primary learning modalities.",
    accent: "bg-brand-magenta"
  },
  {
    title: "Curriculum Mapping",
    desc: "Our AI generates a custom path that emphasizes your strengths while bridging gaps.",
    accent: "bg-brand-magenta"
  },
  {
    title: "Daily Microsessions",
    desc: "Consistency over intensity. 15 minutes of hyper-targeted practice every morning.",
    accent: "bg-brand-magenta"
  }
];

export default function TimelineInteractive({ onOpenAssessment }: TimelineInteractiveProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  
  // Flashcard state for Step 3 preview
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardIdx, setCardIdx] = useState<number>(0);
  const flashcards = [
    { foreign: "el susurro", english: "the whisper", hint: "Spanish noun, soft speaking" },
    { foreign: "l'espoir", english: "the hope", hint: "French noun, positive longing" },
    { foreign: "こもれび (Komorebi)", english: "sunlight filtering through trees", hint: "Japanese poetic compound noun" }
  ];

  // Sliders for Step 2 preview
  const [visualMix, setVisualMix] = useState<number>(40);
  const [soundMix, setSoundMix] = useState<number>(35);
  const [storyMix, setStoryMix] = useState<number>(25);

  const totalSliders = visualMix + soundMix + storyMix;
  const normalizedVisual = Math.round((visualMix / totalSliders) * 100);
  const normalizedSound = Math.round((soundMix / totalSliders) * 100);
  const normalizedStory = Math.round((storyMix / totalSliders) * 100);

  const predictedRetention = Math.round(75 + (normalizedStory * 0.15) + (normalizedSound * 0.12));

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
      {/* Left Column: Timeline Steps (Interactive) */}
      <div className="order-2 lg:order-1 relative">
        <h3 className="text-xs uppercase tracking-widest font-black text-brand-magenta mb-4">Interactive Path</h3>
        <div className="space-y-12 relative">
          {/* Progress Connecting Line */}
          <div className="absolute left-8 top-8 w-1 h-[calc(100%-4rem)] bg-outline-variant z-0" />
          
          {/* Active Highlight Line */}
          <div 
            className="absolute left-8 w-1 bg-brand-magenta z-0 transition-all duration-300"
            style={{ 
              top: '2rem', 
              height: activeStep === 0 ? '1px' : activeStep === 1 ? '50%' : 'calc(100% - 4rem)' 
            }} 
          />

          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className="w-full flex text-left gap-6 relative z-10 focus:outline-none group"
              >
                {/* Step Circle Indicator */}
                <div 
                  className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-black text-xl shadow-md transition-all duration-300 border-2 ${
                    isActive 
                      ? 'bg-brand-magenta text-white border-transparent scale-110' 
                      : 'bg-white text-brand-navy border-outline-variant group-hover:border-brand-magenta'
                  }`}
                >
                  {idx + 1}
                </div>

                {/* Step Text */}
                <div className="pt-2">
                  <h4 className={`text-xl font-bold tracking-tight transition-colors ${
                    isActive ? 'text-brand-magenta' : 'text-brand-navy group-hover:text-brand-magenta'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                    {step.desc}
                  </p>
                  {isActive && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-magenta mt-2 bg-brand-magenta/5 px-2.5 py-1 rounded-full">
                      Active Preview <Sparkles className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Step Live Preview Card */}
      <div className="order-1 lg:order-2">
        <div className="p-8 bg-white rounded-3xl border border-outline-variant shadow-xl relative min-h-[360px] flex flex-col justify-between">
          <div className="absolute top-4 right-4 text-xs font-bold uppercase tracking-wider text-brand-navy/30">
            Phase {activeStep + 1} Live Simulator
          </div>

          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="p-2 bg-purple-50 text-brand-magenta rounded-xl w-10 h-10 flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-extrabold text-brand-navy tracking-tight">Step 1: Cognitive Diagnostic</h4>
                  <p className="text-xs text-brand-navy/60 leading-relaxed">
                    Identify if you are a Visual Storyteller, Auditory/Rhythmic Processor, or Structural Formula analyzer to target the optimal language pathways.
                  </p>
                </div>

                {/* Question Preview Box */}
                <div className="p-4 bg-brand-lavender rounded-2xl border border-outline-variant space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-magenta">Sample Assessment Query</span>
                  <p className="text-sm font-bold text-brand-navy leading-snug">"When recalling words, do you picture them written or matching vocal beats?"</p>
                  <div className="flex gap-2">
                    <button onClick={onOpenAssessment} className="text-xs font-bold text-brand-magenta bg-white border border-brand-magenta/25 px-3 py-1.5 rounded-lg shadow-sm hover:bg-brand-magenta/5">
                      Sparks written visual spelling
                    </button>
                    <button onClick={onOpenAssessment} className="text-xs font-bold text-brand-magenta bg-white border border-brand-magenta/25 px-3 py-1.5 rounded-lg shadow-sm hover:bg-brand-magenta/5">
                      Rhythms with sound pitch
                    </button>
                  </div>
                </div>

                <button
                  onClick={onOpenAssessment}
                  className="w-full py-3 bg-brand-magenta text-white hover:brightness-110 font-black rounded-xl text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Launch Full Assessment <Sparkles className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="p-2 bg-purple-50 text-brand-magenta rounded-xl w-10 h-10 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-extrabold text-brand-navy tracking-tight">Step 2: AI Curriculum Tuning</h4>
                  <p className="text-xs text-brand-navy/60 leading-relaxed">
                    Use the sliders below to simulate how adjusters adapt story levels, speaking loops, and analytical grammar cards.
                  </p>
                </div>

                {/* Adjuster sliders */}
                <div className="space-y-3 bg-brand-lavender/50 p-4 rounded-2xl border border-outline-variant">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span>Interactive Narrative Mix</span>
                      <span className="text-brand-magenta">{normalizedStory}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={storyMix} 
                      onChange={(e) => setStoryMix(parseInt(e.target.value))}
                      className="w-full accent-brand-magenta h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span>Speaking &amp; Pitch Training</span>
                      <span className="text-brand-magenta">{normalizedSound}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={soundMix} 
                      onChange={(e) => setSoundMix(parseInt(e.target.value))}
                      className="w-full accent-brand-magenta h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Simulated feedback */}
                <div className="flex justify-between items-center p-3.5 bg-brand-navy text-white rounded-xl">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-brand-lilac font-semibold block">Calculated Retention</span>
                    <span className="text-lg font-black tracking-tight">{predictedRetention}% 90-Day Boost</span>
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold border border-white/10 text-brand-lilac">
                    Dynamic Path
                  </span>
                </div>
              </motion.div>
            )}

            {activeStep === 3 || activeStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="p-2 bg-purple-50 text-brand-magenta rounded-xl w-10 h-10 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-extrabold text-brand-navy tracking-tight">Step 3: Daily Micro-Flashcard</h4>
                  <p className="text-xs text-brand-navy/60">
                    consistency beats cramming! Tap the flashcard below to flip and practice native vocabulary items.
                  </p>
                </div>

                {/* Flip Card container */}
                <div 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="relative h-28 cursor-pointer group"
                >
                  <div className={`absolute inset-0 bg-brand-lavender rounded-2xl border border-brand-magenta/30 p-4 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-sm ${
                    isFlipped ? 'rotate-x-180 opacity-0 pointer-events-none' : 'rotate-x-0 opacity-100'
                  }`}>
                    <span className="text-xs uppercase font-bold tracking-wider text-brand-magenta/60 mb-1">Target Word</span>
                    <p className="text-xl font-black text-brand-navy tracking-tight group-hover:text-brand-magenta transition-colors">
                      {flashcards[cardIdx].foreign}
                    </p>
                    <span className="text-[10px] text-brand-navy/40 mt-1 block">💡 Tap to reveal meaning</span>
                  </div>

                  <div className={`absolute inset-0 bg-brand-navy rounded-2xl border border-white/10 p-4 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-md ${
                    isFlipped ? 'rotate-x-0 opacity-100' : 'rotate-x-180 opacity-0 pointer-events-none'
                  }`}>
                    <span className="text-xs uppercase font-bold tracking-wider text-brand-lilac/60 mb-1">Translation</span>
                    <p className="text-lg font-black text-white tracking-tight">
                      "{flashcards[cardIdx].english}"
                    </p>
                    <span className="text-[10px] text-brand-lilac/80 mt-1 block italic">
                      {flashcards[cardIdx].hint}
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-2 justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(false);
                      setCardIdx((cardIdx + 1) % flashcards.length);
                    }}
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-brand-navy text-center transition-all"
                  >
                    Next Flashcard
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(false);
                      setCardIdx(0);
                    }}
                    className="p-2.5 rounded-xl border border-outline-variant text-slate-400 hover:text-brand-navy transition-colors"
                    title="Restart Pack"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-brand-navy/50">
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-500" /> 85% Retention Track
            </span>
            <span className="font-mono">study_cycle_2023.csv</span>
          </div>
        </div>
      </div>
    </div>
  );
}
