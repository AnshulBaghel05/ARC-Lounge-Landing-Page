import React, { useState, useEffect } from 'react';
import { BRAND_CONFIG } from '../data/config';

interface NavigationProps {
  currentPrice: number;
  onOpenReserve: () => void;
  onOpenCustomizer: () => void;
}

/**
 * Editorial Top Navigation adhering to the strict Top Bar Contract:
 * Zone 1: Single text wordmark
 * Zone 2: Concise single-line navigation links
 * Zone 3: Single primary action CTA
 * + Subtle mobile sticky bar when scrolled past hero
 */
export const Navigation: React.FC<NavigationProps> = ({
  currentPrice,
  onOpenReserve,
  onOpenCustomizer,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#1C1612]/10 shadow-xs py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-serif-luxury text-2xl md:text-3xl tracking-tight text-[#1C1612] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
          >
            FORMA
          </a>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#1C1612]/75">
            <a
              href="#philosophy"
              className="hover:text-[#1C1612] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Philosophy
            </a>
            <a
              href="#customizer"
              onClick={(e) => {
                e.preventDefault();
                onOpenCustomizer();
                document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#1C1612] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Customizer
            </a>
            <a
              href="#dimensions"
              className="hover:text-[#1C1612] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Dimensions
            </a>
            <a
              href="#rooms"
              className="hover:text-[#1C1612] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Spaces
            </a>
            <a
              href="#craft"
              className="hover:text-[#1C1612] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Craft
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden lg:block text-right">
              <span className="text-[10px] font-mono tracking-widest text-[#4A3222]/70 uppercase block">
                {BRAND_CONFIG.heroProduct.name}
              </span>
              <span className="text-sm font-mono font-medium text-[#1C1612] tabular-nums">
                ${currentPrice.toLocaleString()} USD
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenReserve}
              className="px-5 py-2.5 text-xs font-medium tracking-wider uppercase text-[#F5EFE6] bg-[#1C1612] hover:bg-[#4A3222] transition-colors rounded-sm shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              Reserve Edition
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom Conversion Bar when scrolled past hero */}
      {isScrolled && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1C1612] text-[#F5EFE6] px-5 py-3 border-t border-[#F5EFE6]/10 flex items-center justify-between shadow-xl">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4C2A6] block">
              ARC Lounge Chair
            </span>
            <span className="text-sm font-mono font-semibold tabular-nums text-[#F5EFE6]">
              ${currentPrice.toLocaleString()} USD
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#customizer"
              className="px-3 py-1.5 text-xs font-medium border border-[#D4C2A6]/40 text-[#D4C2A6] rounded-sm uppercase tracking-wider"
            >
              Configure
            </a>
            <button
              type="button"
              onClick={onOpenReserve}
              className="px-4 py-1.5 text-xs font-medium bg-[#B08D57] text-[#1C1612] font-semibold rounded-sm uppercase tracking-wider shadow-sm"
            >
              Reserve Edition
            </button>
          </div>
        </div>
      )}
    </>
  );
};
