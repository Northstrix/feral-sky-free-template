"use client";

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { useResponsive } from '@/hooks/use-responsive';
import { MultiColoredTextV1 } from './MultiColoredText';
import NamerUiBadge from './NamerUiBadge';
import { cn } from '@/lib/utils';

interface TextPart {
  text: string;
  isLink: boolean;
  link?: {
    href: string;
    text: string;
  };
}

export function Footer({ onNavClick, onCreditClick, scrollContainerRef }: { onNavClick: (id: string) => void, onCreditClick: () => void, scrollContainerRef?: React.RefObject<HTMLElement> }) {
  const { t, lang, isRTL } = useApp();
  const { width: windowWidth, isMobile } = useResponsive();
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(`${15.2}em`);
  const [rotation, setRotation] = useState(isRTL ? 225 : 135);
  const [isVisible, setIsVisible] = useState(true);
  const [harmonies, setHarmonies] = useState({
    analogous: [] as string[],
    triad: [] as string[],
  });

  const isOneColFooter = windowWidth < 1024;
  useEffect(() => {
    function updateFontSize() {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      if (width < 280) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
      if (width >= 1536) {
        setFontSize(`${15.2}em`);
        return;
      }
      const clampedWidth = Math.min(Math.max(width, 280), 1536);
      const normalizedScale = (clampedWidth - 280) / (1536 - 280);
      const nonLinearScale = Math.pow(normalizedScale, 0.8);
      let fSize = 1.6 + nonLinearScale * (15.2 - 1.6);
      fSize *= lang === "he" ? 1.14 : 0.96;
      setFontSize(`${fSize.toFixed(2)}em`);
    }
    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, [lang]);

  useEffect(() => {
    let angle = isRTL ? 225 : 135;
    const interval = setInterval(() => {
      angle += isRTL ? -15 : 15;
      setRotation(angle);
    }, 2000);
    return () => clearInterval(interval);
  }, [isRTL]);

  const handleLinkClick = (id: string) => {
    onNavClick(id);
  };

  const handleTerminalClick = () => {
    scrollContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const creditLines = useMemo(() => {
    const maximLink = { text: lang === 'he' ? "מקסים בורטניקוב" : "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: lang === 'he' ? "מקסים בורטניקוב" : "Maxim Bortnikov" } };
    const nextLink = { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } };
    const firebaseLink = { text: lang === 'he' ? "פיירבייס סטודיו" : "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text:  lang === 'he' ? "פיירבייס סטודיו" : "Firebase Studio" } };

    return {
      line1: [
        { text: `${t('madeBy')} `, isLink: false },
        maximLink
      ],
      line2: [
        { text: `${t('using')} `, isLink: false },
        nextLink,
        { text: lang === 'he'? ` ${t('and')}` :  ` ${t('and')} `, isLink: false },
        firebaseLink,
        { text: ".", isLink: false }
      ]
    };
  }, [t, lang]);

  const renderTextParts = (parts: TextPart[]) =>
    parts.map((part, index) =>
      part.isLink && part.link ? (
        <a
          key={index}
          href={part.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline hover:text-[var(--theme-color)] transition-all duration-300"
        >
          {part.link.text}
        </a>
      ) : (
        <span key={index} style={{ color: '#999999' }}>{part.text}</span>
      )
    );

  const columnAlignment = `${isOneColFooter ? "items-center text-center" : "items-start"} ${isRTL ? 'text-[13px]' : 'font-mono text-xs'}`;
  const headerAlignment = isOneColFooter ? "text-center" : (isRTL ? "text-right text-[13px]" : "text-left font-mono text-xs");
  const linkBaseStyle = "group transition-all duration-300 ease-in-out cursor-pointer bg-transparent border-none p-0 uppercase inline-flex items-center gap-1.5";

  return (
    <footer className="bg-black text-white pt-24 pb-12 overflow-hidden">
      <div className="w-full">
        <div className={cn("grid gap-12 mb-16", isOneColFooter ? "grid-cols-1" : "md:grid-cols-4")} dir={isRTL ? "rtl" : "ltr"}>
          {/* Navigation Column */}
          <div className={cn("flex flex-col gap-4 w-full", columnAlignment)}>
            <span className={cn("text-[10px] uppercase opacity-40 block w-full", headerAlignment)}>{t('nav_header')}</span>
            <ul className={cn("uppercase space-y-2 list-none p-0 flex flex-col", columnAlignment)}>
              {['home', 'expeditions', 'guides', 'testimonials', 'faq', 'about'].map(id => (
                <li key={id}>
                  <button onClick={() => handleLinkClick(id)} className={linkBaseStyle}>
                    <span className="no-underline text-white group-hover:text-[var(--theme-color)] transition-colors">{t(`nav_${id}`)}</span>
                  </button>
                </li>
              ))}
              <li>
                <button onClick={onCreditClick} className={linkBaseStyle}>
                  <span className="no-underline text-white group-hover:text-[var(--theme-color)] transition-colors">{t('credit_inscription')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column */}
          <div className={cn("flex flex-col gap-4 w-full", columnAlignment)}>
            <span className={cn("text-[10px] uppercase opacity-40 block w-full", headerAlignment)}>{t('links_header')}</span>
            <ul className={cn("uppercase space-y-2 list-none p-0 flex flex-col", columnAlignment)}>
              {[
                { href: "https://x.com/maxim_bortnikov", label: t('social_x') },
                { href: "https://github.com/Northstrix/feral-sky-free-template", label: t('social_github') },
                { href: "https://sourceforge.net/projects/feral-sky-free-template/", label: t('social_sourceforge') }
              ].map(social => (
                <li key={social.href}>
                  <a 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={cn(
                      linkBaseStyle, 
                      isOneColFooter ? "text-white underline hover:text-[var(--theme-color)] transition-all duration-300" : "no-underline"
                    )}
                  >
                    <span className={cn(
                      "transition-colors duration-300",
                      isOneColFooter ? "text-inherit group-hover:text-[var(--theme-color)]" : "text-white group-hover:text-[var(--theme-color)]"
                    )}>
                      {social.label}
                    </span>
                    {!isOneColFooter && (
                      <span className={cn("opacity-40 transition-transform duration-300", isRTL && "scale-x-[-1]")}>↳</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours Column */}
          <div className={cn("flex flex-col gap-4 w-full", columnAlignment)}>
            <span className={cn("text-[10px] uppercase opacity-40 block w-full", headerAlignment)}>{t('hours_title')}</span>
            <ul className={cn("space-y-2 list-none p-0", isOneColFooter ? "text-center" : (isRTL ? "text-right text-[13px]" : "text-left font-mono text-xs"))} style={{ color: 'var(--subtle-color)' }}>
              <li>{t('hours_sun_thu')}</li>
              <li>{t('hours_fri')}</li>
              <li>{t('hours_sat')}</li>
            </ul>
          </div>

          {/* About Column */}
          <div className={cn("flex flex-col gap-4 w-full", columnAlignment)}>
            <span className={cn("text-[10px] uppercase opacity-40 block w-full", headerAlignment)}>{t('nav_about')}</span>
            <div className={cn("space-y-6 flex flex-col w-full", columnAlignment)}>
              <div className={cn("text-[10px] uppercase leading-relaxed", isOneColFooter ? "text-center" : (isRTL ? "text-right" : "text-left"))} style={{ color: 'var(--subtle-color)' }}>
              {isMobile ? (
                <>
                  {/* Mobile Layout: Separate lines */}
                  <span className="block">{t('phone')}</span>
                  <span className="block" dir="ltr">+1 234 567 8901</span>
                  
                  <span className="block mt-2">{t('email')}</span>
                  <span className="block">operations@feralsky.com</span>
                </>
              ) : (
                <>
                  {/* Desktop Layout: Inline strings */}
                  <span className="block">{t('phone')}: <span dir="ltr">+1 234 567 8901</span></span>
                  <span className="block">{t('email')}: operations@feralsky.com</span>
                </>
              )}
                <span className="block mt-2">{t('address_label')}:</span>
                <span className="block">{t('address_line1')}</span>
                <span className="block">{t('address_line2')}</span>
                <span className="block">{t('address_line3')}</span>
              </div>
              <div className="w-fit">
                <NamerUiBadge 
                  isRTL={isRTL}
                  namerUIName={isRTL ? "נמר UI" : "Namer UI"}
                  iconSrc="/Namer.png"
                  poweredByText={t('powered_by')}
                />
              </div>
              <div className={cn("text-[10px] leading-relaxed", isOneColFooter ? "text-center" : (isRTL ? "text-right" : "text-left font-mono"))}>
                <p>{renderTextParts(creditLines.line1)}</p>
                <p className="mt-[6px]">{renderTextParts(creditLines.line2)}</p>
              </div>
            </div>
          </div>
        </div>

        {isVisible && (
          <div className="w-full flex justify-center mb-16 px-4">
             <div ref={containerRef} dir={isRTL ? "rtl" : "ltr"} className="overflow-hidden flex justify-center w-full">
               <button onClick={handleTerminalClick} className="bg-transparent border-none p-0 cursor-pointer w-full flex justify-center focus:outline-none">
                 <MultiColoredTextV1 
                   inscription={t('app_name')}
                   fontSize={fontSize}
                   colors={["#00A7FA", "#FA00A7", "#A7FA00"]}
                   separatorRotation={`${rotation}deg`}
                   fontWeight={isRTL ? 600 : 900}
                 />
               </button>
             </div>
          </div>
        )}
      </div>
    </footer>
  );
}