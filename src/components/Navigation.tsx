"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { Compass, Globe, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface BackdropOptions {
  supportsBackdropFilter: boolean;
  bodyOpacity: number;
  borderOpacity: number;
  blurStrength: number;
  isScrolled?: boolean;
}

export function getLegacyBackdropStyle({
  supportsBackdropFilter,
  bodyOpacity,
  borderOpacity,
  blurStrength,
  isScrolled = false,
}: BackdropOptions): React.CSSProperties {
  const invisibleOpacity = 0;

  return {
    background: supportsBackdropFilter
      ? `rgba(0, 0, 0, ${isScrolled ? bodyOpacity : invisibleOpacity})`
      : `rgba(0, 0, 0, ${isScrolled ? bodyOpacity + 0.2 : invisibleOpacity})`,
    backdropFilter: supportsBackdropFilter
      ? `blur(${isScrolled ? blurStrength : 0}px)`
      : undefined,
    WebkitBackdropFilter: supportsBackdropFilter
      ? `blur(${isScrolled ? blurStrength : 0}px)`
      : undefined,
    border: `1px solid rgba(255,255,255,${
      isScrolled ? borderOpacity : invisibleOpacity
    })`,
    boxShadow: isScrolled ? "0 2px 16px 0 rgba(0,0,0,0.08)" : "none",
    transition:
      "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease",
  };
}

export function Navigation() {
  const { t, setLocale, locale } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const supportsBackdropFilter = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.CSS?.supports?.("backdrop-filter", "blur(24px)") || 
           window.CSS?.supports?.("-webkit-backdrop-filter", "blur(24px)");
  }, []);

  const backdropStyle = getLegacyBackdropStyle({
    supportsBackdropFilter: !!supportsBackdropFilter,
    bodyOpacity: 0.2,
    borderOpacity: isScrolled ? 0.2 : 0,
    blurStrength: isScrolled ? 24 : 0,
    isScrolled: isScrolled
  });

  const navStyle: React.CSSProperties = {
    ...backdropStyle,
    background: isMobile
      ? isScrolled
        ? 'rgba(0,0,0,0.8)'
        : 'rgba(255,255,255,0.9)'
      : isScrolled
      ? 'rgba(0,0,0,0.2)'
      : 'transparent',
    borderRadius: isScrolled ? '24px' : '0',
    height: isMobile ? (isScrolled ? '52px' : '56px') : isScrolled ? '52px' : '80px',
    top: isScrolled ? '16px' : '0',
    marginTop: isScrolled ? '0' : '0',
    paddingLeft: '24px',
    paddingRight: '24px',
    zIndex: 1000,
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: isScrolled ? 'calc(100% - 32px)' : '100%',
    maxWidth: '100rem',
    left: '50%',
    transform: 'translateX(-50%)',
    boxSizing: 'border-box',
    color: isScrolled ? 'white' : 'black',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const toggleLocale = () => {
    const next: Record<string, 'en' | 'he' | 'it'> = { en: 'he', he: 'it', it: 'en' };
    setLocale(next[locale]);
  };

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <nav style={navStyle}>
      <button onClick={scrollToTop} className="flex items-center gap-2 group border-none bg-transparent p-0 cursor-pointer">
        <Compass className={cn("w-8 h-8 transition-colors duration-300", isScrolled ? "text-accent" : "text-black group-hover:text-accent")} />
        <span className="font-headline font-bold text-xl tracking-tighter uppercase transition-colors duration-300">FERAL SKY</span>
      </button>

      <div className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-widest">
        <a href="#expeditions" className="hover:text-accent transition-colors flex items-center gap-2">
          <Globe className="w-3 h-3" /> {t.nav_expeditions}
        </a>
        <a href="#services" className="hover:text-accent transition-colors">
          {t.nav_services}
        </a>
        <a href="#contact" className="hover:text-accent transition-colors">
          {t.nav_contact}
        </a>
        <button 
          onClick={toggleLocale}
          className="px-3 py-1 border border-current hover:bg-current hover:text-background transition-colors bg-transparent cursor-pointer font-mono text-[10px] uppercase"
        >
          {locale}
        </button>
      </div>

      <button className="md:hidden bg-transparent border-none text-current cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black text-white p-8 flex flex-col gap-8 z-[2000] animate-in fade-in duration-300">
          <button className="self-end bg-transparent border-none text-white cursor-pointer" onClick={() => setMobileMenuOpen(false)}><X className="w-8 h-8"/></button>
          <div className="flex flex-col gap-8 text-4xl font-headline font-bold uppercase">
             <a href="#expeditions" onClick={() => setMobileMenuOpen(false)} className="text-white no-underline">{t.nav_expeditions}</a>
             <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-white no-underline">{t.nav_services}</a>
             <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-white no-underline">{t.nav_contact}</a>
             <button onClick={toggleLocale} className="text-xl border w-fit px-4 py-1 bg-transparent text-white cursor-pointer uppercase">{locale}</button>
          </div>
        </div>
      )}
    </nav>
  );
}