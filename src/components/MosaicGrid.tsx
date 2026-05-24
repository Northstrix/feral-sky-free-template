'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { useResponsive } from '@/hooks/use-responsive';
import TourCardStandard from '@/components/TourCardStandard';
import TourCardExpanded from '@/components/TourCardExpanded';
import SectionText from '@/components/SectionText';

export function MosaicGrid() {
  const { dictionary, isRTL, t } = useApp();
  const { isOneCol, isTwoCol, isMobile } = useResponsive();

  const tours = dictionary.tours;
  const isOdd = tours.length % 2 !== 0;

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: isMobile ? '0.75rem' : '1.5rem',
    gridTemplateColumns: isOneCol ? '1fr' : isTwoCol ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
  };

  return (
    <section id="expeditions" className="bg-black text-white py-16 scroll-mt-[28px]">
      <div className="max-w-[2048px] mx-auto">
        <SectionText 
          title={t('tours_title')} 
          description={t('tours_subtitle')} 
          isRTL={isRTL} 
        />

        <div style={gridStyle}>
          {tours.map((tour, idx) => {
            const isLast = idx === tours.length - 1;
            
            if (isTwoCol && isOdd && isLast) {
              return (
                <TourCardExpanded
                  key={tour.id}
                  id={tour.id}
                  title={tour.name}
                  location={tour.location}
                  description={tour.description}
                  imageSrc={tour.imageUrl}
                  price={tour.price}
                  isMobile={isMobile}
                />
              );
            }

            return (
              <TourCardStandard
                key={tour.id}
                id={tour.id}
                title={tour.name}
                location={tour.location}
                description={tour.description}
                imageSrc={tour.imageUrl}
                price={tour.price}
                isMobile={isMobile}
                useFixedHeight={isTwoCol}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
