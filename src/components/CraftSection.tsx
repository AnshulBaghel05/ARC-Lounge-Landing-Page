import React from 'react';
import { BRAND_CONFIG } from '../data/config';

export const CraftSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Appalachian Sourcing',
      lead: 'Kiln-cured solid American walnut.',
      detail:
        'Sourced from certified sustainably managed hardwood reserves. Sawn timber rests in climate-controlled kilns for nine months to achieve 7% acoustic moisture equilibrium before shaping.',
    },
    {
      step: '02',
      title: 'Cold-Molded Armature',
      lead: 'Internal steel skeleton enveloped in bio-foam.',
      detail:
        'A continuous welded steel chassis provides permanent structural tension. Bio-polyurethane is injected into custom two-piece negative molds, producing consistent ergonomic density without seams.',
    },
    {
      step: '03',
      title: 'Master Guild Tailoring',
      lead: 'Hand-stretched Tuscan bouclé upholstery.',
      detail:
        'Each chair is upholstered by a single craftsman over two working days. Blind French seams are hand-tufted along the barrel curve, ensuring zero tension ripples over decades of seating.',
    },
  ];

  return (
    <section id="craft" className="py-24 md:py-36 bg-[#F5EFE6] border-t border-[#1C1612]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-[#B08D57] block mb-2">
            06. Atelier Methodology
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#1C1612] font-medium tracking-tight">
            Crafted for Decades, Not Seasons.
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#1C1612]/75 leading-relaxed">
            Every ARC chair represents thirty-eight hours of artisan labor across four guild disciplines:
            timber milling, metalworking, cold-foam molding, and leather-textile tailoring.
          </p>
        </div>

        {/* 3 Process Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((item) => (
            <div
              key={item.step}
              className="p-8 bg-[#E8DCC8]/40 border border-[#1C1612]/10 rounded-lg flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs tracking-widest text-[#B08D57] block mb-4">
                  Phase {item.step}
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#1C1612] font-medium mb-2">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-[#4A3222] mb-3">
                  {item.lead}
                </p>
                <p className="text-xs text-[#1C1612]/75 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stat Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-[#1C1612]/15">
          {BRAND_CONFIG.craftMetrics.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-serif-luxury text-4xl md:text-5xl font-medium text-[#1C1612] tabular-nums block">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider font-mono text-[#4A3222] font-medium block">
                {stat.label}
              </span>
              <span className="text-[11px] text-[#1C1612]/60 font-sans block">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
