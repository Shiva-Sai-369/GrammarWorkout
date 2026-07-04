import { useEffect, useRef, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Consultation",
    description: "A short call about your language, student levels, and class sizes.",
  },
  {
    number: 2,
    title: "Syllabus Fit Check",
    description: "We compare GrammarWorkout's content to what you're already teaching, level by level.",
  },
  {
    number: 3,
    title: "Proposal",
    description: "You get pricing built around your program size, not a flat rate.",
  },
  {
    number: 4,
    title: "Rollout & Support",
    description: "Staff get a short walkthrough, and your program gets an ongoing contact once it's live.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show all steps as complete if reduced motion is preferred
      setCompletedSteps([1, 2, 3, 4]);
      setScrollProgress(100);
      return;
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate when section enters viewport (when top is at 80% of window)
      const triggerPoint = windowHeight * 0.8;
      
      if (sectionTop < triggerPoint && sectionTop > -sectionHeight) {
        // Calculate progress (0 to 1)
        const progress = Math.min(
          Math.max((triggerPoint - sectionTop) / (sectionHeight * 0.6), 0),
          1
        );
        
        setScrollProgress(progress * 100);

        // Mark steps as complete based on progress
        const newCompletedSteps: number[] = [];
        if (progress >= 0.25) newCompletedSteps.push(1);
        if (progress >= 0.5) newCompletedSteps.push(2);
        if (progress >= 0.75) newCompletedSteps.push(3);
        if (progress >= 1) newCompletedSteps.push(4);
        
        setCompletedSteps(newCompletedSteps);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="py-16 md:py-24 px-6 bg-white relative overflow-hidden how-it-works-section"
    >
      {/* Dot grid background pattern */}
      <div className="absolute inset-0 dot-grid-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 mb-4">
            How It Works
          </h2>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block relative">
          <div className="flex items-start justify-between gap-8 mb-8 relative">
            {/* Progress line background */}
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-slate-200" style={{ 
              left: '8%', 
              right: '8%' 
            }} />
            
            {/* Animated progress line fill */}
            <div 
              className="absolute top-10 left-0 h-0.5 bg-[#84007B] transition-all duration-300 ease-out"
              style={{ 
                left: '8%',
                width: `${scrollProgress * 0.84}%`
              }}
            />

            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.number);
              const showDoneLabel = isCompleted;

              return (
                <div key={step.number} className="flex-1 text-center relative">
                  {/* Status indicator */}
                  <div className="relative inline-block mb-6">
                    <div
                      className={`
                        w-20 h-20 rounded-full flex items-center justify-center mx-auto
                        transition-all duration-500 ease-out relative
                        ${isCompleted 
                          ? 'bg-[#84007B] border-4 border-[#84007B] step-completed' 
                          : 'bg-white border-4 border-slate-300'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-10 h-10 text-white" strokeWidth={3} />
                      ) : (
                        <span className="text-3xl font-black text-slate-400">
                          {step.number}
                        </span>
                      )}
                    </div>
                    
                    {/* "Done" label */}
                    {showDoneLabel && (
                      <div className="absolute -right-14 top-1/2 -translate-y-1/2 done-label">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                          Done
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-black text-slate-800 mb-3 text-lg">{step.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed px-2">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden space-y-8 relative">
          {/* Vertical progress line background */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
          
          {/* Animated vertical progress line fill */}
          <div 
            className="absolute left-6 top-0 w-0.5 bg-[#84007B] transition-all duration-300 ease-out"
            style={{ 
              height: `${scrollProgress}%`
            }}
          />

          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.number);
            const showDoneLabel = isCompleted;

            return (
              <div key={step.number} className="flex items-start gap-6 relative">
                {/* Status indicator */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`
                      w-14 h-14 rounded-full flex items-center justify-center
                      transition-all duration-500 ease-out
                      ${isCompleted 
                        ? 'bg-[#84007B] border-4 border-[#84007B] step-completed' 
                        : 'bg-white border-4 border-slate-300'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-7 h-7 text-white" strokeWidth={3} />
                    ) : (
                      <span className="text-xl font-black text-slate-400">
                        {step.number}
                      </span>
                    )}
                  </div>
                  
                  {/* "Done" label */}
                  {showDoneLabel && (
                    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 done-label">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        Done
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="font-black text-slate-800 mb-2 text-lg">{step.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <a
            href="#consultation"
            className="inline-flex items-center justify-center bg-[#84007B] text-white px-8 py-4 rounded-lg font-black hover:bg-[#6B0066] transition-colors"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
