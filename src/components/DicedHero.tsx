'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import RefinedChronicleButton from '@/components/RefinedChronicleButton';
import { cn } from '@/lib/utils';
import LimitedWidthWrapper from '@/components/LimitedWidthWrapper';

interface DicedHeroProps {
  contentMaxWidth?: string;
  outerRadius?: number;
  innerRadius?: number;
  warpedSize?: number;
}

export function DicedHero({ 
  contentMaxWidth, 
  outerRadius = 12.5, 
  innerRadius = 24,
  warpedSize = 22 
}: DicedHeroProps) {
  const { t, isRTL, dictionary } = useApp();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 1080);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 1280 || windowHeight < 704;
  const isSmall = windowWidth < 576;
  const isVerySmall = windowWidth < 400;

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    const container = document.getElementById('page-scroll-container');
    if (element && container) {
      let offsetTop = 0;
      let curr = element;
      while (curr && curr !== container) {
        offsetTop += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement;
      }
      container.scrollTo({ top: offsetTop - 28, behavior: 'smooth' });
    }
  };

  const sliders = [
    { title: "Pollock Pines", image: "/emily-karakis-HlJSzoWNhPY-unsplash.webp" },
    { title: "French Alps", image: "/marek-piwnicki-OXKmcihJgEE-unsplash.webp" },
    { title: "Kings Canyon", image: "/matt-artz-nTRDnDdDYk8-unsplash.webp" },
    { title: "Val Rendena", image: "/cristina-gottardi-Of1jWtdnQCY-unsplash.webp" },
  ] as const;

  const RTLsliders = [
    { title: "Kings Canyon", image: "/matt-artz-nTRDnDdDYk8-unsplash.webp" },
    { title: "Yosemite Valley", image: "/griffin-wooldridge-AlfcpJS7OLw-unsplash.webp" },
    { title: "French Alps", image: "/marek-piwnicki-OXKmcihJgEE-unsplash.webp" },
    { title: "Pollock Pines", image: "/emily-karakis-HlJSzoWNhPY-unsplash.webp" },

  ] as const;

  // Inside your component:
  const slides = useMemo(() => {
    return isRTL ? RTLsliders : sliders;
  }, []);

  const slideClasses = useMemo(() => {
    // Correctly swap mask classes for RTL mirroring
    return isRTL 
      ? ['bottom-left', 'bottom-right', 'top-left', 'top-right'] 
      : ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
  }, [isRTL]);

  if (!slides.length) return null;

  return (
    <section 
      className={cn(
        "bg-white text-black overflow-hidden relative w-full p-0 flex flex-col justify-center",
        !isMobile ? "h-[min(100vh,1080px)]" : "h-auto py-20"
      )}
      style={{
        '--hero-outer-radius': `${outerRadius.toFixed(2)}px`,
        '--hero-inner-radius': `${innerRadius.toFixed(2)}px`,
        '--hero-warped-size': `${warpedSize.toFixed(2)}px`,
      } as React.CSSProperties}
    >
      <LimitedWidthWrapper maxWidth={contentMaxWidth || '100%'} paddingDesktop="0" paddingMobile="0.75rem">
        <div 
          ref={containerRef}
          className={cn(
            "flex w-full items-center justify-center",
            isMobile ? "flex-col" : "flex-row"
          )}
        >
          {/* Content Column */}
          <div className={cn(
            "flex-1 flex flex-col justify-center z-10 w-full",
            isMobile ? "items-center text-center pb-12" : "items-start text-start"
          )}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`font-headline text-5xl md:text-6xl lg:text-[6.2rem] uppercase tracking-tighter leading-[0.85] mb-12 ${isRTL ? 'font-semibold' : 'font-black'}`}
            >
              {t('hero_title')}
            </motion.h1>

            <motion.hr
              initial={{ width: 0 }}
              animate={{ width: '6.25rem' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                "h-1 border-none bg-[var(--theme-color)] mb-12",
                isMobile ? "mx-auto" : ""
              )}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-xl text-[17px] md:text-[19.8px] leading-relaxed font-body font-medium italic mb-16 opacity-55"
              style={{ color: '#1e1e1e' }}
            >
              {t('hero_lede')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full lg:w-auto"
            >
              <RefinedChronicleButton
                isRTL={isRTL}
                backgroundColor="#000"
                textColor="#fff"
                hoverBackgroundColor="var(--theme-color)"
                borderRadius={0}
                onClick={() => handleNavClick('expeditions')}
                width="100%"
                className={cn(
                  "lg:w-auto",
                  !isMobile ? "scale-110" : "",
                  !isMobile && (isRTL ? "origin-right" : "origin-left")
                )}
                padding="1rem 3.5rem"
              >
                {t('hero_cta')}
              </RefinedChronicleButton>
            </motion.div>
          </div>

          {/* Image Grid Column */}
          <div className={cn(
            "flex-1 relative w-full",
            isMobile ? "px-0" : "max-w-[50%]",
            !isMobile && (isRTL ? "mr-16" : "ml-16")
          )}>
            {isVerySmall ? (
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                  src={slides[3].image}
                  alt={slides[3].title}
                  className="w-full h-full object-cover pointer-events-auto"
                />
              </div>
            ) : isSmall ? (
              <div className="grid grid-cols-2 gap-3 w-full aspect-[2/1]">
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={slides[3].image}
                    alt={slides[3].title}
                    className="w-full h-full object-cover pointer-events-auto"
                  />
                </div>
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={slides[2].image}
                    alt={slides[2].title}
                    className="w-full h-full object-cover pointer-events-auto"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5 w-full aspect-square">
                {[slides[3], slides[2], slides[1], slides[0]].map((slide, index) => (
                  <div 
                    key={index} 
                    className="relative w-full pb-[100%] overflow-hidden" 
                    style={{ borderRadius: 'var(--hero-outer-radius)' }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className={cn(
                        "warped-image absolute inset-0 w-full h-full object-cover pointer-events-auto",
                        slideClasses[index]
                      )}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </LimitedWidthWrapper>
    </section>
  );
}