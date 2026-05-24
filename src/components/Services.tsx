"use client";

import React, { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  { 
    id: '01', 
    name: 'Identity', 
    desc: 'Bespoke expedition planning for specialized groups. Each itinerary is a unique mark in the field of conservation.',
    sub: ['Custom Routes', 'Private Guides', 'Special Equipment', 'Risk Mgmt']
  },
  { 
    id: '02', 
    name: 'Editorial', 
    desc: 'Professional field photography and cinematography crews for wildlife documentaries. Built to withstand extreme climates.',
    sub: ['Film Logistics', 'Camera Techs', 'Drone Ops', 'Post-Prod Support']
  },
  { 
    id: '03', 
    name: 'Impact', 
    desc: 'Carbon neutrality certification and biodiversity reporting for every mile traveled. Transparency in the seams of every journey.',
    sub: ['Carbon Offsets', 'Habitat Restoration', 'Local Grants', 'Science Support']
  },
  { 
    id: '04', 
    name: 'Navigation', 
    desc: 'Expert-led pathfinding in the world’s most remote corners. Performance-first accessibility to the untouched.',
    sub: ['Arctic Wayfinding', 'Desert Logistics', 'River Crossing', 'Cave Mapping']
  }
];

export function Services() {
  const { t } = useLocale();
  const [openId, setOpenId] = useState<string | null>('01');

  return (
    <section id="services" className="bg-black text-white border-b border-white/20">
      <div className="flex flex-col md:flex-row justify-between items-end p-8 border-b border-white/20 gap-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs opacity-40">[04] / SERVICES</span>
          <h2 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter">
            {t.services_title}
          </h2>
        </div>
        <span className="font-mono text-xs opacity-40 uppercase">04 Categories</span>
      </div>

      <div className="flex flex-col">
        {services.map((svc) => (
          <div 
            key={svc.id}
            className={cn(
              "border-b border-white/20 group transition-colors duration-300",
              openId === svc.id ? "bg-white text-black" : "hover:bg-white/5"
            )}
          >
            <button 
              onClick={() => setOpenId(openId === svc.id ? null : svc.id)}
              className="w-full p-8 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-8">
                <span className={cn("font-mono text-2xl font-bold", openId === svc.id ? "text-accent" : "opacity-40")}>
                  {svc.id}
                </span>
                <span className="font-headline text-4xl md:text-7xl font-black uppercase tracking-tighter">
                  {svc.name}
                </span>
              </div>
              {openId === svc.id ? <Minus className="w-8 h-8" /> : <Plus className="w-8 h-8 opacity-40 group-hover:opacity-100" />}
            </button>

            <div className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out",
              openId === svc.id ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            )}>
              <div className="p-8 pt-0 grid md:grid-cols-3 gap-8 items-end">
                <p className="text-lg leading-relaxed max-w-md">
                  {svc.desc}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {svc.sub.map(s => (
                    <span key={s} className="font-mono text-[10px] uppercase opacity-60">↳ {s}</span>
                  ))}
                </div>
                <button className={cn(
                  "flex items-center gap-2 font-mono text-xs uppercase tracking-widest border-2 p-4 w-fit sharp-transition",
                  openId === svc.id ? "border-black hover:bg-black hover:text-white" : "border-white"
                )}>
                  View Projects <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}