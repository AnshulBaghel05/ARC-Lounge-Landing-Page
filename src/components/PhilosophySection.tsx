import React from 'react';
import { BRAND_CONFIG } from '../data/config';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-28 md:py-40 bg-[#F5EFE6] border-t border-[#1C1612]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Lead Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs font-mono tracking-widest uppercase text-[#B08D57] block mb-2">
              02. Design Manifesto
            </span>
            <span className="font-serif-luxury text-2xl md:text-3xl text-[#4A3222] italic">
              "Form follows feeling."
            </span>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <p className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1C1612] font-normal leading-tight tracking-tight">
              We reject cold formalism. Furniture should welcome the human body with quiet empathy,
              grounding the space without demanding attention.
            </p>
            <p className="text-sm md:text-base text-[#1C1612]/75 leading-relaxed max-w-2xl">
              The ARC Lounge Chair was conceived over two years of iterative sculpting.
              By fusing the envelopment of a classic barrel chair with the visual buoyancy of splayed
              mid-century legs, we created a sanctuary of comfort tailored to contemporary architecture.
            </p>
          </div>
        </div>

        {/* 3 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-16 border-t border-[#1C1612]/12">
          {BRAND_CONFIG.principles.map((p) => (
            <div key={p.number} className="space-y-4">
              <span className="font-mono text-xs tracking-widest text-[#B08D57] block">
                Principle {p.number}
              </span>
              <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#1C1612] font-medium">
                {p.title}
              </h3>
              <p className="text-xs md:text-sm text-[#1C1612]/75 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
