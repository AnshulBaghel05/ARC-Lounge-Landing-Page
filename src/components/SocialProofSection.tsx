import React, { useState } from 'react';
import { BRAND_CONFIG } from '../data/config';
import { ShieldCheck, Truck, RotateCcw, Trees, ChevronDown, HelpCircle } from 'lucide-react';

export const SocialProofSection: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does White-Glove In-Home Placement work?',
      a: 'Every ARC Lounge Chair includes complimentary white-glove delivery. A certified two-person logistics team coordinates a scheduled delivery window, brings the chair directly into your room of choice, unpacks and inspects the piece, and removes all protective packaging for recycling.',
    },
    {
      q: 'What is covered under the 30-Day In-Home Trial?',
      a: 'We encourage you to experience the ARC in your home’s natural daylight for up to 30 days. If the dimensions, ergonomics, or aesthetic do not completely harmonize with your space, our concierge will arrange complimentary return pickup with a 100% refund.',
    },
    {
      q: 'Can I inspect physical fabric and timber swatches before ordering?',
      a: 'Yes. We dispatch complimentary boxed material kits containing all four upholstery textiles (Tuscan Bouclé, Cognac Aniline Leather, Terracotta Velvet, Oat Belgian Linen) and all three solid timber leg finishes with brushed brass hardware. You can request a kit during reservation or via our concierge.',
    },
    {
      q: 'What structural warranties are included with the ARC Lounge Chair?',
      a: 'Each chair carries a 10-Year Comprehensive Frame Warranty covering the kiln-dried solid hardwood base, welded internal steel armature, high-resilience bio-foam cushioning, and brass ferrule joinery.',
    },
    {
      q: 'What are the certified dimensions and will it clear standard doorways?',
      a: 'The ARC measures 900 mm (35.4″) in width, 855 mm (33.7″) in depth, and 785 mm (30.9″) in height, with a seat height of 395 mm (15.6″). Its low-slung, curved barrel profile comfortably maneuvers through any standard 760 mm (30″) interior doorway.',
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-[#F5EFE6] border-t border-[#1C1612]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Press Mentions Bar */}
        <div className="mb-20 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B08D57] block mb-8 font-semibold">
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
            <span className="text-xs font-mono tracking-widest uppercase text-[#B08D57] block mb-2 font-semibold">
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
        <div className="p-8 md:p-12 bg-[#1C1612] text-[#F5EFE6] rounded-xl border border-[#B08D57]/30 mb-20 shadow-xl">
          <div className="text-center max-w-lg mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] block mb-1 font-semibold">
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

          <div className="mt-8 pt-6 border-t border-[#F5EFE6]/10 text-center text-xs font-mono text-[#D4C2A6]/80">
            Atelier Advisory: Complimentary physical swatch sets, spatial clearance consultations, and international freight coordination are provided for every reservation.
          </div>
        </div>

        {/* Frequently Asked Questions (Friction Dissolution) */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <HelpCircle size={14} className="text-[#B08D57]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] font-semibold">
                Customer Guidance & Policies
              </span>
            </div>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#1C1612] font-medium tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#1C1612]/70 mt-2 font-sans">
              Clear answers regarding commission, white-glove delivery, and in-home trial.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaqIdx === fIdx;
              return (
                <div
                  key={fIdx}
                  className="border border-[#1C1612]/15 rounded-lg bg-[#E8DCC8]/30 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : fIdx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#E8DCC8]/60 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif-luxury text-base sm:text-lg text-[#1C1612] font-medium">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[#B08D57] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-[#1C1612]/80 leading-relaxed font-sans border-t border-[#1C1612]/10 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
