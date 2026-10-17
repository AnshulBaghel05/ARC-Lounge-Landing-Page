import React from 'react';
import { BRAND_CONFIG } from '../data/config';
import { ArrowUpRight } from 'lucide-react';

interface GallerySectionProps {
  onSelectPiece: (pieceName: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectPiece }) => {
  return (
    <section id="collection" className="py-24 md:py-36 bg-[#E8DCC8]/30 border-t border-[#1C1612]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[#B08D57] block mb-2">
              07. The Complementary Suite
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#1C1612] font-medium tracking-tight">
              Harmonic Spatial Elements.
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#1C1612]/70 max-w-md">
            Architectural companions conceived alongside the ARC chair to compose coherent sanctuaries.
          </p>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRAND_CONFIG.complementaryPieces.map((piece) => (
            <div
              key={piece.id}
              className="group bg-[#F5EFE6] border border-[#1C1612]/12 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Product Image Container with subtle scale on hover */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#E8DCC8]/50">
                <img
                  src={piece.image}
                  alt={piece.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 filter brightness-98"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1612] text-[#F5EFE6] p-1.5 rounded-full">
                  <ArrowUpRight size={14} />
                </div>
              </div>

              {/* Card Meta & Details */}
              <div className="p-6 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#4A3222]">
                    {piece.category}
                  </span>
                  <span className="text-sm font-mono font-medium text-[#1C1612] tabular-nums">
                    {piece.price} USD
                  </span>
                </div>

                <h3 className="font-serif-luxury text-2xl text-[#1C1612] font-medium group-hover:text-[#4A3222] transition-colors">
                  {piece.name}
                </h3>

                <p className="text-xs text-[#1C1612]/70 leading-relaxed">
                  {piece.description}
                </p>

                <div className="pt-3 border-t border-[#1C1612]/10 flex items-center justify-between text-[11px] font-mono text-[#1C1612]/60">
                  <span>{piece.dimensions}</span>
                  <button
                    type="button"
                    onClick={() => onSelectPiece(piece.name)}
                    className="text-[#B08D57] hover:text-[#1C1612] uppercase font-medium hover:underline"
                  >
                    Inquire Suite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
