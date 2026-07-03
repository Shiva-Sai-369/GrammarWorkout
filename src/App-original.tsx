import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  School, 
  Compass, 
  BookOpen, 
  Mic, 
  ChevronDown, 
  Facebook, 
  Globe, 
  Award, 
  Sparkles, 
  GraduationCap, 
  Menu, 
  X,
  Languages
} from 'lucide-react';

import { FAQItem } from './types';
import AssessmentModal from './components/AssessmentModal';
import VoiceLab from './components/VoiceLab';
import LessonReader from './components/LessonReader';
import TimelineInteractive from './components/TimelineInteractive';

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq_1",
    question: "Is this suitable for total beginners?",
    answer: "Absolutely. We start with fundamental phonetic building blocks and scale complexity based on your specific learning speed and cognitive diagnostic profile."
  },
  {
    id: "faq_2",
    question: "How long does it take to reach conversational fluency?",
    answer: "While it varies by individual, the average user reaches high-frequency conversational fluency in just 90 days of consistent 15-minute daily sessions."
  },
  {
    id: "faq_3",
    question: "Can I use this for professional business language?",
    answer: "Yes, our 'Pro Pathway' offers specialized modules for corporate environments, legal terminology, and medical professional speech."
  }
];

export default function App() {
  // Modals state
  const [isAssessmentOpen, setIsAssessmentOpen] = useState<boolean>(false);
  const [isVoiceLabOpen, setIsVoiceLabOpen] = useState<boolean>(false);
  const [isLessonOpen, setIsLessonOpen] = useState<boolean>(false);
  
  // Mobile Nav state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // FAQ state
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  // Curriculum showcase state
  const [showCurriculumModal, setShowCurriculumModal] = useState<boolean>(false);

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  return (
    <div className="bg-surface text-brand-navy font-sans antialiased overflow-x-hidden min-h-screen">
      
      {/* HEADER NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/images/gwwww-2-1536x480.png" 
              alt="GrammarWorkout Logo" 
              className="h-18 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a className="text-brand-navy/80 hover:text-brand-magenta transition-colors" href="#methodology">Methodology</a>
            <a className="text-brand-navy/80 hover:text-brand-magenta transition-colors" href="#lifecycle">Journey</a>
            <a className="text-brand-navy/80 hover:text-brand-magenta transition-colors" href="#faq">Support</a>
            <button 
              onClick={() => setIsAssessmentOpen(true)}
              className="bg-brand-lilac/35 text-brand-deep-indigo border border-brand-lilac/20 px-6 py-2.5 rounded-xl font-bold hover:bg-brand-lilac/50 transition-all shadow-sm flex items-center gap-1.5"
            >
              Start Learning <Sparkles className="w-4 h-4 text-brand-magenta animate-pulse" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-navy hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-outline-variant relative z-40"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col font-bold">
              <a onClick={() => setIsMobileMenuOpen(false)} className="text-brand-navy/85 hover:text-brand-magenta text-base py-2 border-b border-slate-50" href="#methodology">Methodology</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="text-brand-navy/85 hover:text-brand-magenta text-base py-2 border-b border-slate-50" href="#lifecycle">Journey</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="text-brand-navy/85 hover:text-brand-magenta text-base py-2 border-b border-slate-50" href="#faq">Support</a>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAssessmentOpen(true);
                }}
                className="w-full text-center py-3 bg-brand-magenta text-white rounded-xl font-extrabold text-sm shadow-md"
              >
                Start Learning
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION - Centered typography overlay on top of the diverse group image */}
      <section className="relative overflow-hidden min-h-[700px] md:min-h-[820px] flex items-start justify-center bg-white text-brand-navy pt-20 sm:pt-28 md:pt-32 pb-40 px-6">
        
        {/* Background Image: Happy diverse group of learners */}
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover object-center"
            src="/images/Gemini_Generated_Image_eurrjaeurrjaeurr.png"
            alt="Diverse group of friendly, smiling language learners representing every kind of student"
          />
          {/* Light overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/70" />
          {/* Bottom fade element for smooth transition */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent" />
        </div>

        {/* Hero content - Centered on top of the image */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 -mt-20">
          
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight max-w-3xl mx-auto text-brand-navy drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              Find Your Tribe, <br className="hidden sm:inline" />
              Build Your <span className="text-brand-magenta">Network.</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-brand-navy/90 max-w-xl mx-auto leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
              Connect with like-minded students for fun, friendships, and future opportunities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
            <button 
              onClick={() => setIsAssessmentOpen(true)}
              className="w-full sm:w-auto bg-brand-navy text-white px-7 py-3 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center justify-center gap-2"
            >
              Join for Free <Sparkles className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsLessonOpen(true)}
              className="w-full sm:w-auto border-2 border-brand-navy/20 hover:border-brand-navy/40 text-brand-navy bg-white/80 hover:bg-white px-7 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4" /> Explore Communities
            </button>
          </div>
        </div>

        {/* Remove the phone mockup for cleaner design */}
      </section>

      {/* WHY DIFFERENT (A Smarter Approach to Mastery) */}
      <section className="py-24 bg-white" id="methodology">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-brand-magenta">The Cognitive Shift</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">A Smarter Approach to Mastery</h2>
            <p className="text-sm sm:text-base text-brand-navy/60 max-w-2xl mx-auto leading-relaxed">
              We've reimagined the language acquisition process to align with how your brain naturally encodes new information.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div 
              onClick={() => setIsAssessmentOpen(true)}
              className="group p-8 bg-brand-lavender hover:bg-brand-lavender/60 rounded-3xl border border-outline-variant hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:rotate-6 transition-transform text-brand-magenta border border-outline-variant">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-brand-navy mb-3">Academic Precision</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Curriculums designed by world-class linguists and neuro-scientists to maximize long-term vocabulary retention.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-magenta group-hover:underline mt-6 flex items-center gap-1">
                Explore pathways →
              </span>
            </div>

            {/* Card 2 */}
            <div 
              onClick={() => setIsLessonOpen(true)}
              className="group p-8 bg-brand-lavender hover:bg-brand-lavender/60 rounded-3xl border border-outline-variant hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:rotate-6 transition-transform text-brand-magenta border border-outline-variant">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-brand-navy mb-3">Cultural Immersion</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Go beyond grammar with real-world context, local idioms, and adaptive stories tailored for smart travelers.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-magenta group-hover:underline mt-6 flex items-center gap-1">
                Try dialogue lab →
              </span>
            </div>

            {/* Card 3 */}
            <div 
              onClick={() => setIsLessonOpen(true)}
              className="group p-8 bg-brand-lavender hover:bg-brand-lavender/60 rounded-3xl border border-outline-variant hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:rotate-6 transition-transform text-brand-magenta border border-outline-variant">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-brand-navy mb-3">Adaptive Stories</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Interactive narratives that change complexity based on your real-time performance and personal cognitive index.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-magenta group-hover:underline mt-6 flex items-center gap-1">
                Read sample chapter →
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE WORKFLOW JOURNEY TIMELINE */}
      <section className="py-24 bg-surface-container-low" id="lifecycle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-brand-magenta">Cognitive Sequence</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">The Learning Lifecycle</h2>
            <p className="text-sm text-brand-navy/60 max-w-xl mx-auto">
              Traditional apps force you into a one-size-fits-all mold. GrammarWorkout evolves as you do, ensuring fast natural fluency.
            </p>
          </div>

          {/* Fully Interactive Timeline component */}
          <TimelineInteractive onOpenAssessment={() => setIsAssessmentOpen(true)} />
        </div>
      </section>

      {/* SHADER-ACCENTED VOICE ENGINE / SPEAKING LAB BANNER */}
      <section className="py-24 bg-brand-deep-indigo text-white relative overflow-hidden">
        
        {/* Shimmery abstract backing overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-deep-indigo via-purple-950 to-brand-navy opacity-90 z-0 animate-shimmer" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-magenta/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
          
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-brand-magenta/30 text-brand-lilac rounded-full text-xs font-semibold uppercase tracking-widest border border-brand-magenta/50">
              GrammarWorkout Voice Engine
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Master the Nuance of <span className="text-brand-lilac italic">Native</span> Speech.
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
              Our proprietary pulse-matching technology analyzes your vocal frequencies against native benchmarks, providing real-time feedback on pitch, rhythm, and tone.
            </p>
          </div>

          <button 
            onClick={() => setIsVoiceLabOpen(true)}
            className="bg-brand-lilac text-brand-deep-indigo px-8 py-4 rounded-xl font-bold flex items-center gap-2 mx-auto hover:scale-105 hover:bg-white transition-all shadow-xl"
          >
            <Mic className="w-4 h-4 text-brand-deep-indigo" /> Start Speaking Lab
          </button>
        </div>
      </section>

      {/* FAQ SECTION WITH ACCORDIONS */}
      <section className="py-24 bg-white" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-brand-navy text-center mb-16 tracking-tight">
            Curious Minds Want to Know
          </h2>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => {
              const isOpen = activeFaqId === item.id;
              return (
                <div 
                  key={item.id}
                  className="border border-outline-variant rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex items-center justify-between p-5 bg-brand-lavender hover:bg-white transition-colors text-left font-bold text-brand-navy"
                  >
                    <span>{item.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-brand-navy/60 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-brand-magenta' : ''
                      }`} 
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white"
                      >
                        <div className="p-5 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SHIMMER CTA BANNER */}
      <section className="py-24 px-6 bg-slate-50 border-t border-b border-outline-variant">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-brand-deep-indigo p-8 sm:p-20 rounded-3xl shadow-xl relative overflow-hidden text-white space-y-6">
            
            {/* Ambient visual overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-deep-indigo via-brand-magenta/40 to-brand-deep-indigo opacity-70 z-0" />
            
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Ready to redefine your linguistic boundaries?
              </h2>
              <p className="text-sm sm:text-base text-brand-lilac font-medium max-w-xl mx-auto opacity-90">
                Join over 2 million language learners worldwide who have found their voice with GrammarWorkout.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => setIsAssessmentOpen(true)}
                className="w-full sm:w-auto bg-brand-lilac text-brand-deep-indigo px-8 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform shadow-lg cursor-pointer"
              >
                Unlock Your Full Potential
              </button>
              <button 
                onClick={() => setShowCurriculumModal(true)}
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer"
              >
                Explore Curriculum
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-white border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-magenta/10 rounded-lg flex items-center justify-center text-brand-magenta">
                <School className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-brand-navy tracking-tight">
                Grammar<span className="text-brand-magenta">Workout</span>
              </span>
            </div>
            <p className="text-xs text-outline leading-relaxed font-medium">
              Pioneering the future of language acquisition through custom neuroscience and pitch audio alignment algorithms.
            </p>
          </div>

          <div>
            <h5 className="font-extrabold text-brand-navy mb-4 uppercase tracking-wider text-xs">Platform</h5>
            <ul className="space-y-2 text-on-surface-variant text-xs font-semibold">
              <li><a className="hover:text-brand-magenta transition-colors" href="#methodology">Methodology</a></li>
              <li><a className="hover:text-brand-magenta transition-colors" href="#lifecycle">Journey Timeline</a></li>
              <li><button onClick={() => setIsVoiceLabOpen(true)} className="hover:text-brand-magenta text-left transition-colors">Vocal Pitch Lab</button></li>
              <li><button onClick={() => setIsAssessmentOpen(true)} className="hover:text-brand-magenta text-left transition-colors">Custom Study Plans</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-brand-navy mb-4 uppercase tracking-wider text-xs">Resources</h5>
            <ul className="space-y-2 text-on-surface-variant text-xs font-semibold">
              <li><a className="hover:text-brand-magenta transition-colors" href="#">Research Whitepaper</a></li>
              <li><button onClick={() => setIsLessonOpen(true)} className="hover:text-brand-magenta text-left transition-colors font-semibold">Sample Stories</button></li>
              <li><a className="hover:text-brand-magenta transition-colors" href="#faq">Support Center</a></li>
              <li><a className="hover:text-brand-magenta transition-colors" href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-brand-navy mb-4 uppercase tracking-wider text-xs">Social Connections</h5>
            <div className="flex gap-2.5">
              <a href="#" className="w-9 h-9 rounded-full bg-brand-lavender hover:bg-brand-magenta hover:text-white text-brand-deep-indigo flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-brand-lavender hover:bg-brand-magenta hover:text-white text-brand-deep-indigo flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-brand-lavender hover:bg-brand-magenta hover:text-white text-brand-deep-indigo flex items-center justify-center transition-colors">
                <Award className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-outline-variant flex flex-col sm:flex-row justify-between text-xs text-outline font-medium gap-4">
          <p>© 2026 GrammarWorkout. All rights reserved.</p>
          <p>Designed with ❤️ for the curious.</p>
        </div>
      </footer>

      {/* ASSESSMENT MODAL */}
      <AnimatePresence>
        {isAssessmentOpen && (
          <AssessmentModal 
            isOpen={isAssessmentOpen} 
            onClose={() => setIsAssessmentOpen(false)} 
            onSelectSampleLesson={() => setIsLessonOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* VOICE SPEAKING LAB MODAL */}
      <AnimatePresence>
        {isVoiceLabOpen && (
          <VoiceLab 
            isOpen={isVoiceLabOpen} 
            onClose={() => setIsVoiceLabOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* SAMPLE LESSON READER MODAL */}
      <AnimatePresence>
        {isLessonOpen && (
          <LessonReader 
            isOpen={isLessonOpen} 
            onClose={() => setIsLessonOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* CURRICULUM DISCOVERY MODAL */}
      <AnimatePresence>
        {showCurriculumModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm" onClick={() => setShowCurriculumModal(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 relative z-10 max-w-md w-full border border-outline-variant space-y-4"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg text-brand-navy flex items-center gap-1.5">
                  <Languages className="w-5 h-5 text-brand-magenta" /> GrammarWorkout Curriculums
                </h4>
                <button onClick={() => setShowCurriculumModal(false)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-brand-navy/60">
                Unlock high-frequency conversational skills inside 12 native language paths tailored with cognitive maps.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['🇪🇸 Spanish', '🇫🇷 French', '🇯🇵 Japanese', '🇮🇹 Italian', '🇩🇪 German', '🇰🇷 Korean'].map((lang, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setShowCurriculumModal(false);
                      setIsAssessmentOpen(true);
                    }}
                    className="p-3 bg-brand-lavender/40 hover:bg-brand-lavender border border-outline-variant rounded-xl text-left text-xs font-semibold text-brand-navy hover:text-brand-magenta transition-all"
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => {
                  setShowCurriculumModal(false);
                  setIsAssessmentOpen(true);
                }}
                className="w-full py-2.5 bg-brand-magenta text-white font-bold text-xs rounded-xl hover:brightness-110 transition-all text-center uppercase tracking-wider"
              >
                Claim Free Diagnostic Plan
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
