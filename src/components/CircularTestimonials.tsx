'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from '@/context/AppContext';
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
  isRTL?: boolean;
  gap?: string;
  imageWidth?: string;
  imageContainerTranslateX?: string;
  testimonialTextTranslateY?: string;
  arrowContainerTranslateY?: string;
  imageContainerPerspective?: string;
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  autoplayInterval = 5000,
  isRTL = false,
  gap = "4.7rem",
  imageWidth = "77%",
  imageContainerTranslateX = "76px",
  testimonialTextTranslateY = "56px",
  arrowContainerTranslateY = "99px",
  imageContainerPerspective = "1000px",
}: CircularTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoplayActive, setIsAutoplayActive] = useState(autoplay);
  const { t, lang } = useApp();

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const designationRef = useRef<HTMLParagraphElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonialsLength = testimonials.length;
  const activeTestimonial = testimonials[activeIndex];

  const calculateGap = useCallback((width: number) => {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + ((maxGap - minGap) * (width - minWidth)) / (maxWidth - minWidth);
  }, []);

  const updateTestimonial = useCallback((dir: number) => {
    setDirection(dir);
    setActiveIndex(prev => (prev + dir + testimonialsLength) % testimonialsLength);
  }, [testimonialsLength]);

  const stopAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
    setIsAutoplayActive(false);
  }, []);

  const handleNext = useCallback(() => {
    updateTestimonial(1);
    stopAutoplay();
  }, [updateTestimonial, stopAutoplay]);

  const handlePrev = useCallback(() => {
    updateTestimonial(-1);
    stopAutoplay();
  }, [updateTestimonial, stopAutoplay]);

  const animateImages = useCallback(() => {
    if (!imageContainerRef.current) return;
    const containerWidth = imageContainerRef.current.offsetWidth;
    const gapValue = calculateGap(containerWidth);
    const maxStickUp = gapValue * 0.8;

    testimonials.forEach((_, index) => {
      const img = imageContainerRef.current!.querySelector(`[data-index="${index}"]`) as HTMLElement;
      if (!img) return;

      let offset = index - activeIndex;
      if (isRTL) offset = -offset;
      if (offset > testimonialsLength / 2) offset -= testimonialsLength;
      if (offset < -testimonialsLength / 2) offset += testimonialsLength;

      const zIndex = testimonialsLength - Math.abs(offset);
      const opacity = offset === 0 ? 1 : 0.7;
      const scale = offset === 0 ? 1 : 0.85;

      let translateX = "0%";
      let translateY = "0%";
      let rotateY = 0;

      if (offset > 0) {
        translateX = "20%";
        translateY = `-${(maxStickUp / img.offsetHeight) * 100}%`;
        rotateY = -15;
      } else if (offset < 0) {
        translateX = "-20%";
        translateY = `-${(maxStickUp / img.offsetHeight) * 100}%`;
        rotateY = 15;
      }

      gsap.to(img, {
        zIndex,
        opacity,
        scale,
        x: translateX,
        y: translateY,
        rotateY,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }, [activeIndex, calculateGap, testimonials, testimonialsLength, isRTL]);

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
    animateImages();
    animateNameAndDesignation();
  }, [activeIndex, animateImages, animateNameAndDesignation]);

  useEffect(() => {
    if (isAutoplayActive) {
      autoplayIntervalRef.current = setInterval(() => updateTestimonial(1), autoplayInterval);
    }
    const handleResize = () => animateImages();
    window.addEventListener("resize", handleResize);
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
      window.removeEventListener("resize", handleResize);
      gsap.killTweensOf("[data-index]");
    };
  }, [isAutoplayActive, autoplayInterval, updateTestimonial, animateImages]);

  const imageContainerTransform = useMemo(() => {
    const match = imageContainerTranslateX.match(/-?\d+(\.\d+)?/);
    if (!match) return imageContainerTranslateX;
    const num = parseFloat(match[0]);
    const unit = imageContainerTranslateX.replace(match[0], "");
    const final = isRTL ? -num : num;
    return `${final}${unit}`;
  }, [isRTL, imageContainerTranslateX]);

  const arrowButtonStyle = "group bg-[#0a0a0a] border border-[#1e1e1e] flex items-center justify-center cursor-pointer relative overflow-hidden w-10 h-10";

  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <div className="testimonial-container">
        <div className="testimonial-grid">
          <div className="image-container" ref={imageContainerRef} style={{ transform: `translateX(${imageContainerTransform})` }}>
            {testimonials.map((testimonial, index) => (
              <img
                key={testimonial.id}
                src={testimonial.src}
                alt={testimonial.name}
                className="testimonial-image"
                data-index={index}
                style={{
                  opacity: index === activeIndex ? 1 : 0.7,
                  zIndex: testimonialsLength - Math.abs(index - activeIndex),
                  border: `1px solid #1e1e1e`,
                  borderRadius: '0px',
                  transition: "opacity 0.3s ease",
                }}
                loading="lazy"
              />
            ))}
          </div>
          <div className="testimonial-content" style={{ transform: `translateY(${testimonialTextTranslateY})` }}>
            <div>
            <h3
              ref={nameRef}
              className={`font-headline tracking-tighter text-xl md:text-2xl mb-2 leading-none ${lang === 'he' ? '' : 'font-black'}`}
              style={{ color: 'var(--foreground)', textAlign: isRTL ? "right" : "left" }}
            ></h3>
            <p
              ref={designationRef}
              className={`mb-8 ${lang === 'he' ? 'text-[15px]' : 'designation font-mono tracking-widest text-xs'}`}
              style={{ color: 'var(--sub-foreground)', textAlign: isRTL ? "right" : "left" }}
            ></p>
              <motion.p key={activeTestimonial.id} className="quote italic font-headline" style={{ color: '#aaaaaa', fontSize: '1.125rem', lineHeight: 1.75 }}>
                {activeTestimonial.quote.split(" ").map((word, index) => (
                  <motion.span key={index} initial={{ filter: "blur(10px)", opacity: 0, y: 5 }} animate={{ filter: "blur(0px)", opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }} className="inline-block">{word}&nbsp;</motion.span>
                ))}
              </motion.p>
            </div>
            <div className="arrow-buttons" style={{ top: arrowContainerTranslateY, position: "absolute", display: 'flex', gap: '16px' }}>
              <button 
                onClick={handlePrev} 
                className={arrowButtonStyle} 
                style={{ borderRadius: '0px' }}
              >
                <span className="relative z-10 p-0 flex items-center justify-center">
                  {isRTL ? <ArrowRight size={20} color="#fff" /> : <ArrowLeft size={20} color="#fff" />}
                </span>
                <span className={cn(
                  "absolute inset-0 bg-[var(--theme-color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
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
                  "absolute inset-0 bg-[var(--theme-color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                  isRTL ? "origin-right" : "origin-left"
                )} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .testimonial-container { width: 100%; min-height: 336px; }
        .testimonial-grid { display: grid; gap: ${gap}; }
        .image-container { position: relative; perspective: ${imageContainerPerspective}; }
        .testimonial-image { position: absolute; width: ${imageWidth}; height: auto; aspect-ratio: 1/1; object-fit: cover; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
        .testimonial-content { display: flex; flex-direction: column; justify-content: space-between; position: relative; }
        .split-parent { overflow: hidden; }
        .split-child { display: inline-block; }
        @media (min-width: 768px) { .testimonial-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </div>
  );
}

export default CircularTestimonials;
