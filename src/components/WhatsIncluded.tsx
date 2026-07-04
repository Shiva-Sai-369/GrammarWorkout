import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { BookOpen, CheckCircle, BarChart3, Volume2, DollarSign } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "French & Spanish Grammar Tracks",
    description: "Two complete programs, A1 through B2, so every student has a starting point.",
    icon: <BookOpen className="w-12 h-12" />,
  },
  {
    title: "Syllabus Fit Check",
    description: "Before rollout, we line up GrammarWorkout's levels against what your program already teaches.",
    icon: <CheckCircle className="w-12 h-12" />,
  },
  {
    title: "Teacher & Admin Dashboards",
    description: "Spot class-wide trends and individual gaps without building a report by hand.",
    icon: <BarChart3 className="w-12 h-12" />,
  },
  {
    title: "Native-Speaker Audio",
    description: "Every exercise is voiced by a native speaker, so pronunciation trains alongside grammar.",
    icon: <Volume2 className="w-12 h-12" />,
  },
  {
    title: "Institutional Pricing",
    description: "Costs scale with class size, not a per-seat rate built for individual learners.",
    icon: <DollarSign className="w-12 h-12" />,
  },
];

interface FeatureRowProps {
  feature: Feature;
  index: number;
}

const FeatureRow = ({ feature, index }: FeatureRowProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const slideVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={slideVariants}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Icon Side */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 bg-[#84007B] rounded-2xl flex items-center justify-center text-white shadow-lg">
          {feature.icon}
        </div>
      </div>

      {/* Text Side */}
      <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'} text-center`}>
        <h3 className="text-2xl md:text-3xl font-black text-[#84007B] mb-3">
          {feature.title}
        </h3>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function WhatsIncluded() {
  return (
    <section id="whats-included" className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
            What's Included
          </h2>
        </div>

        {/* Feature Rows */}
        <div className="space-y-16 md:space-y-24">
          {features.map((feature, index) => (
            <FeatureRow key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16 md:mt-20">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center bg-[#84007B] text-white px-8 py-4 rounded-lg text-lg font-black hover:bg-[#6B0066] transition-colors shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            See Pricing for Your Program
          </a>
        </div>
      </div>
    </section>
  );
}
