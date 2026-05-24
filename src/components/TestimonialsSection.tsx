'use client';

import React, { useRef, useEffect, useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { useResponsive } from "@/hooks/use-responsive";
import SectionText from "@/components/SectionText";
import { CircularTestimonials } from "@/components/CircularTestimonials";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  designation: string;
  quote: string;
  src: string;
  isRTL: boolean;
  isMobile: boolean;
  isExpanded?: boolean;
  useFixedHeight?: boolean;
}

const TestimonialCard = ({ name, designation, quote, src, isRTL, isMobile, isExpanded, useFixedHeight }: TestimonialCardProps) => {
  const { width } = useResponsive();
  const textAlignment = isMobile ? 'text-center' : isRTL ? 'text-right' : 'text-left';
  const flexAlignment = isMobile ? 'items-center' : 'items-start';

  const imageHeight = useMemo(() => {
    if (width >= 1264) return 336;
    if (width <= 980) return 280;
    const tVal = (width - 980) / (1264 - 980);
    return Math.round(280 + tVal * (336 - 280));
  }, [width]);

  const dynamicAspectRatio = useMemo(() => {
    if (isExpanded || useFixedHeight) return 'auto';
    if (width >= 960) return '4.2 / 3.5';
    const minW = 600;
    const maxW = 960;
    const clampedWidth = Math.min(Math.max(width, minW), maxW);
    const progress = (clampedWidth - minW) / (maxW - minW);
    const denominator = 3.5 - (progress * 1.0);
    return `4.2 / ${denominator}`;
  }, [width, isExpanded, useFixedHeight]);

  return (
    <motion.div
      className={cn(
        "group bg-[#0a0a0a] border border-[#1e1e1e] p-6 flex flex-col gap-6 h-full",
        isExpanded && "md:col-span-2"
      )}
      style={{ borderRadius: '0px' }}
      initial="initial"
      whileHover="animate"
    >
      <div 
        className="relative w-full overflow-hidden border border-[#1e1e1e]" 
        style={{ 
          height: (isExpanded || useFixedHeight) ? `${imageHeight}px` : 'auto',
          aspectRatio: (isExpanded || useFixedHeight) ? 'auto' : dynamicAspectRatio,
          borderRadius: '0px' 
        }}
      >
        <img
          src={src}
          alt={name}
          draggable={false}
          className="w-full h-full object-cover select-none"
        />
      </div>

      <div className={cn("flex-1 flex flex-col gap-4", flexAlignment)}>
        <div className={cn("font-headline relative", textAlignment)}>
          <h3 className="text-xl md:text-2xl font-black tracking-tighter leading-none relative z-10 transition-colors duration-300 group-hover:text-white text-white">
            <span className="relative inline-block">
              <span className="relative z-10 px-1">{name}</span>
              <span 
                className={cn(
                  "absolute inset-y-0 bg-[var(--theme-color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 -z-10",
                  isMobile ? "inset-x-0 origin-center" : (isRTL ? "right-0 -left-[1px] origin-right" : "left-0 -right-[1px] origin-left")
                )} 
              />
            </span>
          </h3>
          <span className="font-mono text-xs tracking-widest opacity-40 block mt-2 text-white">
            {designation}
          </span>
        </div>

        <p className={cn("text-sm italic leading-relaxed opacity-60 text-white", textAlignment, isExpanded && "max-w-3xl")}>
          {quote}
        </p>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  const { t, isRTL, dictionary } = useApp();
  const { width: windowWidth, isMobile, isOneCol, isTwoCol } = useResponsive();

  const sectionRef = useRef<HTMLElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState(0);

  const lerp = (x: number, x0: number, x1: number, y0: number, y1: number): number => {
    return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
  };

  const WIDTH_MAX = 1352;
  const WIDTH_MIN = 1174;

  const STYLES_MAX = {
    gap: 4.9,
    imageWidth: 77.3,
    imageContainerTranslateX: 76,
    testimonialTextTranslateY: 56,
    arrowContainerTranslateY: 325,
    mb: 164,
  };

  const STYLES_MIN = {
    gap: 4.4,
    imageWidth: 78,
    imageContainerTranslateX: 64,
    testimonialTextTranslateY: 19,
    arrowContainerTranslateY: 349,
    mb: 92,
  };

  const dynamicStyles = {
    gap: `${lerp(elementWidth, WIDTH_MIN, WIDTH_MAX, STYLES_MIN.gap, STYLES_MAX.gap).toFixed(2)}rem`,
    imageWidth: `${lerp(elementWidth, WIDTH_MIN, WIDTH_MAX, STYLES_MIN.imageWidth, STYLES_MAX.imageWidth).toFixed(2)}%`,
    imageContainerTranslateX: `${lerp(elementWidth, WIDTH_MIN, WIDTH_MAX, STYLES_MIN.imageContainerTranslateX, STYLES_MAX.imageContainerTranslateX).toFixed(2)}px`,
    testimonialTextTranslateY: `${lerp(elementWidth, WIDTH_MIN, WIDTH_MAX, STYLES_MIN.testimonialTextTranslateY, STYLES_MAX.testimonialTextTranslateY).toFixed(2)}px`,
    arrowContainerTranslateY: `${lerp(elementWidth, WIDTH_MIN, WIDTH_MAX, STYLES_MIN.arrowContainerTranslateY, STYLES_MAX.arrowContainerTranslateY).toFixed(2)}px`,
    mb: `${lerp(elementWidth, WIDTH_MIN, WIDTH_MAX, STYLES_MIN.mb, STYLES_MAX.mb).toFixed(2)}px`,
  };

  const testimonials = useMemo(() => {
    return (dictionary.testimonials || []).map((test) => ({
      ...test,
      src: test.src,
    }));
  }, [dictionary.testimonials]);

  useEffect(() => {
    if (!measureRef.current) return;
    const updateWidth = () => {
      const width = measureRef.current?.getBoundingClientRect().width || 0;
      setElementWidth(width);
    };
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(measureRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const showCircular = windowWidth >= 1196;
  const isOdd = testimonials.length % 2 !== 0;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={cn(
        "relative overflow-hidden flex flex-col transition duration-300 ease-in-out scroll-mt-[28px]",
        "py-16 px-0" // Standardized py-16 for scroll parity
      )}
    >
      <div className="max-w-[2048px] mx-auto w-full">
        <SectionText
          title={t("testimonials_title")}
          description={t("testimonials_subtitle")}
          isRTL={isRTL}
        />

        <div
          className="mt-[18px]"
          style={{ marginBottom: isMobile ? '40px' : (showCircular ? dynamicStyles.mb : '64px') }}
          ref={measureRef}
        >
          {showCircular ? (
            <CircularTestimonials
              testimonials={testimonials}
              autoplay={true}
              autoplayInterval={5000}
              gap={dynamicStyles.gap}
              imageWidth={dynamicStyles.imageWidth}
              imageContainerTranslateX={dynamicStyles.imageContainerTranslateX}
              testimonialTextTranslateY={dynamicStyles.testimonialTextTranslateY}
              arrowContainerTranslateY={dynamicStyles.arrowContainerTranslateY}
              isRTL={isRTL}
            />
          ) : (
            <div 
              style={{
                display: 'grid',
                gap: isMobile ? '0.75rem' : '1.5rem',
                gridTemplateColumns: isOneCol ? '1fr' : isTwoCol ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              }}
            >
              {testimonials.map((testimonial, idx) => {
                const isLast = idx === testimonials.length - 1;
                const isExpanded = isTwoCol && isOdd && isLast;

                return (
                  <TestimonialCard 
                    key={testimonial.id}
                    name={testimonial.name}
                    designation={testimonial.designation}
                    quote={testimonial.quote}
                    src={testimonial.src}
                    isRTL={isRTL}
                    isMobile={isMobile}
                    isExpanded={isExpanded}
                    useFixedHeight={isTwoCol}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}