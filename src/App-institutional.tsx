import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  School, 
  BookOpen, 
  ChevronDown, 
  Menu, 
  X,
  CheckCircle,
  BarChart3,
  Users,
  Volume2,
  DollarSign
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq_1",
    question: "Does GrammarWorkout replace our existing curriculum?",
    answer: "No. It runs alongside your syllabus and reinforces what's already being taught, rather than introducing a separate track."
  },
  {
    id: "faq_2",
    question: "How is pricing structured?",
    answer: "Pricing depends on class size and program scope. Share your numbers and we'll send a proposal built around them."
  },
  {
    id: "faq_3",
    question: "Will teachers need training?",
    answer: "Staff get a short walkthrough before rollout. No technical background is required."
  },
  {
    id: "faq_4",
    question: "Can we see how individual students are doing?",
    answer: "Yes. Dashboards break progress down by class and by student, updated as they practice."
  },
  {
    id: "faq_5",
    question: "Can we test it before committing?",
    answer: "We can set up a pilot period during your consultation so your team can try it with real students first."
  },
  {
    id: "faq_6",
    question: "How is student data handled?",
    answer: "We follow standard data-protection practices for student information and can go through specifics on a call."
  }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen">
      
      {/* HEADER NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/images/gwwww-2-1536x480.png" 
              alt="GrammarWorkout Logo" 
              className="h-14 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a className="text-slate-700 hover:text-indigo-900 transition-colors" href="#why-schools">Why Schools Choose Us</a>
            <a className="text-slate-700 hover:text-indigo-900 transition-colors" href="#whats-included">What's Included</a>
            <a className="text-slate-700 hover:text-indigo-900 transition-colors" href="#how-it-works">How It Works</a>
            <a className="text-slate-700 hover:text-indigo-900 transition-colors" href="#faq">FAQ</a>
            <a 
              href="#consultation"
              className="bg-indigo-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-800 transition-colors"
            >
              Book a Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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
            className="md:hidden bg-white border-b border-slate-200 relative z-40"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col font-medium">
              <a onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 py-2 border-b border-slate-100" href="#why-schools">Why Schools Choose Us</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 py-2 border-b border-slate-100" href="#whats-included">What's Included</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 py-2 border-b border-slate-100" href="#how-it-works">How It Works</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 py-2 border-b border-slate-100" href="#faq">FAQ</a>
              <a 
                href="#consultation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-indigo-900 text-white rounded-lg font-semibold"
              >
                Book a Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1 — HERO */}
      <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-indigo-950" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                  Turn Grammar Practice Into Real Classroom Results
                </h1>
                <p className="text-lg md:text-xl text-slate-700 font-medium">
                  CEFR-aligned French and Spanish grammar training, built for schools and language programs
                </p>
              </div>

              <p className="text-base text-slate-600 leading-relaxed">
                Vocabulary games keep students opening an app. They rarely fix the grammar mistakes that show up on a test. GrammarWorkout gives students structured reps on the rules that trip them up most — verb tenses, sentence order, agreement — with the reporting your program needs to see it working.
              </p>

              <div className="space-y-4">
                <p className="font-semibold text-indigo-950">Why programs choose it:</p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>CEFR-aligned levels, A1 through B2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Native-speaker audio built into every drill</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Dashboards that show exactly where each student is stuck</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Fits alongside your syllabus instead of replacing it</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#consultation"
                  className="inline-flex items-center justify-center bg-indigo-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-800 transition-colors"
                >
                  Book a Consultation
                </a>
                <a 
                  href="#consultation"
                  className="inline-flex items-center justify-center border-2 border-indigo-900 text-indigo-900 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                >
                  Request a Quote
                </a>
              </div>
            </div>

            {/* Right: Proficiency Dial (Signature Element) */}
            <div className="flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-80 h-80"
              >
                {/* Outer ring background */}
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="#e0e7ff"
                    strokeWidth="20"
                  />
                  {/* Animated progress ring */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray="534"
                    initial={{ strokeDashoffset: 534 }}
                    animate={{ strokeDashoffset: 534 * 0.25 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    transform="rotate(-90 100 100)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-black text-indigo-950" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                      A1-B2
                    </div>
                    <div className="text-sm text-slate-600 mt-2 font-medium">CEFR Levels</div>
                  </div>
                </div>

                {/* Level markers */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-purple-700">A1</div>
                <div className="absolute bottom-4 right-4 text-xs font-mono font-bold text-purple-700">B2</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY SCHOOLS CHOOSE GRAMMARWORKOUT */}
      <section id="why-schools" className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-950 mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              Why Schools Choose GrammarWorkout
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Other platforms are built to keep students logged in. GrammarWorkout is built to move their grammar scores.
            </p>
          </div>

          {/* Two-lane comparison layout */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Left lane: Other platforms (implied) */}
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-700 mb-2">Built around engagement metrics</h3>
                <p className="text-sm text-slate-600">Daily streaks, reward points, and gamification features that keep students opening the app</p>
              </div>
              
              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-700 mb-2">Proprietary level systems</h3>
                <p className="text-sm text-slate-600">Custom progress tracking that doesn't map to standards your administrators recognize</p>
              </div>
              
              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-700 mb-2">Consumer-focused design</h3>
                <p className="text-sm text-slate-600">Built for individual learners, not classroom reporting needs</p>
              </div>
              
              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-700 mb-2">Trial-and-error approach</h3>
                <p className="text-sm text-slate-600">Exercises optimized for retention metrics rather than acquisition research</p>
              </div>
            </div>

            {/* Right lane: GrammarWorkout */}
            <div className="space-y-6">
              <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-600">
                <h3 className="font-semibold text-indigo-950 mb-2">Grammar comes first.</h3>
                <p className="text-sm text-slate-700">Lessons are built around understanding sentence structure, not around daily streak reminders.</p>
              </div>
              
              <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-600">
                <h3 className="font-semibold text-indigo-950 mb-2">CEFR alignment your reports can use.</h3>
                <p className="text-sm text-slate-700">A1–B2 levels map to a standard your administrators already recognize.</p>
              </div>
              
              <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-600">
                <h3 className="font-semibold text-indigo-950 mb-2">Built for more than one user.</h3>
                <p className="text-sm text-slate-700">Teachers and administrators see the same progress data students do — nothing gets lost between class and report card.</p>
              </div>
              
              <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-600">
                <h3 className="font-semibold text-indigo-950 mb-2">Grounded in how grammar is actually learned.</h3>
                <p className="text-sm text-slate-700">The lesson order follows language-acquisition research, not what tests well for app engagement.</p>
              </div>
            </div>
          </div>

          {/* Proof placeholder panel */}
          <div className="p-8 bg-indigo-50 rounded-lg border border-indigo-200 text-center">
            <p className="text-sm text-slate-600 italic">[Institutional testimonial, partner logo, or outcome statistic]</p>
          </div>

          <div className="text-center mt-12">
            <a 
              href="#consultation"
              className="inline-flex items-center justify-center bg-indigo-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-800 transition-colors"
            >
              Talk to Our Team
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT'S INCLUDED */}
      <section id="whats-included" className="py-20 md:py-28 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-950 mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              What's Included
            </h2>
          </div>

          {/* Asymmetric grid of workout cards */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Card 1 - Spans 2 columns */}
            <div className="md:col-span-2 p-8 bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-indigo-950">French & Spanish Grammar Tracks</h3>
                    <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">A1-B2</span>
                  </div>
                  <p className="text-slate-600">Two complete programs, A1 through B2, so every student has a starting point.</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-4 h-full">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-indigo-950">Syllabus Fit Check</h3>
                    <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">A1-B2</span>
                  </div>
                  <p className="text-slate-600">Before rollout, we line up GrammarWorkout's levels against what your program already teaches.</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-4 h-full">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-indigo-950">Teacher & Admin Dashboards</h3>
                    <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">A1-B2</span>
                  </div>
                  <p className="text-slate-600">Spot class-wide trends and individual gaps without building a report by hand.</p>
                </div>
              </div>
            </div>

            {/* Card 4 - Spans 2 columns */}
            <div className="md:col-span-2 p-8 bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-indigo-950">Native-Speaker Audio</h3>
                    <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">A1-B2</span>
                  </div>
                  <p className="text-slate-600">Every exercise is voiced by a native speaker, so pronunciation trains alongside grammar.</p>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="p-8 bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-4 h-full">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-indigo-950">Institutional Pricing</h3>
                    <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">A1-B2</span>
                  </div>
                  <p className="text-slate-600">Costs scale with class size, not a per-seat rate built for individual learners.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="#consultation"
              className="inline-flex items-center justify-center bg-indigo-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-800 transition-colors"
            >
              See Pricing for Your Program
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-950 mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              How It Works
            </h2>
          </div>

          {/* Horizontal numbered timeline */}
          <div className="relative">
            {/* Desktop timeline */}
            <div className="hidden md:flex items-start justify-between gap-4 mb-8">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-indigo-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>1</div>
                <h3 className="font-bold text-indigo-950 mb-2">Consultation</h3>
                <p className="text-sm text-slate-600">A short call about your language, student levels, and class sizes.</p>
              </div>
              
              <div className="flex items-center pt-8">
                <div className="w-12 h-0.5 bg-purple-300"></div>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-indigo-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>2</div>
                <h3 className="font-bold text-indigo-950 mb-2">Syllabus Fit Check</h3>
                <p className="text-sm text-slate-600">We compare GrammarWorkout's content to what you're already teaching, level by level.</p>
              </div>
              
              <div className="flex items-center pt-8">
                <div className="w-12 h-0.5 bg-purple-300"></div>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-indigo-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>3</div>
                <h3 className="font-bold text-indigo-950 mb-2">Proposal</h3>
                <p className="text-sm text-slate-600">You get pricing built around your program size, not a flat rate.</p>
              </div>
              
              <div className="flex items-center pt-8">
                <div className="w-12 h-0.5 bg-purple-300"></div>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-indigo-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>4</div>
                <h3 className="font-bold text-indigo-950 mb-2">Rollout & Support</h3>
                <p className="text-sm text-slate-600">Staff get a short walkthrough, and your program gets an ongoing contact once it's live.</p>
              </div>
            </div>

            {/* Mobile timeline */}
            <div className="md:hidden space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>1</div>
                <div>
                  <h3 className="font-bold text-indigo-950 mb-2">Consultation</h3>
                  <p className="text-sm text-slate-600">A short call about your language, student levels, and class sizes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>2</div>
                <div>
                  <h3 className="font-bold text-indigo-950 mb-2">Syllabus Fit Check</h3>
                  <p className="text-sm text-slate-600">We compare GrammarWorkout's content to what you're already teaching, level by level.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>3</div>
                <div>
                  <h3 className="font-bold text-indigo-950 mb-2">Proposal</h3>
                  <p className="text-sm text-slate-600">You get pricing built around your program size, not a flat rate.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>4</div>
                <div>
                  <h3 className="font-bold text-indigo-950 mb-2">Rollout & Support</h3>
                  <p className="text-sm text-slate-600">Staff get a short walkthrough, and your program gets an ongoing contact once it's live.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="#consultation"
              className="inline-flex items-center justify-center bg-indigo-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-800 transition-colors"
            >
              Start With a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FAQ */}
      <section id="faq" className="py-20 md:py-28 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-950" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => {
              const isOpen = activeFaqId === item.id;
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex items-center justify-between p-6 text-left font-semibold text-indigo-950 hover:bg-slate-50 transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-slate-600 transition-transform duration-300 flex-shrink-0 ml-4 ${
                        isOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed">
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

      {/* SECTION 6 — FINAL CTA */}
      <section id="consultation" className="py-20 md:py-28 px-6 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            Ready to See Grammar Practice Actually Pay Off in the Classroom?
          </h2>
          <p className="text-lg text-indigo-100">
            Book a consultation to walk through your program, or request a quote based on your class sizes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <a 
              href="#consultation"
              className="inline-flex items-center justify-center bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Book a Consultation
            </a>
            <a 
              href="#consultation"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <img 
              src="/images/gwwww-2-1536x480.png" 
              alt="GrammarWorkout Logo" 
              className="h-12 w-auto object-contain mx-auto opacity-80"
            />
          </div>
          <p className="text-sm">
            © 2026 GrammarWorkout. CEFR-aligned grammar training for schools and language programs.
          </p>
        </div>
      </footer>

    </div>
  );
}
