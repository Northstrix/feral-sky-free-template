'use client';

import React, { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { useResponsive } from '@/hooks/use-responsive';
import SectionText from '@/components/SectionText';
import { AnimatedTestimonials } from '@/components/AnimatedTestimonials';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GuideCardProps {
  name: string;
  designation: string;
  quote: string;
  src: string;
  isRTL: boolean;
  isMobile: boolean;
  isExpanded?: boolean;
  useFixedHeight?: boolean;
}

const GuideCard = ({ name, designation, quote, src, isRTL, isMobile, isExpanded, useFixedHeight }: GuideCardProps) => {
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

export default function GuidesSection() {
  const { dictionary, isRTL, t } = useApp();
  const { width: windowWidth, isOneCol, isTwoCol, isMobile } = useResponsive();

  const guides = dictionary.guides;
  const showAnimated = windowWidth >= 1280;
  const isOdd = guides.length % 2 !== 0;

  return (
    <section id="guides" className="py-16 scroll-mt-[28px]">
      <div className="max-w-[2048px] mx-auto">
        <SectionText title={t('guides_title')} description={t('guides_subtitle')} isRTL={isRTL} />
        
        {showAnimated ? (
          <AnimatedTestimonials testimonials={guides} isRTL={isRTL} autoplay={true} />
        ) : (
          <div 
            style={{
              display: 'grid',
              gap: isMobile ? '0.75rem' : '1.5rem',
              gridTemplateColumns: isOneCol ? '1fr' : isTwoCol ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            }}
          >
            {guides.map((guide, idx) => {
              const isLast = idx === guides.length - 1;
              const isExpanded = isTwoCol && isOdd && isLast;

              return (
                <GuideCard 
                  key={guide.name}
                  name={guide.name}
                  designation={guide.designation}
                  quote={guide.quote}
                  src={guide.src}
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
    </section>
  );
}