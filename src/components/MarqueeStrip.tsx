import React from 'react';

/**
 * Editorial Infinite Marquee Strip
 * Smooth scroll-reactive typography ticker featuring raw material origins.
 */
export const MarqueeStrip: React.FC = () => {
  const materials = [
    'Tuscan Virgin Bouclé',
    'Kiln-Dried American Walnut',
    'Machined Architectural Brass',
    'Belgian Raw Slub Linen',
    'Italian Cotton Velvet',
    'Cold-Molded Armature',
    'Hand-Burnished Patina',
    'Botanical Danish Oils',
  ];

  return (
    <div className="w-full overflow-hidden border-y border-[#1C1612]/15 bg-[#E8DCC8]/40 py-4 select-none">
      <div className="flex w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
        {[...materials, ...materials, ...materials].map((item, index) => (
          <div key={index} className="flex items-center gap-6 px-6">
            <span className="font-serif-luxury text-xl md:text-2xl text-[#1C1612]/80 whitespace-nowrap italic">
              {item}
            </span>
            <span className="text-[#B08D57] text-xs font-mono">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
