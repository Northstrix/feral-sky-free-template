"use client";

import React, { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';

export function ContactFeedback() {
  const { t } = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center p-12 text-center bg-black text-white">
        <div className="border-4 border-accent p-8 animate-in zoom-in duration-300">
           <h3 className="font-headline text-5xl font-black mb-4 uppercase tracking-tighter">{t.contact_success}</h3>
           <p className="font-mono text-xs opacity-60 uppercase tracking-widest">Our expedition architects are reviewing your coordinates.</p>
           <Button variant="ghost" className="mt-12 uppercase text-xs tracking-tighter" onClick={() => setSubmitted(false)}>↳ Reset Coordinates</Button>
        </div>
      </div>
    );
  }

  return (
    <section id="contact" className="bg-black text-white grid md:grid-cols-2">
      <div className="p-8 md:p-16 flex flex-col justify-between border-r border-white/20">
        <div>
          <span className="font-mono text-xs opacity-40 mb-8 block">[05] / CONTACT</span>
          <h2 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            Let's Make Something <em className="not-italic bg-accent px-2 text-black">Specific</em>.
          </h2>
          <p className="font-mono text-xs opacity-60 uppercase leading-relaxed max-w-sm">
            {t.contact_subtitle} Currently booking for Q4 2025.
          </p>
        </div>
        
        <div className="mt-16 space-y-4">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] opacity-40 uppercase">Phone</span>
            <span className="text-xl">+1 303 449 3711</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] opacity-40 uppercase">Base</span>
            <span className="text-xl">Boulder, Colorado, USA</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-16 space-y-8 bg-white/5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
             <label className="font-mono text-[10px] uppercase opacity-40">[01] Name</label>
             <Input placeholder="John Doe" className="bg-transparent border-2 border-white/20 rounded-none h-14 font-mono text-xs focus:border-accent transition-colors" required />
          </div>
          <div className="flex flex-col gap-2">
             <label className="font-mono text-[10px] uppercase opacity-40">[02] Email</label>
             <Input placeholder="john@habitat.com" type="email" className="bg-transparent border-2 border-white/20 rounded-none h-14 font-mono text-xs focus:border-accent transition-colors" required />
          </div>
        </div>
        <div className="flex flex-col gap-2">
           <label className="font-mono text-[10px] uppercase opacity-40">[03] Target Destination</label>
           <Input placeholder="Galapagos, Antarctica..." className="bg-transparent border-2 border-white/20 rounded-none h-14 font-mono text-xs focus:border-accent transition-colors" />
        </div>
        <div className="flex flex-col gap-2">
           <label className="font-mono text-[10px] uppercase opacity-40">[04] Mission Brief</label>
           <Textarea placeholder="Describe your habitat goals..." className="bg-transparent border-2 border-white/20 rounded-none min-h-[150px] font-mono text-xs focus:border-accent transition-colors" required />
        </div>
        <Button type="submit" className="w-full h-16 bg-white text-black hover:bg-accent hover:text-white rounded-none font-bold text-lg uppercase tracking-widest sharp-transition flex justify-between px-8">
          Initiate Mission <ArrowRight className="w-6 h-6" />
        </Button>
      </form>
    </section>
  );
}