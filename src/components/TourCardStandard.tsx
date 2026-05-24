'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import RefinedChronicleButton from './RefinedChronicleButton';
import { useResponsive } from '@/hooks/use-responsive';

interface TourCardProps {
  id: string;
  title: string;
  location: string;
  description: string;
  imageSrc: string;
  price: string;
  isMobile?: boolean;
  useFixedHeight?: boolean;
}

export default function TourCardStandard({ id, title, location, description, imageSrc, price, isMobile, useFixedHeight }: TourCardProps) {
  const { isRTL, t } = useApp();
  const { width } = useResponsive();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const imageHeight = useMemo(() => {
    if (width >= 1264) return 336;
    if (width <= 980) return 280;
    const tVal = (width - 980) / (1264 - 980);
    return Math.round(280 + tVal * (336 - 280));
  }, [width]);

  const dynamicAspectRatio = useMemo(() => {
    if (useFixedHeight) return 'auto';
    if (width >= 1024) return '4.2 / 3.5';
    const minW = 600;
    const maxW = 960;
    const clampedWidth = Math.min(Math.max(width, minW), maxW);
    const progress = (clampedWidth - minW) / (maxW - minW);
    const denominator = 3.5 - (progress * 1.0);
    return `4.2 / ${denominator}`;
  }, [width, useFixedHeight]);

  const textAlignment = isMobile ? 'text-center' : isRTL ? 'text-right' : 'text-left';
  const flexAlignment = isMobile ? 'items-center' : 'items-start';

  if (!isClient) return null;

  return (
    <motion.div
      className="group bg-[#0a0a0a] border border-[#1e1e1e] flex flex-col h-full px-1"
      style={{ borderRadius: '0px' }}
      initial="initial"
      whileHover="animate"
    >
      {/* Top Content Area */}
      <div className="px-5 py-6 flex flex-col gap-6">
        <div 
          className="relative w-full overflow-hidden border border-[#1e1e1e]" 
          style={{ 
            height: useFixedHeight ? `${imageHeight}px` : 'auto',
            aspectRatio: useFixedHeight ? 'auto' : dynamicAspectRatio,
            borderRadius: '0px' 
          }}
        >
          <img
            src={imageSrc}
            alt={title}
            draggable={false}
            className="w-full h-full object-cover select-none"
          />
        </div>

        <div className={cn("flex-1 flex flex-col gap-4", flexAlignment)}>
          <div className={cn("font-headline relative", textAlignment)}>
            <h3 className={`text-2xl md:text-3xl tracking-tighter leading-none relative z-10 transition-colors duration-300 group-hover:text-white text-white ${isRTL ? '' : 'font-black'}`}>
              <span className="relative inline-block">
                <span className="relative z-10 px-1">{title}</span>
                <span 
                  className={cn(
                    "absolute inset-y-0 bg-[var(--theme-color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 -z-10",
                    isMobile ? "inset-x-0 origin-center" : (isRTL ? "right-0 -left-[1px] origin-right" : "left-0 -right-[1px] origin-left")
                  )} 
                />
              </span>
            </h3>
            <span className={cn("tracking-widest opacity-40 block mt-2", isRTL ? "text-[13px]" : "text-xs font-mono")}>
              {location}
            </span>
          </div>

          <p className={cn("text-sm leading-relaxed opacity-60 max-w-xl text-white", textAlignment)}>
            {description}
          </p>
        </div>
      </div>

      {/* Pricing Area */}
      <div className={cn(
        "mt-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-[calc(100%+8px)] bg-[#111] -mx-1",
        flexAlignment
      )}>
        <div className={cn("relative", isRTL ? "text-[13px]" : "font-mono text-xs", textAlignment)}>
          <span className="opacity-40 block mb-1">{t('fee_pp')}</span>
          <span className="font-black font-mono text-xl text-white italic relative z-10 px-1 inline-block transition-colors duration-300 group-hover:text-white">
            <span className="relative -left-[2px]">{price}</span>
            <span 
              className={cn(
                "absolute inset-y-0 bg-[var(--theme-color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 -z-10",
                isMobile ? "inset-x-0 origin-center" : (isRTL ? "right-0 -left-[1px] origin-right" : "left-0 -right-[1px] origin-left")
              )} 
            />
          </span>
        </div>

        <div className="w-full md:w-auto">
          <RefinedChronicleButton
            isRTL={isRTL}
            backgroundColor="#fff"
            textColor="#000"
            hoverBackgroundColor="var(--theme-color)"
            hoverTextColor="#fff"
            className="font-black uppercase tracking-tighter"
            borderRadius={0}
            fontSize="1.125rem"
            fontWeight={isRTL ? 600 : 900}
            padding="0.75rem 2rem"
            width={isMobile ? '100%' : 'auto'}
          >
            {t('btn_book')}
          </RefinedChronicleButton>
        </div>
      </div>
    </motion.div>
  );
}
