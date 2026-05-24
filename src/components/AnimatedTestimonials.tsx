"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from '@/context/AppContext';
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type AnimatedTestimonialsProps = {
  testimonials: Testimonial[];
  autoplay?: boolean;
  isRTL?: boolean;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  isRTL = false,
}: AnimatedTestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const [componentWidth, setComponentWidth] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const { t, lang } = useApp();

  const componentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const designationRef = useRef<HTMLParagraphElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

  const updateTestimonial = useCallback(
    (dir: number) => {
      setDirection(dir);
      setActiveIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
    },
    [testimonials.length]
  );

  const handleNext = () => {
    updateTestimonial(1);
    stopAutoplay();
    setUserInteracted(true);
  };
  const handlePrev = () => {
    updateTestimonial(-1);
    stopAutoplay();
    setUserInteracted(true);
  };
  const isActive = (index: number) => index === activeIndex;

  const stopAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, []);

  useEffect(() => {
    if (autoplay && !userInteracted) {
      autoplayIntervalRef.current = setInterval(() => updateTestimonial(1), 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, updateTestimonial, userInteracted]);

  const handleResize = useCallback(() => {
    if (componentRef.current) {
      setComponentWidth(componentRef.current.offsetWidth);
      setIsMobileView(componentRef.current.offsetWidth < 1024);
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    if (componentRef.current) resizeObserver.observe(componentRef.current);
    handleResize();
    return () => {
      if (componentRef.current) resizeObserver.unobserve(componentRef.current);
    };
  }, [handleResize]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  const calculateGap = (width: number) => {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + ((maxGap - minGap) * (width - minWidth)) / (maxWidth - minWidth);
  };

  const wrapLines = (element: HTMLElement, text: string) => {
    element.innerHTML = "";
    const parent = document.createElement("div");
    parent.classList.add("split-parent");
    const child = document.createElement("div");
    child.classList.add("split-child");
    child.textContent = text;
    parent.appendChild(child);
    element.appendChild(parent);
    return child;
  };

  const animateNameAndDesignation = useCallback(() => {
    if (!nameRef.current || !designationRef.current) return;
    const nameChild = wrapLines(nameRef.current, activeTestimonial.name);
    const designationChild = wrapLines(designationRef.current, activeTestimonial.designation);
    const fromY = direction === 1 ? -100 : 100;
    gsap.fromTo(nameChild, { yPercent: fromY, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out" });
    gsap.fromTo(designationChild, { yPercent: fromY, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.05 });
  }, [activeTestimonial, direction]);

  useEffect(() => {
    animateNameAndDesignation();
  }, [activeTestimonial, animateNameAndDesignation]);

  const arrowButtonStyle = "group bg-[#0a0a0a] border border-[#1e1e1e] flex items-center justify-center cursor-pointer relative overflow-hidden w-10 h-10";

  return (
    <div
      ref={componentRef}
      className="w-full mx-auto antialiased"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <div
        className="relative"
        style={{
          display: "grid",
          gridTemplateColumns: isMobileView ? "1fr" : "1fr 1fr",
          gap: `${calculateGap(componentWidth)}px`,
        }}
      >
        <div className="w-full">
          <div className="relative" style={{ paddingTop: '100%' }}>
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full rounded-none object-cover object-center border border-[#1e1e1e]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4 w-full">
          <div>
            <h3
              ref={nameRef}
              className={`font-headlin etracking-tighter text-xl md:text-2xl mb-2 leading-none ${lang === 'he' ? '' : 'font-black'}`}
              style={{ color: 'var(--foreground)', textAlign: isRTL ? "right" : "left" }}
            ></h3>
            <p
              ref={designationRef}
              className={`mb-8 ${lang === 'he' ? 'text-[15px]' : 'designation font-mono tracking-widest text-xs'}`}
              style={{ color: 'var(--sub-foreground)', textAlign: isRTL ? "right" : "left" }}
            ></p>
            <motion.p
              key={activeIndex}
              className="italic font-headline"
              style={{ 
                color: '#aaaaaa', 
                textAlign: isRTL ? "right" : "left", 
                lineHeight: 1.75,
                fontSize: '1.125rem'
              }}
            >
              {activeTestimonial.quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </div>
          <div className={cn("flex gap-4 w-full", isMobileView ? "pt-12" : "md:pt-0")}>
            <button 
              onClick={handlePrev} 
              className={arrowButtonStyle} 
              style={{ borderRadius: '0px' }}
            >
              <span className="relative z-10 p-0 flex items-center justify-center">
                {isRTL ? <ArrowRight size={20} color="#fff" /> : <ArrowLeft size={20} color="#fff" />}
              </span>
              <span className={cn(
                "absolute inset-0 bg-[#00A7FA] scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                isRTL ? "origin-left" : "origin-right"
              )} />
            </button>
            <button 
              onClick={handleNext} 
              className={arrowButtonStyle} 
              style={{ borderRadius: '0px' }}
            >
              <span className="relative z-10 p-0 flex items-center justify-center">
                {isRTL ? <ArrowLeft size={20} color="#fff" /> : <ArrowRight size={20} color="#fff" />}
              </span>
              <span className={cn(
                "absolute inset-0 bg-[#00A7FA] scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                isRTL ? "origin-right" : "origin-left"
              )} />
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .split-parent { overflow: hidden; }
        .split-child { display: inline-block; }
      `}</style>
    </div>
  );
};

export default AnimatedTestimonials;
