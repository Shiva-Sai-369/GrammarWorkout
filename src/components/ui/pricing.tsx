"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { BookOpen, CheckCheck, Users } from "lucide-react";
import { useRef } from "react";

const plans = [
  {
    name: "1 Month",
    description: "Great for trying a focused routine",
    price: 5,
    originalPrice: 15,
    savePercent: "33%",
    buttonText: "Sign Up",
    buttonVariant: "outline" as const,
    features: [
      { text: "Access to level based grammar topics", icon: <BookOpen size={20} /> },
      { text: "Cancel anytime", icon: <CheckCheck size={20} /> },
      { text: "Perfect for testing the platform", icon: <Users size={20} /> },
    ],
  },
  {
    name: "6 Months",
    description: "Most popular for steady progress",
    price: 20,
    originalPrice: 30,
    savePercent: "33%",
    buttonText: "Sign Up",
    buttonVariant: "default" as const,
    popular: true,
    features: [
      { text: "Lower cost per month", icon: <BookOpen size={20} /> },
      { text: "Perfect for a semester schedule", icon: <CheckCheck size={20} /> },
      { text: "Most popular for steady progress", icon: <Users size={20} /> },
    ],
  },
  {
    name: "12 Months",
    description: "Best value for long term learners",
    price: 30,
    originalPrice: 60,
    savePercent: "50%",
    buttonText: "Sign Up",
    buttonVariant: "outline" as const,
    features: [
      { text: "Best value for long term learners", icon: <BookOpen size={20} /> },
      { text: "Ideal for annual planning", icon: <CheckCheck size={20} /> },
      { text: "Strong habit building", icon: <Users size={20} /> },
    ],
  },
];

export default function PricingSection() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div
      className="px-4 pt-20 pb-12 max-w-7xl mx-auto relative"
      ref={pricingRef}
    >
      <article className="text-center mb-12 space-y-4 max-w-3xl mx-auto">
        <h2 className="md:text-6xl text-4xl font-black text-gray-900 mb-4">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Plans
          </VerticalCutReveal>
        </h2>
        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="md:text-lg text-base text-gray-600 font-medium"
        >
          Introductory pricing with flexible terms. Select a language and choose a plan.
        </TimelineContent>
      </article>

      <div className="grid md:grid-cols-3 gap-6 py-6">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={1 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={`relative border-2 h-full flex flex-col ${
                plan.popular
                  ? "ring-2 ring-[#82007C] bg-[#F5EBF4] border-[#82007C]"
                  : "bg-white border-neutral-200"
              }`}
            >
              <CardHeader className="text-left pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-3xl font-black text-[#82007C]">
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <span className="bg-[#82007C] text-white px-3 py-1 rounded-full text-xs font-black">
                      Popular
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-[#82007C] mb-3 font-black">
                  (Introductory Price)
                </p>
                
                {plan.savePercent && (
                  <div className="mb-4">
                    <span className="bg-[#DCB8DA] text-[#82007C] px-3 py-1.5 rounded-md text-sm font-black">
                      Save {plan.savePercent}!
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-black text-gray-400 line-through">
                    ${plan.originalPrice}
                  </span>
                  <span className="text-5xl font-black text-gray-900">
                    ${plan.price}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 font-medium mb-4">
                  Just ${plan.price}/month and terminate at any time.
                </p>
              </CardHeader>
              
              <CardContent className="pt-0 flex-1 flex flex-col">
                <button
                  className={`w-full mb-6 p-4 text-lg font-black rounded-lg transition-all ${
                    plan.popular
                      ? "bg-gradient-to-b from-[#82007C] to-[#6B0066] text-white hover:shadow-lg hover:shadow-[#82007C]/50 hover:scale-105"
                      : "bg-[#DCB8DA] text-[#82007C] hover:bg-[#82007C] hover:text-white hover:scale-105"
                  }`}
                >
                  {plan.buttonText}
                </button>
                
                <div className="space-y-3 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <span className="h-6 w-6 bg-[#DCB8DA] rounded-full grid place-content-center mt-0.5 flex-shrink-0 text-[#82007C]">
                          {feature.icon}
                        </span>
                        <span className="text-sm text-gray-700 font-medium">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
