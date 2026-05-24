'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useResponsive } from '@/hooks/use-responsive';
import RefinedChronicleButton from '@/components/RefinedChronicleButton';
import { cn } from '@/lib/utils';
import LimitedWidthWrapper from '@/components/LimitedWidthWrapper';

export interface HeroProps {
  contentMaxWidth?: string;
}

export function Hero({ contentMaxWidth }: HeroProps) {
  const { t, isRTL, isHydrated } = useApp();
  const { isMobile } = useResponsive();

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop;
      const container = document.getElementById('page-scroll-container');
      container?.scrollTo({ top: top - 28, behavior: 'smooth' });
    }
  };

  if (!isHydrated) return null;

  if (isMobile) {
    return (
      <section className="min-h-screen h-auto w-full bg-white text-black flex flex-col justify-center py-32">
        <LimitedWidthWrapper maxWidth={contentMaxWidth || '100%'}>
          <div className="flex flex-col gap-8 mb-12">
            <h1 className="font-headline text-[15vw] leading-[0.85] font-black uppercase tracking-tighter m-0">
              {t('hero_title_1')}<br />
              <span className="hero-outline">{t('hero_title_2')}</span><br />
              <em className="not-italic bg-[var(--theme-color)] px-[3px]">{t('hero_title_3')}</em>
            </h1>
            <p className="max-w-md text-lg leading-snug font-medium italic opacity-70">
              {t('hero_lede')}
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <RefinedChronicleButton
              isRTL={isRTL}
              backgroundColor="#000"
              textColor="#fff"
              hoverBackgroundColor="var(--theme-color)"
              width="100%"
              borderRadius={0}
              onClick={() => handleNavClick('expeditions')}
            >
              {t('hero_cta')}
            </RefinedChronicleButton>
            <RefinedChronicleButton
              variant="outline"
              isRTL={isRTL}
              borderColor="#000"
              borderVisible
              textColor="#000"
              width="100%"
              borderRadius={0}
              onClick={() => handleNavClick('contact')}
            >
              {t('btn_initiate')}
            </RefinedChronicleButton>
          </div>
        </LimitedWidthWrapper>
      </section>
    );
  }

  return (
    <section 
      className="h-screen bg-white text-black overflow-hidden relative mx-auto"
      style={{ width: 'min(100vh, 1080px)' }}
    >
      <div className="absolute inset-0 z-10 pointer-events-auto flex items-center">
        <LimitedWidthWrapper maxWidth="100%">
          <div className={cn(
            "flex flex-col w-full",
            isRTL ? "items-end text-right" : "items-start text-left"
          )}>
            <h1 className="font-headline text-[12vh] leading-[0.85] font-black uppercase tracking-tighter m-0 mb-12">
              {t('hero_title_1')}<br />
              <span className="hero-outline">{t('hero_title_2')}</span><br />
              <em className="not-italic bg-[var(--theme-color)] px-[3px]">{t('hero_title_3')}</em>
            </h1>
            
            <p className="max-w-xl text-xl leading-relaxed font-medium italic opacity-70 mb-16">
              {t('hero_lede')}
            </p>

            <div className="flex gap-6 scale-110 origin-left">
              <RefinedChronicleButton
                isRTL={isRTL}
                backgroundColor="#000"
                textColor="#fff"
                hoverBackgroundColor="var(--theme-color)"
                padding="1rem 3rem"
                borderRadius={0}
                onClick={() => handleNavClick('expeditions')}
              >
                {t('hero_cta')}
              </RefinedChronicleButton>
              <RefinedChronicleButton
                variant="outline"
                isRTL={isRTL}
                borderColor="#000"
                borderVisible
                textColor="#000"
                padding="1rem 3rem"
                borderRadius={0}
                onClick={() => handleNavClick('contact')}
              >
                {t('btn_initiate')}
              </RefinedChronicleButton>
            </div>
          </div>
        </LimitedWidthWrapper>
      </div>
    </section>
  );
}
