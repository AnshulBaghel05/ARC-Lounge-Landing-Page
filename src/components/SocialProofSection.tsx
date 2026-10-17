import React from 'react';
import { BRAND_CONFIG } from '../data/config';
import { ShieldCheck, Truck, RotateCcw, Trees } from 'lucide-react';

export const SocialProofSection: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-[#F5EFE6] border-t border-[#1C1612]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Press Mentions Bar */}
        <div className="mb-20 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B08D57] block mb-8">
            Selected Architectural Press & Curations
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75">
            {BRAND_CONFIG.pressLogos.map((press, i) => (
              <span
                key={i}
                className="font-serif-luxury text-lg md:text-xl font-medium tracking-wider text-[#1C1612]/80 hover:text-[#1C1612] transition-colors"
              >
                {press}
              </span>
            ))}
          </div>
        </div>

        {/* 3 Attributable Testimonials */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-mono tracking-widest uppercase text-[#B08D57] block mb-2">
              08. Provenance & Living Proof
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1C1612] font-medium tracking-tight">
              In Situ with Architects.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BRAND_CONFIG.testimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#E8DCC8]/40 border border-[#1C1612]/10 p-8 rounded-lg flex flex-col justify-between"
              >
                <p className="font-serif-luxury text-lg text-[#1C1612] leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>

                <div className="pt-4 border-t border-[#1C1612]/10">
                  <div className="text-xs font-semibold text-[#1C1612] font-sans">
                    {item.author}
                  </div>
                  <div className="text-[11px] font-mono text-[#4A3222] mt-0.5">
                    {item.role}
                  </div>
                  <div className="text-[10px] text-[#1C1612]/60 mt-0.5">
                    {item.studio}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Guarantee Grid Row */}
        <div className="p-8 md:p-12 bg-[#1C1612] text-[#F5EFE6] rounded-xl border border-[#B08D57]/30">
          <div className="text-center max-w-lg mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] block mb-1">
              Guarantees & Stewardship
            </span>
            <h3 className="font-serif-luxury text-2xl md:text-3xl font-medium">
              A Direct Relationship with the Atelier
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <ShieldCheck size={20} className="text-[#B08D57]" />
              <h4 className="text-sm font-semibold text-[#F5EFE6] font-sans">
                10-Year Frame Warranty
              </h4>
              <p className="text-xs text-[#D4C2A6] leading-relaxed">
                Guaranteed against structural joint failure, cold-molded foam fatigue, and hardware defects.
              </p>
            </div>

            <div className="space-y-2">
              <Truck size={20} className="text-[#B08D57]" />
              <h4 className="text-sm font-semibold text-[#F5EFE6] font-sans">
                White-Glove Placement
              </h4>
              <p className="text-xs text-[#D4C2A6] leading-relaxed">
                Includes scheduled appointment delivery, room of choice placement, and packaging recycling.
              </p>
            </div>

            <div className="space-y-2">
              <RotateCcw size={20} className="text-[#B08D57]" />
              <h4 className="text-sm font-semibold text-[#F5EFE6] font-sans">
                30-Day In-Home Trial
              </h4>
              <p className="text-xs text-[#D4C2A6] leading-relaxed">
                Live with the ARC in your natural room light. Zero return freight friction if not completely harmonious.
              </p>
            </div>

            <div className="space-y-2">
              <Trees size={20} className="text-[#B08D57]" />
              <h4 className="text-sm font-semibold text-[#F5EFE6] font-sans">
                100% FSC Forestry
              </h4>
              <p className="text-xs text-[#D4C2A6] leading-relaxed">
                Traceable American walnut harvest. Two saplings planted in certified Appalachian reserves per chair.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#F5EFE6]/10 text-center text-[10px] font-mono text-[#D4C2A6]/60">
            * All warranty claims, certification notes, and delivery timelines are demo showcase placeholders.
          </div>
        </div>
      </div>
    </section>
  );
};
