import React, { useState } from 'react';
import { BRAND_CONFIG } from '../data/config';
import { Ruler, ShieldCheck, Check, Layers, Compass } from 'lucide-react';
import { ASSET_MANIFEST } from '../data/assetManifest';

const frontImg = ASSET_MANIFEST.dimensions.front;
const sideImg = ASSET_MANIFEST.dimensions.side;

interface DimensionsSectionProps {
  unit: 'cm' | 'in';
  onToggleUnit: () => void;
}

export const DimensionsSection: React.FC<DimensionsSectionProps> = ({
  unit,
  onToggleUnit,
}) => {
  const [activeDiagramView, setActiveDiagramView] = useState<'front' | 'side'>('front');
  const dims = BRAND_CONFIG.heroProduct.verifiedDimensions;

  const isMetric = unit === 'cm';

  const specs = [
    {
      label: 'Overall Width',
      value: isMetric ? `${dims.metric.width} mm (${dims.metric.width / 10} cm)` : `${dims.imperial.width} in`,
      note: 'Across widest curvature of barrel arms',
    },
    {
      label: 'Overall Depth',
      value: isMetric ? `${dims.metric.depth} mm (${dims.metric.depth / 10} cm)` : `${dims.imperial.depth} in`,
      note: 'From front apron to rear splay extension',
    },
    {
      label: 'Overall Height',
      value: isMetric ? `${dims.metric.height} mm (${dims.metric.height / 10} cm)` : `${dims.imperial.height} in`,
      note: 'From floor to crown of backrest',
    },
    {
      label: 'Seat Height',
      value: isMetric ? `${dims.metric.seatHeight} mm (${dims.metric.seatHeight / 10} cm)` : `${dims.imperial.seatHeight} in`,
      note: 'Unloaded cushion crown (compresses ~25mm in use)',
    },
    {
      label: 'Seat Depth',
      value: isMetric ? `${dims.metric.seatDepth} mm (${dims.metric.seatDepth / 10} cm)` : `${dims.imperial.seatDepth} in`,
      note: 'Ergonomic lumbar contact zone',
    },
    {
      label: 'Armrest Height',
      value: isMetric ? `${dims.metric.armrestHeight} mm (${dims.metric.armrestHeight / 10} cm)` : `${dims.imperial.armrestHeight} in`,
      note: 'Comfortable elbow rest clearance',
    },
    {
      label: 'Net Weight',
      value: isMetric ? dims.metric.weight : dims.imperial.weight,
      note: 'Including solid walnut timber structure',
    },
    {
      label: 'Certification',
      value: 'ANSI/BIFMA X5.4 & EN 16139',
      note: 'Tested for high-traffic commercial & residential durability',
    },
  ];

  return (
    <section id="dimensions" className="py-24 md:py-32 bg-[#F5EFE6] border-t border-[#1C1612]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[#B08D57] block mb-2">
              04. Verified Architecture
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#1C1612] font-medium tracking-tight">
              Calibrated Proportions.
            </h2>
            <p className="mt-3 text-sm text-[#1C1612]/75 max-w-xl">
              Authentic specifications sourced directly from Stellar Works and designer Hallgeir Homstvedt.
              Every curve is measured to ensure harmonious spatial integration.
            </p>
          </div>

          {/* Unit Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#1C1612]/60 uppercase">Unit System:</span>
            <div className="bg-[#E8DCC8] p-1 rounded-sm flex items-center shadow-xs">
              <button
                type="button"
                onClick={() => unit !== 'cm' && onToggleUnit()}
                className={`px-3 py-1.5 text-xs font-mono transition-colors rounded-xs ${
                  unit === 'cm'
                    ? 'bg-[#1C1612] text-[#F5EFE6] font-medium shadow-xs'
                    : 'text-[#1C1612]/70 hover:text-[#1C1612]'
                }`}
              >
                Metric (mm / cm)
              </button>
              <button
                type="button"
                onClick={() => unit !== 'in' && onToggleUnit()}
                className={`px-3 py-1.5 text-xs font-mono transition-colors rounded-xs ${
                  unit === 'in'
                    ? 'bg-[#1C1612] text-[#F5EFE6] font-medium shadow-xs'
                    : 'text-[#1C1612]/70 hover:text-[#1C1612]'
                }`}
              >
                Imperial (in / lbs)
              </button>
            </div>
          </div>
        </div>

        {/* 12-Column Grid: Left Diagram with Architectural Measurement Hairlines, Right Spec List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Visual Architectural Schematic Diagram */}
          <div className="lg:col-span-6 bg-[#EFE8DD] border border-[#1C1612]/15 rounded-xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ruler size={16} className="text-[#B08D57]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#4A3222] font-semibold">
                  Architectural Schematic
                </span>
              </div>

              {/* View Switcher: Front vs Side */}
              <div className="flex items-center gap-1 bg-[#E0D4C3] p-1 rounded-md text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveDiagramView('front')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeDiagramView === 'front' ? 'bg-[#1C1612] text-[#F5EFE6]' : 'text-[#1C1612]/70'
                  }`}
                >
                  Front Elevation
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDiagramView('side')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeDiagramView === 'side' ? 'bg-[#1C1612] text-[#F5EFE6]' : 'text-[#1C1612]/70'
                  }`}
                >
                  Side Profile
                </button>
              </div>
            </div>

            {/* Diagram Display Container with Dimension Callout Hairlines */}
            <div className="relative aspect-4/3 bg-white/70 rounded-lg border border-[#1C1612]/10 p-6 flex items-center justify-center overflow-hidden">
              <img
                src={activeDiagramView === 'front' ? frontImg : sideImg}
                alt={`ARC Lounge Chair architectural schematic - ${activeDiagramView} view`}
                className="max-h-[82%] object-contain drop-shadow-md transition-opacity duration-300"
              />

              {/* Overlaid Dimension Annotation Lines (Front View) */}
              {activeDiagramView === 'front' ? (
                <>
                  {/* Top Width Dimension Line */}
                  <div className="absolute top-4 left-12 right-12 flex flex-col items-center">
                    <div className="w-full flex items-center">
                      <div className="w-2 h-2 border-l border-t border-[#B08D57] transform rotate-45" />
                      <div className="flex-1 h-px bg-[#B08D57]" />
                      <div className="w-2 h-2 border-r border-b border-[#B08D57] transform rotate-45" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[#1C1612] bg-[#EFE8DD] px-2 py-0.5 rounded mt-1 border border-[#B08D57]/40 shadow-xs">
                      Width: {isMetric ? '900 mm (90 cm)' : '35.4 in'}
                    </span>
                  </div>

                  {/* Left Height Dimension Line */}
                  <div className="absolute left-3 top-10 bottom-6 flex items-center">
                    <div className="h-full flex flex-col items-center">
                      <div className="w-2 h-2 border-l border-t border-[#B08D57] transform rotate-45" />
                      <div className="w-px flex-1 bg-[#B08D57]" />
                      <div className="w-2 h-2 border-r border-b border-[#B08D57] transform rotate-45" />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-[#1C1612] bg-[#EFE8DD] px-1.5 py-0.5 rounded -rotate-90 whitespace-nowrap border border-[#B08D57]/40">
                      Height: {isMetric ? '785 mm' : '30.9 in'}
                    </span>
                  </div>

                  {/* Right Seat Height Callout */}
                  <div className="absolute right-3 bottom-14 flex items-center gap-1.5">
                    <div className="w-6 h-px bg-[#4A3222]" />
                    <span className="text-[10px] font-mono text-[#4A3222] bg-[#EFE8DD] px-2 py-0.5 rounded border border-[#4A3222]/30">
                      Seat: {isMetric ? '395 mm' : '15.6 in'}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {/* Bottom Depth Dimension Line */}
                  <div className="absolute bottom-3 left-14 right-14 flex flex-col items-center">
                    <div className="w-full flex items-center">
                      <div className="w-2 h-2 border-l border-t border-[#B08D57] transform rotate-45" />
                      <div className="flex-1 h-px bg-[#B08D57]" />
                      <div className="w-2 h-2 border-r border-b border-[#B08D57] transform rotate-45" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[#1C1612] bg-[#EFE8DD] px-2 py-0.5 rounded mt-1 border border-[#B08D57]/40 shadow-xs">
                      Depth: {isMetric ? '855 mm (85.5 cm)' : '33.7 in'}
                    </span>
                  </div>

                  {/* Armrest Height Callout */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-[#4A3222] bg-[#EFE8DD] px-2 py-0.5 rounded border border-[#4A3222]/30">
                      Arm: {isMetric ? '580 mm' : '22.8 in'}
                    </span>
                    <div className="w-6 h-px bg-[#4A3222]" />
                  </div>
                </>
              )}
            </div>

            {/* Design & Origin Citation */}
            <div className="flex items-center justify-between text-xs font-mono text-[#1C1612]/70 pt-2 border-t border-[#1C1612]/10">
              <span>Original Designer: <strong>Hallgeir Homstvedt</strong></span>
              <span>Manufacturer: <strong>Stellar Works</strong></span>
            </div>
          </div>

          {/* Right Column: Verified Specifications Table */}
          <div className="lg:col-span-6 space-y-6">
            <div className="border-t border-[#1C1612]/20">
              {specs.map((item, idx) => (
                <div
                  key={idx}
                  className="py-3.5 border-b border-[#1C1612]/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                >
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-[#1C1612] font-semibold block">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-[#1C1612]/60 font-sans block">
                      {item.note}
                    </span>
                  </div>
                  <span className="text-sm font-mono font-medium text-[#4A3222] tabular-nums whitespace-nowrap">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Material Construction Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white/60 border border-[#1C1612]/10 rounded-lg">
                <div className="flex items-center gap-2 mb-1.5">
                  <Layers size={14} className="text-[#B08D57]" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#1C1612]">
                    Internal Armature
                  </span>
                </div>
                <p className="text-xs text-[#1C1612]/75 leading-relaxed">
                  Precision curved molded veneer core with high-resilience bio-polyurethane foam envelope for permanent dimensional integrity.
                </p>
              </div>

              <div className="p-4 bg-white/60 border border-[#1C1612]/10 rounded-lg">
                <div className="flex items-center gap-2 mb-1.5">
                  <Compass size={14} className="text-[#B08D57]" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#1C1612]">
                    Solid Timber Base
                  </span>
                </div>
                <p className="text-xs text-[#1C1612]/75 leading-relaxed">
                  FSC-certified kiln-dried American walnut or European oak with mortise-and-tenon structural joints and machined brass ferrules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
