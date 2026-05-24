"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';

const guides = [
  { id: 'guide-1', name: 'Elena Vance', specialty: 'Alpina Blue', bio: 'Expert mountain climber with 15 years experience in thin atmosphere navigation.' },
  { id: 'guide-2', name: 'Marcus Thorne', specialty: 'Dust Ridge', bio: 'Specialist in desert survival and hydrological sourcing in arid climates.' },
  { id: 'guide-3', name: 'Nala Keri', specialty: 'Canopy Core', bio: 'Botanist turned expedition leader focusing on tropical biodiversity.' },
  { id: 'guide-4', name: 'Soren Bjorg', specialty: 'Boreal Gate', bio: 'Navigates the magnetic north with unparalleled instinct and traditional wisdom.' },
];

export function GuideDirectory() {
  const { t } = useLocale();

  return (
    <section id="guides" className="py-24 bg-card dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl font-bold mb-4">{t.guides_title}</h2>
          <p className="text-muted-foreground">{t.guides_subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides.map((guide) => {
            const imgData = PlaceHolderImages.find(img => img.id === guide.id);
            return (
              <Card key={guide.id} className="bg-background border-muted/20 group hover:border-accent/40 transition-colors duration-300 rounded-sm">
                <CardHeader className="flex flex-col items-center pt-8">
                  <div className="relative mb-4">
                    <Avatar className="w-32 h-32 border-2 border-muted">
                      <AvatarImage src={imgData?.imageUrl} alt={guide.name} className="object-cover" />
                      <AvatarFallback className="bg-primary/20 text-primary">{guide.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-accent p-2 rounded-full">
                      <Quote className="w-4 h-4 text-black" />
                    </div>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-center">{guide.name}</h3>
                  <Badge variant="outline" className="mt-2 text-accent border-accent/20 font-light">{guide.specialty}</Badge>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                  <p className="text-sm text-center text-muted-foreground leading-relaxed">
                    "{guide.bio}"
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}