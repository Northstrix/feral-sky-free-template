'use client';

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/use-responsive";

export interface SectionTextSizes {
  titleFontSize: string;
  descFontSize: string;
  descMarginTop: string;
}

interface SectionTextProps {
  title: string;
  description?: string;
  isRTL?: boolean;
  onSizeChange?: (sizes: SectionTextSizes) => void;
  manualSizes?: SectionTextSizes;
}

export default function SectionText({ 
  title, 
  description, 
  isRTL = false, 
  onSizeChange,
  manualSizes 
}: SectionTextProps) {
  const { width: windowWidth, isMobile } = useResponsive();
  const ref = useRef<HTMLDivElement>(null);

  const MIN_WIDTH = 200;
  const MAX_WIDTH = 1400;
  const TITLE_MIN = 24;
  const TITLE_MAX = 36;
  const DESC_MIN = 15;
  const DESC_MAX = 19;
  const MT_MIN = 0;
  const MT_MAX = 0.6;

  const [titleFontSize, setTitleFontSize] = useState(`${TITLE_MIN}px`);
  const [descFontSize, setDescFontSize] = useState(`${DESC_MIN}px`);
  const [descMarginTop, setDescMarginTop] = useState(`${MT_MIN}rem`);

  useEffect(() => {
    if (!ref.current || manualSizes) return;

    const updateSizes = () => {
      if (!ref.current) return;
      const width = ref.current.offsetWidth;
      const clamped = Math.min(Math.max(width, MIN_WIDTH), MAX_WIDTH);
      const ratio = (clamped - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH);

      const interpTitle = TITLE_MIN + ratio * (TITLE_MAX - TITLE_MIN);
      const interpDesc = DESC_MIN + ratio * (DESC_MAX - DESC_MIN);
      const interpMargin = MT_MIN + ratio * (MT_MAX - MT_MIN);

      const sizes = {
        titleFontSize: `${interpTitle.toFixed(2)}px`,
        descFontSize: `${interpDesc.toFixed(2)}px`,
        descMarginTop: `${interpMargin.toFixed(3)}rem`
      };

      setTitleFontSize(sizes.titleFontSize);
      setDescFontSize(sizes.descFontSize);
      setDescMarginTop(sizes.descMarginTop);

      if (onSizeChange) {
        onSizeChange(sizes);
      }
    };

    updateSizes();
    
    // Technical emission delay for stable calibration
    const timer = setTimeout(updateSizes, 1400);

    const resizeObserver = new ResizeObserver(updateSizes);
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, [onSizeChange, manualSizes]);

  const displayTitleFontSize = manualSizes ? manualSizes.titleFontSize : titleFontSize;
  const displayDescFontSize = manualSizes ? manualSizes.descFontSize : descFontSize;
  const displayDescMarginTop = manualSizes ? manualSizes.descMarginTop : descMarginTop;

  const isCentered = windowWidth < 1024;

  return (
    <div
      ref={ref}
      className={cn(
        isMobile ? "mb-6 mt-[0.25rem]" : "mb-10",
        "flex flex-col transition-all w-full",
        isCentered ? "items-center text-center" : "items-start text-start"
      )}
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <h2
        className="font-headline font-bold tracking-tight leading-tight"
        style={{
          fontSize: displayTitleFontSize,
          lineHeight: 1.2,
          color: "var(--foreground)",
        }}
      >
        <span className="relative inline-block group">
          <span className="relative z-10">{title}</span>
          <span 
            className={cn(
              "absolute inset-0 bg-[var(--theme-color)] scale-x-0 transition-transform duration-300 -z-10",
              isCentered ? "origin-center group-hover:scale-x-100" : (isRTL ? "origin-right group-hover:scale-x-100" : "origin-left group-hover:scale-x-100")
            )} 
          />
        </span>
      </h2>
      {description && (
        <p
          className="w-full max-w-full font-body"
          style={{
            fontSize: displayDescFontSize,
            lineHeight: 1.5,
            color: "#666",
            marginTop: displayDescMarginTop,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}