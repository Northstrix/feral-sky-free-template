'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { getLegacyBackdropStyle } from './ModalOverlay';
import { useResponsive } from '@/hooks/use-responsive';

export interface NavbarProps {
  scrollContainerRef: React.RefObject<HTMLElement>;
  onLanguageClick: () => void;
  onNavClick: (id: string) => void;
  contentMaxWidth?: string;
  navbarAdjustment?: number;
}

export default function CustomizedTruncatingNavbar({ 
  scrollContainerRef, 
  onLanguageClick, 
  onNavClick,
  contentMaxWidth,
  navbarAdjustment = 0
}: NavbarProps) {
  const { t, lang, isRTL, isHydrated } = useApp();
  const { isMobile, isThreeCol } = useResponsive();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Final calibrated glass values
  const FINAL_GLASS = {
    bodyOpacity: 0.36,
    borderOpacity: 0.14,
    blurStrength: 7.64
  };

  const visibleNavIds = useMemo(() => {
    if (isThreeCol) {
      return ['expeditions', 'guides', 'testimonials', 'faq', 'about'];
    }
    return ['expeditions', 'faq', 'about'];
  }, [isThreeCol]);

  const allNavIds = ['home', 'expeditions', 'guides', 'testimonials', 'faq', 'about'];

  const handleScroll = useCallback(() => {
    const scrollY = scrollContainerRef?.current?.scrollTop || 0;
    setIsScrolled(scrollY > 20);
  }, [scrollContainerRef]);

  useEffect(() => {
    const target = scrollContainerRef?.current;
    if (target) {
      target.addEventListener('scroll', handleScroll);
      return () => target.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, scrollContainerRef]);

  const supportsBackdropFilter = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.CSS?.supports?.("backdrop-filter", "blur(24px)") || 
           window.CSS?.supports?.("-webkit-backdrop-filter", "blur(24px)");
  }, []);

  const backdropStyle = getLegacyBackdropStyle({
    supportsBackdropFilter: !!supportsBackdropFilter,
    bodyOpacity: FINAL_GLASS.bodyOpacity,
    borderOpacity: isScrolled ? FINAL_GLASS.borderOpacity : 0,
    blurStrength: isScrolled ? FINAL_GLASS.blurStrength : 0,
    isScrolled: isScrolled
  });

  const zIndex = 1000;

  const navStyle: React.CSSProperties = {
    ...backdropStyle,
    background: isScrolled ? backdropStyle.background : 'transparent',
    borderRadius: isScrolled ? 'var(--radius)' : '0',
    height: isMobile ? (isScrolled ? '52px' : '56px') : isScrolled ? '52px' : '80px',
    top: isScrolled ? '16px' : '0',
    marginTop: isScrolled ? '0' : '-5px',
    paddingLeft: isScrolled ? (isMobile ? '12px' : '15px') : '0px',
    paddingRight: isScrolled ? (isMobile ? '12px' : '15px') : '0px',
    paddingTop: isScrolled ? '8px' : '0px',
    paddingBottom: isScrolled ? '8px' : '0px',
    zIndex,
    position: 'absolute',
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: isScrolled ? '#fff' : '#000',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxSizing: 'border-box',
  };

  const handleLinkClick = (id: string) => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    onNavClick(id);
  };

  if (!isHydrated) return null;

  return (
    <>
      <nav style={navStyle} className='mx-[12px]'>
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="flex items-center gap-2 border-none bg-transparent cursor-pointer text-inherit group transition-colors no-underline"
        >
          <img
            src="/logo.webp"
            alt="logo"
            className="w-5 h-5"
          />
          <span className={`font-headline text-xl tracking-tighter transition-colors group-hover:text-[var(--theme-color)] ${isRTL ? "items-center text-center" : "items-start font-black"}`}>{t('app_name')}</span>
        </a>

        <div className={`hidden md:flex items-center uppercase tracking-widest gap-4 ${lang === 'he' ? 'text-[12px]' : 'text-[10px] font-mono'}`}>
          <div className="flex items-center gap-4">
            {visibleNavIds.map(id => (
              <button 
                key={id}
                onClick={() => handleLinkClick(id)} 
                className="hover:text-[var(--theme-color)] transition-colors font-bold text-inherit bg-transparent border-none cursor-pointer uppercase tracking-widest"
              >
                 {t(`nav_${id}`)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <div className={cn("w-px h-6 transition-colors duration-200", isScrolled ? "bg-white/[0.118]" : "bg-black/20")} />
            <div className="flex items-center gap-[10px]">
              <button onClick={onLanguageClick} className="border-none bg-transparent p-0 text-inherit hover:text-[var(--theme-color)] transition-all flex items-center justify-center cursor-pointer font-bold">
                <Globe className="w-5 h-5" />
              </button>
              <button className="border-none bg-transparent p-0 text-inherit hover:text-[var(--theme-color)] transition-colors flex items-center justify-center cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}><Menu className="w-6 h-6" /></button>
            </div>
          </div>
        </div>

        <button className="md:hidden border-none bg-transparent text-inherit hover:text-[var(--theme-color)] transition-colors cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}><Menu className="w-6 h-6" /></button>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[2000] bg-[#0a0a0a] text-white p-8 flex flex-col gap-12 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-center">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home');
              }}
              className="flex items-center gap-2 border-none bg-transparent cursor-pointer text-white group transition-all no-underline"
            >
              <img
                src="/logo.webp"
                alt="logo"
                className="w-6 h-6"
              />
              <span className={`font-headline tracking-tighter text-white hover:text-[var(--theme-color)] transition-all duration-300 text-2xl ${isRTL ? 'font-semibold' : 'font-black'}`}>{t('app_name')}</span>
            </a>
            <button onClick={() => setIsMobileMenuOpen(false)} className="bg-transparent border-none text-white hover:text-[#ED1130] transition-all duration-300 cursor-pointer"><X className="w-8 h-8" /></button>
          </div>
          <div className={`flex flex-col gap-6 font-headline uppercase tracking-tighter ${isRTL ? 'font-semibold' : 'font-black'}`}>
            {allNavIds.map(id => (
              <button key={id} className="hover:text-[var(--theme-color)] transition-all duration-300 w-fit bg-transparent border-none cursor-pointer text-left uppercase text-4xl" onClick={() => handleLinkClick(id)}>{t(`nav_${id}`)}</button>
            ))}
            <button onClick={onLanguageClick} className="border border-[#242424] bg-[#0A0A0A] w-fit px-4 py-2 uppercase font-bold flex items-center gap-3 hover:text-[var(--theme-color)] hover:border-[var(--theme-color)] transition-all duration-300 group cursor-pointer" style={{ borderRadius: '0px' }}>
              <Globe className="w-6 h-6 transition-colors group-hover:text-[var(--theme-color)]" />
              <span className="text-xl transition-colors group-hover:text-[var(--theme-color)]">{lang.toUpperCase()}</span>
            </button>
          </div>
          <div className="mt-auto font-black flex gap-6 text-[10px] uppercase tracking-widest text-[#444]">
             <a href="https://x.com/maxim_bortnikov" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-color)] transition-all duration-300">{t('social_x')}</a>
             <a href="https://github.com/Northstrix/feral-sky-free-template" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-color)] transition-all duration-300">{t('social_github')}</a>
             <a href="https://sourceforge.net/projects/feral-sky-free-template/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-color)] transition-all duration-300">{t('social_sourceforge')}</a>
          </div>
        </div>
      )}
    </>
  );
}