'use client';

import { motion, useInView, Variants } from "motion/react";
import { useRef, ElementType, ReactNode, RefObject } from "react";

interface TimelineContentProps<T extends ElementType = "div"> {
  as?: T;
  children: ReactNode;
  animationNum: number;
  timelineRef: RefObject<HTMLElement>;
  customVariants?: Variants;
  className?: string;
  [key: string]: any;
}

export function TimelineContent<T extends ElementType = "div">({
  as,
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  ...props
}: TimelineContentProps<T>) {
  const Component = (as || motion.div) as any;
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const defaultVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 20,
      opacity: 0,
    },
  };

  const variants = customVariants || defaultVariants;

  return (
    <Component
      ref={ref}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
