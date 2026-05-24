'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import CustomizedTruncatingNavbar from '@/components/CustomizedTruncatingNavbar';
import { MosaicGrid } from '@/components/MosaicGrid';
import { LanguageSelector, LanguageSelectorHandle } from '@/components/LanguageSelector';
import { FloatingLabelInput } from '@/components/FloatingLabelInput';
import RefinedChronicleButton from '@/components/RefinedChronicleButton';
import SectionText, { SectionTextSizes } from '@/components/SectionText';
import { cn } from '@/lib/utils';
import { ShimmerAccordion } from '@/components/ShimmerAccordion';
import { Footer } from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';
import GuidesSection from '@/components/GuidesSection';
import { DicedHero } from '@/components/DicedHero';
import LimitedWidthWrapper from '@/components/LimitedWidthWrapper';
import CreditModal from '@/components/CreditModal';
import DisclaimerModal from '@/components/DisclaimerModal';
import { AnimatePresence } from 'framer-motion';

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const languageSelectorRef = useRef<LanguageSelectorHandle>(null);
  const { t, dictionary, isRTL, isHydrated } = useApp();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 900);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  
  // Typographic sync state
  const [standardSectionSizes, setStandardSectionSizes] = useState<SectionTextSizes | undefined>(undefined);

  // Confirmed Content Width Values
  const confirmedValues = {
    heightMin: 800,
    heightMax: 1080,
    widthMin: 1306,
    widthMax: 1864,
    paddingDesktop: 60,
    navbarAdjustment: 0
  };

  // Final Calibration Values
  const warpValues = {
    outerRMin: 12.5,
    outerRMax: 40,
    innerRMin: 24,
    innerRMax: 40,
    sMin: 22,
    sMax: 40
  };

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const interpolationFactor = useMemo(() => {
    return Math.max(0, Math.min(1, (windowHeight - confirmedValues.heightMin) / (confirmedValues.heightMax - confirmedValues.heightMin)));
  }, [windowHeight, confirmedValues.heightMin, confirmedValues.heightMax]);

  const contentMaxWidth = useMemo(() => {
    const rawWidth = lerp(confirmedValues.widthMin, confirmedValues.widthMax, interpolationFactor);
    const evenWidth = Math.floor(rawWidth / 2) * 2;
    return `${evenWidth}px`;
  }, [interpolationFactor, confirmedValues.widthMin, confirmedValues.widthMax]);

  const currentOuterR = useMemo(() => {
    return lerp(warpValues.outerRMin, warpValues.outerRMax, interpolationFactor);
  }, [interpolationFactor, warpValues.outerRMin, warpValues.outerRMax]);

  const currentInnerR = useMemo(() => {
    return lerp(warpValues.innerRMin, warpValues.innerRMax, interpolationFactor);
  }, [interpolationFactor, warpValues.innerRMin, warpValues.innerRMax]);

  const currentWarpSize = useMemo(() => {
    return lerp(warpValues.sMin, warpValues.sMax, interpolationFactor);
  }, [interpolationFactor, warpValues.sMin, warpValues.sMax]);

  const faqItems = useMemo(() => [
    { id: 'faq-1', title: t('faq_q1'), content: t('faq_a1'), isRTL },
    { id: 'faq-2', title: t('faq_q2'), content: t('faq_a2'), isRTL },
    { id: 'faq-3', title: t('faq_q3'), content: t('faq_a3'), isRTL },
    { id: 'faq-4', title: t('faq_q4'), content: t('faq_a4'), isRTL },
    { id: 'faq-5', title: t('faq_q5'), content: t('faq_a5'), isRTL }
  ], [isRTL, t]);

  const handleNavClick = (id: string) => {
    if (id === 'home') {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      let offsetTop = 0;
      let curr = element;
      while (curr && curr !== scrollContainerRef.current) {
        offsetTop += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement;
      }
      scrollContainerRef.current.scrollTo({ top: offsetTop - 28, behavior: 'smooth' });
    }
  };

  const shimmerStops = useMemo(() => {
    if (isRTL) {
      return [
        { color: '#FA00A7', spread: 3 },
        { color: '#D000FA', spread: 8 },
        { color: '#00A7FA', spread: 14 },
      ];
    }
    return [
      { color: '#D000FA', spread: 20 },
      { color: '#00A7FA', spread: 35 },
    ];
  }, [isRTL]);

  const desktopPaddingValue = `${confirmedValues.paddingDesktop}px`;

  if (!isHydrated || !isMounted) return null;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-black">
      <div 
        id="page-scroll-container" 
        ref={scrollContainerRef}
        className={cn(
          "flex-grow w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth relative",
          showDisclaimer && "pointer-events-none"
        )}
      >
        <div className="sticky top-0 z-[1000] w-full pointer-events-none">
          <LimitedWidthWrapper maxWidth={contentMaxWidth} paddingDesktop="27px">
            <div className="pointer-events-auto">
              <CustomizedTruncatingNavbar 
                scrollContainerRef={scrollContainerRef} 
                onLanguageClick={() => languageSelectorRef.current?.open()}
                onNavClick={handleNavClick}
                contentMaxWidth={contentMaxWidth}
                navbarAdjustment={confirmedValues.navbarAdjustment}
              />
            </div>
          </LimitedWidthWrapper>
        </div>

        <main className="flex-1">
          <section id="home">
            <DicedHero 
              contentMaxWidth={contentMaxWidth} 
              outerRadius={currentOuterR}
              innerRadius={currentInnerR}
              warpedSize={currentWarpSize}
            />
          </section>

          <div className="bg-[#0a0a0a] text-white py-4 overflow-hidden border-b border-[#1e1e1e]">
            <div className={cn(
              "marquee-track font-headline uppercase text-2xl gap-12",
              isRTL ? "marquee-track-rtl font-semibold" : "font-black"
            )}>
              {[...Array(6)].map((_, i) => (
                <React.Fragment key={i}>
                  {dictionary.tours.map((tour, tIdx) => (
                    <React.Fragment key={`${i}-${tIdx}`}>
                      <span>{tour.name}</span>
                      <span className="text-[var(--theme-color)]">●</span>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className='h-[28px] bg-black'></div>

          <div className="dark-app bg-black text-white">
            <LimitedWidthWrapper maxWidth={contentMaxWidth} paddingDesktop={desktopPaddingValue}>
              <MosaicGrid />
              <GuidesSection />
              <TestimonialsSection />

              <section id="faq" className="py-16 scroll-mt-[28px]">
                <SectionText 
                  title={t('faq_title')} 
                  description={t('faq_subtitle')} 
                  isRTL={isRTL} 
                  onSizeChange={setStandardSectionSizes}
                />
                <ShimmerAccordion 
                  componentId="faq-accordion"
                  items={faqItems} 
                  globalIsRTL={isRTL} 
                  cps={isRTL ? 70 : 50}
                  stops={shimmerStops}
                  containerBg="#0a0a0a"
                  contentAreaBg="#111"
                  separatorColor="#1e1e1e"
                  titleColor="#fff"
                  paddingX="1.5rem"
                  paddingY="1.5rem"
                  globalTitleFontWeight={isRTL ? 600 : 900}
                />
              </section>

              <section id="about" className="py-16 scroll-mt-[28px]">
                <div className="grid lg:grid-cols-2 gap-16">
                  <div className={cn(windowWidth < 1024 && "text-center")}>
                    <SectionText 
                      title={t('nav_about')} 
                      description={t('about_subtitle')} 
                      isRTL={isRTL} 
                      manualSizes={standardSectionSizes}
                    />
                    <div className={cn(
                      "space-y-4 font-mono text-xs uppercase",
                      windowWidth < 1024 ? "text-center" : (isRTL ? "text-right" : "text-left")
                    )}>
                       <p className="mb-8 leading-relaxed opacity-60 normal-case font-body text-base">
                         {t('about_desc')}
                       </p>
                       <div className={cn("flex border-b border-[#1e1e1e] pb-2", windowWidth < 1024 ? "flex-col gap-1 items-center" : "justify-between")}>
                         <span>{t('phone')}:</span>
                         <div className={cn("flex", windowWidth < 1024 && "justify-center")}>
                           <span dir="ltr" style={{ color: "#666" }}>+1 234 567 8901</span>
                         </div>
                       </div>
                       <div className={cn("flex border-b border-[#1e1e1e] pb-2", windowWidth < 1024 ? "flex-col gap-1 items-center" : "justify-between")}>
                         <span>{t('email')}:</span>
                         <div className={cn("flex", windowWidth < 1024 && "justify-center")}>
                           <span style={{ color: "#666" }}>operations@feralsky.com</span>
                         </div>
                       </div>
                       {windowWidth >= 480 && (
                         <div className={cn("flex border-b border-[#1e1e1e] pb-2", windowWidth < 1024 ? "flex-col gap-1 items-center" : "justify-between")}>
                           <span>{t('address_label')}:</span>
                           <div className={cn("flex", windowWidth < 1024 && "justify-center")}>
                             <span style={{ color: "#666" }}>{t('address_line1')} {t('address_line2')} {t('address_line3')}</span>
                           </div>
                         </div>
                       )}
                    </div>
                  </div>

                  <form id="contact" className="space-y-8 bg-[#0a0a0a] p-6 border border-[#1e1e1e]" style={{ borderRadius: '0px' }}>
                    <SectionText 
                      title={t('contact_title')} 
                      description={t('contact_subtitle')} 
                      isRTL={isRTL} 
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FloatingLabelInput 
                        label={t('label_name')} 
                        value={name} 
                        onValueChange={setName} 
                        parentBackground="#050505"
                        inputBackground="#111"
                        foregroundColor="#fff"
                        accentColor="#00A7FA"
                        inputOutlineColor="#1e1e1e"
                        inputFocusOutlineColor="#fff"
                        inputFontSize="0.875rem"
                      />
                      <FloatingLabelInput 
                        label={t('label_email')} 
                        type="email" 
                        value={email} 
                        onValueChange={setEmail} 
                        parentBackground="#050505"
                        inputBackground="#111"
                        foregroundColor="#fff"
                        accentColor="#00A7FA"
                        inputOutlineColor="#1e1e1e"
                        inputFocusOutlineColor="#fff"
                        inputFontSize="0.875rem"
                      />
                    </div>
                    <FloatingLabelInput 
                      label={t('label_mission')} 
                      textarea 
                      value={message} 
                      onValueChange={setMessage} 
                      parentBackground="#050505"
                      inputBackground="#111"
                      foregroundColor="#fff"
                      accentColor="#00A7FA"
                      inputOutlineColor="#1e1e1e"
                      inputFocusOutlineColor="#fff"
                      inputFontSize="0.875rem"
                    />
                    <RefinedChronicleButton 
                      isRTL={isRTL}
                      width="100%" 
                      backgroundColor="#fff" 
                      textColor="#000" 
                      hoverBackgroundColor="#00A7FA" 
                      hoverTextColor="#fff"
                      fontSize="1.125rem"
                      fontWeight={900}
                      borderRadius={0}
                    >
                      {t('btn_initiate')}
                    </RefinedChronicleButton>
                  </form>
                </div>
              </section>
            </LimitedWidthWrapper>

            <div className="w-full border-t border-[#1e1e1e]" />

            <LimitedWidthWrapper maxWidth={contentMaxWidth} paddingDesktop={desktopPaddingValue}>
              <Footer onNavClick={handleNavClick} onCreditClick={() => setIsCreditModalOpen(true)} scrollContainerRef={scrollContainerRef} />
            </LimitedWidthWrapper>
          </div>
        </main>
      </div>
      
      <LanguageSelector ref={languageSelectorRef} />
      <CreditModal isOpen={isCreditModalOpen} onClose={() => setIsCreditModalOpen(false)} />
      
      <AnimatePresence>
        {showDisclaimer && (
          <DisclaimerModal 
            isOpen={showDisclaimer} 
            onClose={() => {}} 
            onAccept={() => setShowDisclaimer(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
