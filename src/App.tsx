import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronDown, 
  Menu, 
  X,
  CheckCircle,
  BarChart3,
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
          <div className="hidden md:flex items-center gap-4 text-sm font-black">
            <a className="text-slate-700 hover:text-[#82007C] transition-colors" href="#why-schools">Why Schools Choose Us</a>
            <a className="text-slate-700 hover:text-[#82007C] transition-colors" href="#whats-included">What's Included</a>
            <a className="text-slate-700 hover:text-[#82007C] transition-colors" href="#how-it-works">How It Works</a>
            <a className="text-slate-700 hover:text-[#82007C] transition-colors" href="#faq">FAQ</a>
            <a 
              href="#consultation"
              className="bg-[#82007C] text-white px-6 py-2.5 rounded-lg font-black hover:bg-[#6B0066] transition-colors"
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
            <div className="px-6 py-6 space-y-2 flex flex-col font-black">
              <a onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 py-2 border-b border-slate-100" href="#why-schools">Why Schools Choose Us</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 py-2 border-b border-slate-100" href="#whats-included">What's Included</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 py-2 border-b border-slate-100" href="#how-it-works">How It Works</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 py-2 border-b border-slate-100" href="#faq">FAQ</a>
              <a 
                href="#consultation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#82007C] text-white rounded-lg font-black"
              >
                Book a Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden min-h-[500px] md:min-h-[600px] flex items-start justify-center bg-white text-brand-navy pt-12 sm:pt-16 md:pt-20 pb-20 px-6">
        
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
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent" />
        </div>

        {/* Hero content - Centered on top of the image */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3 -mt-8">
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight max-w-3xl mx-auto text-slate-800 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              Turn Grammar Practice Into Real <span className="text-[#82007C]">Classroom Results</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
              <span className="font-black text-[#82007C]">CEFR</span> (Common European Framework of Reference for Languages) aligned French and Spanish grammar training, built for schools and language programs
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
            <a 
              href="#consultation"
              className="w-full sm:w-auto bg-[#82007C] text-white px-7 py-3 rounded-xl text-sm font-black shadow-lg hover:scale-105 hover:bg-[#6B0066] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Book a Consultation
            </a>
            <a 
              href="#consultation"
              className="w-full sm:w-auto border-2 border-[#82007C]/30 hover:border-[#82007C]/50 text-[#82007C] bg-white/80 hover:bg-white px-7 py-3 rounded-xl text-sm font-black transition-all cursor-pointer backdrop-blur-sm flex items-center justify-center gap-2"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY SCHOOLS CHOOSE GRAMMARWORKOUT */}
      <section id="why-schools" className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 mb-4">
              Why Schools Choose GrammarWorkout
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
              Other platforms are built to keep students logged in. GrammarWorkout is built to move their grammar scores.
            </p>
          </div>

          {/* Two-lane comparison layout */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            
            {/* Left lane: Other platforms (implied) */}
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-black text-slate-700 mb-2">Built around engagement metrics</h3>
                <p className="text-sm text-slate-600">Daily streaks, reward points, and gamification features that keep students opening the app</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-black text-slate-700 mb-2">Proprietary level systems</h3>
                <p className="text-sm text-slate-600">Custom progress tracking that doesn't map to standards your administrators recognize</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-black text-slate-700 mb-2">Consumer-focused design</h3>
                <p className="text-sm text-slate-600">Built for individual learners, not classroom reporting needs</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-black text-slate-700 mb-2">Trial-and-error approach</h3>
                <p className="text-sm text-slate-600">Exercises optimized for retention metrics rather than acquisition research</p>
              </div>
            </div>

            {/* Right lane: GrammarWorkout */}
            <div className="space-y-3">
              <div className="p-4 bg-[#F5EBF4] rounded-lg border-2 border-[#82007C]">
                <h3 className="font-black text-[#82007C] mb-2">Grammar comes first.</h3>
                <p className="text-sm text-slate-700 font-medium">Lessons are built around understanding sentence structure, not around daily streak reminders.</p>
              </div>
              
              <div className="p-4 bg-[#F5EBF4] rounded-lg border-2 border-[#82007C]">
                <h3 className="font-black text-[#82007C] mb-2">CEFR alignment your reports can use.</h3>
                <p className="text-sm text-slate-700 font-medium">A1–B2 levels map to a standard your administrators already recognize.</p>
              </div>
              
              <div className="p-4 bg-[#F5EBF4] rounded-lg border-2 border-[#82007C]">
                <h3 className="font-black text-[#82007C] mb-2">Built for more than one user.</h3>
                <p className="text-sm text-slate-700 font-medium">Teachers and administrators see the same progress data students do — nothing gets lost between class and report card.</p>
              </div>
              
              <div className="p-4 bg-[#F5EBF4] rounded-lg border-2 border-[#82007C]">
                <h3 className="font-black text-[#82007C] mb-2">Grounded in how grammar is actually learned.</h3>
                <p className="text-sm text-slate-700 font-medium">The lesson order follows language-acquisition research, not what tests well for app engagement.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <a 
              href="#consultation"
              className="inline-flex items-center justify-center bg-[#82007C] text-white px-8 py-4 rounded-lg font-black hover:bg-[#6B0066] transition-colors"
            >
              Talk to Our Team
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT'S INCLUDED */}
      <section id="whats-included" className="py-12 md:py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 mb-2">
              What's Included
            </h2>
          </div>

          {/* Perfect rectangle masonry grid - no empty space */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-max">
            
            {/* Card 1 - French & Spanish - Wide (2 cols, 1 row) */}
            <div className="col-span-2 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#DCB8DA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-[#82007C]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-base font-black text-slate-800">French & Spanish Grammar Tracks</h3>
                    <span className="text-xs font-mono font-black text-[#82007C] bg-[#F5EBF4] px-2 py-0.5 rounded">A1-B2</span>
                  </div>
                  <p className="text-sm text-slate-600">Two complete programs, A1 through B2, so every student has a starting point.</p>
                </div>
              </div>
            </div>

            {/* Card 2 - Syllabus Fit Check - Tall (1 col, 2 rows) */}
            <div className="row-span-2 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-[#DCB8DA] rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#82007C]" />
                </div>
                <span className="text-xs font-mono font-black text-[#82007C] bg-[#F5EBF4] px-2 py-0.5 rounded">A1-B2</span>
              </div>
              <h3 className="text-base font-black text-slate-800 mb-2">Syllabus Fit Check</h3>
              <p className="text-sm text-slate-600">Before rollout, we line up GrammarWorkout's levels against what your program already teaches.</p>
            </div>

            {/* Card 3 - Teacher Dashboards (1 col, 1 row) */}
            <div className="p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-[#DCB8DA] rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#82007C]" />
                </div>
                <span className="text-xs font-mono font-black text-[#82007C] bg-[#F5EBF4] px-2 py-0.5 rounded">A1-B2</span>
              </div>
              <h3 className="text-base font-black text-slate-800 mb-1">Teacher & Admin Dashboards</h3>
              <p className="text-sm text-slate-600">Spot class-wide trends and individual gaps without building a report by hand.</p>
            </div>

            {/* Card 4 - Native Audio (1 col, 1 row) */}
            <div className="p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-[#DCB8DA] rounded-lg flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-[#82007C]" />
                </div>
                <span className="text-xs font-mono font-black text-[#82007C] bg-[#F5EBF4] px-2 py-0.5 rounded">A1-B2</span>
              </div>
              <h3 className="text-base font-black text-slate-800 mb-1">Native-Speaker Audio</h3>
              <p className="text-sm text-slate-600">Every exercise is voiced by a native speaker, so pronunciation trains alongside grammar.</p>
            </div>

            {/* Card 5 - Institutional Pricing - Wide (2 cols, 1 row) */}
            <div className="col-span-2 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#DCB8DA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-[#82007C]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-base font-black text-slate-800">Institutional Pricing</h3>
                    <span className="text-xs font-mono font-black text-[#82007C] bg-[#F5EBF4] px-2 py-0.5 rounded">A1-B2</span>
                  </div>
                  <p className="text-sm text-slate-600">Costs scale with class size, not a per-seat rate built for individual learners.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <a 
              href="#consultation"
              className="inline-flex items-center justify-center bg-[#82007C] text-white px-8 py-4 rounded-lg font-black hover:bg-[#6B0066] transition-colors"
            >
              See Pricing for Your Program
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section id="how-it-works" className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 mb-4">
              How It Works
            </h2>
          </div>

          {/* Horizontal numbered timeline */}
          <div className="relative">
            {/* Desktop timeline */}
            <div className="hidden md:flex items-start justify-between gap-4 mb-8">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-[#82007C] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl">1</div>
                <h3 className="font-black text-slate-800 mb-2">Consultation</h3>
                <p className="text-sm text-slate-600">A short call about your language, student levels, and class sizes.</p>
              </div>
              
              <div className="flex items-center pt-8">
                <div className="w-12 h-0.5 bg-purple-300"></div>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-[#82007C] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl">2</div>
                <h3 className="font-black text-slate-800 mb-2">Syllabus Fit Check</h3>
                <p className="text-sm text-slate-600">We compare GrammarWorkout's content to what you're already teaching, level by level.</p>
              </div>
              
              <div className="flex items-center pt-8">
                <div className="w-12 h-0.5 bg-purple-300"></div>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-[#82007C] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl">3</div>
                <h3 className="font-black text-slate-800 mb-2">Proposal</h3>
                <p className="text-sm text-slate-600">You get pricing built around your program size, not a flat rate.</p>
              </div>
              
              <div className="flex items-center pt-8">
                <div className="w-12 h-0.5 bg-purple-300"></div>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-[#82007C] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl">4</div>
                <h3 className="font-black text-slate-800 mb-2">Rollout & Support</h3>
                <p className="text-sm text-slate-600">Staff get a short walkthrough, and your program gets an ongoing contact once it's live.</p>
              </div>
            </div>

            {/* Mobile timeline */}
            <div className="md:hidden space-y-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#82007C] text-white rounded-full flex items-center justify-center flex-shrink-0 font-black text-lg">1</div>
                <div>
                  <h3 className="font-black text-slate-800 mb-2">Consultation</h3>
                  <p className="text-sm text-slate-600">A short call about your language, student levels, and class sizes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#82007C] text-white rounded-full flex items-center justify-center flex-shrink-0 font-black text-lg">2</div>
                <div>
                  <h3 className="font-black text-slate-800 mb-2">Syllabus Fit Check</h3>
                  <p className="text-sm text-slate-600">We compare GrammarWorkout's content to what you're already teaching, level by level.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#82007C] text-white rounded-full flex items-center justify-center flex-shrink-0 font-black text-lg">3</div>
                <div>
                  <h3 className="font-black text-slate-800 mb-2">Proposal</h3>
                  <p className="text-sm text-slate-600">You get pricing built around your program size, not a flat rate.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#82007C] text-white rounded-full flex items-center justify-center flex-shrink-0 font-black text-lg">4</div>
                <div>
                  <h3 className="font-black text-slate-800 mb-2">Rollout & Support</h3>
                  <p className="text-sm text-slate-600">Staff get a short walkthrough, and your program gets an ongoing contact once it's live.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <a 
              href="#consultation"
              className="inline-flex items-center justify-center bg-[#82007C] text-white px-8 py-4 rounded-lg font-black hover:bg-[#6B0066] transition-colors"
            >
              Start With a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FAQ */}
      <section id="faq" className="py-12 md:py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2">
            {FAQ_ITEMS.map((item) => {
              const isOpen = activeFaqId === item.id;
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex items-center justify-between p-4 text-left font-black text-slate-800 hover:bg-slate-50 transition-colors"
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
      <section id="consultation" className="py-12 md:py-16 px-6 bg-[#82007C] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Ready to See Grammar Practice Actually Pay Off in the Classroom?
          </h2>
          <p className="text-lg text-[#DCB8DA]">
            Book a consultation to walk through your program, or request a quote based on your class sizes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <a 
              href="#consultation"
              className="inline-flex items-center justify-center bg-white text-[#82007C] px-8 py-4 rounded-lg font-black hover:bg-[#F5EBF4] transition-colors"
            >
              Book a Consultation
            </a>
            <a 
              href="#consultation"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-black hover:bg-white/10 transition-colors"
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
