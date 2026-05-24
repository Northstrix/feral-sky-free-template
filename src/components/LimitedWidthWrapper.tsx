'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LimitedWidthWrapperProps {
  children: React.ReactNode;
  maxWidth: string;
  paddingDesktop?: string;
  paddingMobile?: string;
  className?: string;
}

export default function LimitedWidthWrapper({
  children,
  maxWidth,
  paddingDesktop = '3rem', // 48px
  paddingMobile = '0.75rem', // 12px
  className,
}: LimitedWidthWrapperProps) {
  return (
    <div
      className={cn("w-full mx-auto box-border", className)}
      style={{
        maxWidth,
        paddingLeft: `var(--content-px, ${paddingDesktop})`,
        paddingRight: `var(--content-px, ${paddingDesktop})`,
      }}
    >
      <style jsx global>{`
        :root {
          --content-px: ${paddingDesktop};
        }
        @media (max-width: 1023px) {
          :root {
            --content-px: ${paddingMobile};
          }
        }
      `}</style>
      {children}
    </div>
  );
}
