import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';

interface FooterSectionProps {
  onOpenReserve: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenReserve }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) return;
    setSubscribed(true);
  };

  const palette = [
    { name: 'Cream', hex: '#F5EFE6' },
    { name: 'Beige', hex: '#E8DCC8' },
    { name: 'Sand', hex: '#D4C2A6' },
    { name: 'Walnut', hex: '#4A3222' },
    { name: 'Espresso', hex: '#2A1D14' },
    { name: 'Brass', hex: '#B08D57' },
    { name: 'Ink', hex: '#1C1612' },
  ];

  return (
    <footer className="bg-[#1C1612] text-[#F5EFE6] pt-24 pb-14 border-t border-[#F5EFE6]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Massive Editorial CTA Callout */}
        <div className="border-b border-[#F5EFE6]/15 pb-20 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase block mb-3">
                09. Bespoke Allocation
              </span>
              <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F5EFE6] leading-none">
                Reserve your edition of the ARC.
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row items-start sm:items-center lg:justify-end gap-4">
              <button
                type="button"
                onClick={onOpenReserve}
                className="w-full sm:w-auto px-8 py-4 bg-[#F5EFE6] hover:bg-[#E8DCC8] text-[#1C1612] text-xs font-mono uppercase tracking-widest rounded-sm transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                Open Reservation Portal
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Grid: Brand, Navigation, Atelier Dispatch, Palette System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-xs text-[#D4C2A6]">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <span className="font-serif-luxury text-3xl text-[#F5EFE6] tracking-tight block">
              FORMA
            </span>
            <p className="text-xs text-[#D4C2A6]/80 leading-relaxed max-w-xs">
              Architectural furniture atelier creating sculpted living sanctuaries.
              Engineered with physical permanence and tactile honesty.
            </p>
            <div className="text-[11px] font-mono text-[#B08D57]">
              Atelier: Milano · Stockholm · New York
            </div>
          </div>

          {/* Column 2: Index Links */}
          <div className="space-y-3 font-mono text-[11px] uppercase tracking-wider">
            <span className="text-[#F5EFE6] block font-semibold mb-2">Index</span>
            <p><a href="#philosophy" className="hover:text-[#F5EFE6] transition-colors">01. Manifesto</a></p>
            <p><a href="#customizer" className="hover:text-[#F5EFE6] transition-colors">02. Material Swatches</a></p>
            <p><a href="#dimensions" className="hover:text-[#F5EFE6] transition-colors">03. Verified Dimensions</a></p>
            <p><a href="#rooms" className="hover:text-[#F5EFE6] transition-colors">04. Living Environments</a></p>
            <p><a href="#craft" className="hover:text-[#F5EFE6] transition-colors">05. Timber & Joinery</a></p>
          </div>

          {/* Column 3: Atelier Newsletter */}
          <div className="space-y-3">
            <span className="text-[#F5EFE6] text-xs font-mono uppercase tracking-wider block font-semibold">
              The Forma Monograph
            </span>
            <p className="text-xs text-[#D4C2A6]/80 leading-relaxed">
              Quarterly private monograph on spatial architecture, tactile materials, and limited editions.
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="architect@studio.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-[#2A1D14] border border-[#F5EFE6]/20 rounded px-3 py-2 text-xs text-[#F5EFE6] placeholder-[#D4C2A6]/40 focus:outline-none focus:border-[#B08D57] flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#B08D57] text-[#1C1612] rounded hover:bg-[#C9A063] transition-colors shrink-0"
                  aria-label="Submit newsletter"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#B08D57] font-mono">
                <CheckCircle2 size={14} />
                <span>Subscribed to Monograph.</span>
              </div>
            )}
          </div>

          {/* Column 4: Visual System Palette Display */}
          <div className="space-y-3">
            <span className="text-[#F5EFE6] text-xs font-mono uppercase tracking-wider block font-semibold">
              Visual System Palette
            </span>
            <div className="grid grid-cols-7 gap-1.5 pt-1">
              {palette.map((p) => (
                <div key={p.name} className="flex flex-col items-center gap-1">
                  <div
                    className="w-full h-8 rounded-xs border border-white/10"
                    style={{ backgroundColor: p.hex }}
                    title={`${p.name} (${p.hex})`}
                  />
                  <span className="text-[8px] font-mono text-[#D4C2A6]/60 truncate w-full text-center">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-mono text-[#D4C2A6]/60 pt-2 leading-tight">
              Type: Cormorant Garamond · DM Sans
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Case Study / Demo Disclaimer */}
        <div className="pt-8 border-t border-[#F5EFE6]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#D4C2A6]/60">
          <div>
            © {new Date().getFullYear()} FORMA LIVING ATELIER. ALL RIGHTS RESERVED.
          </div>
          <div className="text-center sm:text-right">
            <span>PORTFOLIO CASE STUDY · AWWWARDS SOTD SPECIFICATION</span>
            <span className="mx-2">·</span>
            <span className="text-[#B08D57]">DEMO PROTOTYPE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
