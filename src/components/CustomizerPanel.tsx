import React from 'react';
import { FabricSwatch, WoodSwatch, BRAND_CONFIG, ProductConfiguration } from '../data/config';
import { getProductImage, preloadUpholsteryPerspectives } from '../data/assetManifest';
import { Check, Share2, Ruler, ArrowRight, ShieldCheck, Eye } from 'lucide-react';

interface CustomizerPanelProps {
  selectedFabric: FabricSwatch;
  selectedWood: WoodSwatch;
  onSelectFabric: (f: FabricSwatch) => void;
  onSelectWood: (w: WoodSwatch) => void;
  totalPrice: number;
  onOpenReserve: () => void;
  onShareConfig: () => void;
  shareCopied: boolean;
}

export const CustomizerPanel: React.FC<CustomizerPanelProps> = ({
  selectedFabric,
  selectedWood,
  onSelectFabric,
  onSelectWood,
  totalPrice,
  onOpenReserve,
  onShareConfig,
  shareCopied,
}) => {
  // Centralized configuration model
  const currentConfig: ProductConfiguration = {
    upholstery: selectedFabric.id,
    woodFinish: selectedWood.id,
  };

  // Preview chair image resolving the exact combination
  const previewChairUrl = getProductImage(selectedFabric.id, 'three_quarter', selectedWood.id);

  return (
    <div className="bg-[#1C1612] text-[#F5EFE6] p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-[#B08D57]/30 max-w-4xl mx-auto w-full">
      {/* Top Header Row */}
      <div className="flex items-start justify-between border-b border-[#F5EFE6]/10 pb-5 mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#B08D57] block">
            Atelier Specification · Hallgeir Homstvedt
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium tracking-tight text-[#F5EFE6]">
            Configure Your ARC Edition
          </h3>
        </div>

        <button
          type="button"
          onClick={onShareConfig}
          className="flex items-center gap-1.5 text-xs text-[#D4C2A6] hover:text-[#F5EFE6] border border-[#D4C2A6]/30 px-3 py-1.5 rounded transition-colors cursor-pointer"
          title="Share custom build link"
        >
          <Share2 size={13} />
          <span className="font-mono text-[10px] uppercase">
            {shareCopied ? 'Link Copied!' : 'Share Build'}
          </span>
        </button>
      </div>

      {/* Selected Finish Preview Card: Reflects BOTH Upholstery and Wood Finish */}
      <div className="mb-8 p-5 rounded-xl bg-[#2A1D14] border border-[#B08D57]/20 flex flex-col md:flex-row items-center gap-6">
        {/* Dual Visual Preview: Chair Silhouette + Leg Detail */}
        <div className="flex items-center gap-3 shrink-0">
          {/* 1. Chair Preview in Selected Upholstery */}
          <div className="w-32 h-28 sm:w-36 sm:h-32 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-2 relative">
            <img
              src={previewChairUrl}
              alt={`${BRAND_CONFIG.heroProduct.name} in ${selectedFabric.name}`}
              className="w-full h-full object-contain filter brightness-98 transition-all duration-200"
            />
            <span className="absolute bottom-1.5 left-2 text-[9px] font-mono uppercase bg-black/70 px-1.5 py-0.5 rounded text-[#D4C2A6]">
              {selectedFabric.name.split(' ')[0]}
            </span>
          </div>

          {/* 2. Authentic Wood Leg Joinery & Brass Ferrule Preview */}
          <div className="w-32 h-28 sm:w-36 sm:h-32 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center relative">
            <img
              src={selectedWood.imageUrl}
              alt={`Solid ${selectedWood.name} leg with brass ferrule`}
              className="w-full h-full object-cover filter brightness-95 transition-all duration-200"
            />
            <span className="absolute bottom-1.5 left-2 text-[9px] font-mono uppercase bg-black/70 px-1.5 py-0.5 rounded text-[#D4C2A6]">
              {selectedWood.name.split(' ')[0]} Timber
            </span>
          </div>
        </div>

        {/* Configuration Summary Specifications */}
        <div className="space-y-2 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-[10px] font-mono uppercase text-[#B08D57] tracking-wider px-2 py-0.5 rounded bg-[#B08D57]/15 border border-[#B08D57]/30">
              Active Specification
            </span>
            <span className="text-[10px] font-mono text-[#D4C2A6]/60">
              ID: {currentConfig.upholstery} / {currentConfig.woodFinish}
            </span>
          </div>

          <h4 className="font-serif-luxury text-2xl text-[#F5EFE6] font-medium leading-tight">
            {BRAND_CONFIG.heroProduct.name}
          </h4>

          <div className="text-xs text-[#D4C2A6] space-y-1">
            <div>
              <span className="text-white/60">Textile:</span> {selectedFabric.name} ({selectedFabric.composition})
            </div>
            <div>
              <span className="text-white/60">Base Frame:</span> Solid {selectedWood.name} with Brushed Brass Ferrules
            </div>
            <div className="text-[11px] font-mono text-[#B08D57] pt-0.5">
              Source: {selectedWood.timberSource} · Abrasion: {selectedFabric.martindale}
            </div>
          </div>
        </div>

        {/* Total Price & CTA in card */}
        <div className="text-center md:text-right shrink-0 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-6 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#D4C2A6]/70">
            Current Price
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-medium text-[#F5EFE6] tabular-nums">
            ${totalPrice.toLocaleString()} <span className="text-xs text-[#D4C2A6]">USD</span>
          </div>
          <button
            type="button"
            onClick={onOpenReserve}
            className="w-full px-5 py-2.5 bg-[#B08D57] hover:bg-[#C9A063] text-[#1C1612] font-semibold text-xs font-mono uppercase tracking-wider rounded transition-colors shadow-md cursor-pointer"
          >
            Reserve Build
          </button>
        </div>
      </div>

      {/* 1. Fabric Selection Swatches */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <label className="text-xs font-mono uppercase tracking-wider text-[#D4C2A6]">
            01. Upholstery Textile
          </label>
          <span className="text-xs text-[#B08D57] font-medium">
            {selectedFabric.name}
            {selectedFabric.priceModifier > 0 && ` (+$${selectedFabric.priceModifier})`}
          </span>
        </div>

        <p className="text-[11px] text-[#D4C2A6]/70 mb-3 leading-relaxed">
          {selectedFabric.description} · <span className="font-mono text-[#E8DCC8]">{selectedFabric.composition}</span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BRAND_CONFIG.fabrics.map((fabric) => {
            const isSelected = fabric.id === selectedFabric.id;
            return (
              <button
                key={fabric.id}
                type="button"
                onClick={() => {
                  onSelectFabric(fabric);
                  preloadUpholsteryPerspectives(fabric.id);
                }}
                className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#B08D57] bg-[#F5EFE6]/10 shadow-sm ring-1 ring-[#B08D57]'
                    : 'border-[#F5EFE6]/15 hover:border-[#D4C2A6]/50 bg-black/20'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2.5">
                  <span
                    className="w-6 h-6 rounded-full border border-black/30 shadow-inner shrink-0"
                    style={{ backgroundColor: fabric.hex }}
                  />
                  {isSelected && <Check size={14} className="text-[#B08D57]" />}
                </div>
                <span className="text-xs font-medium text-[#F5EFE6] truncate w-full">
                  {fabric.name}
                </span>
                <span className="text-[10px] font-mono text-[#D4C2A6]/70">
                  {fabric.priceModifier === 0 ? 'Included' : `+$${fabric.priceModifier}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Solid Wood Legs Selection */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <label className="text-xs font-mono uppercase tracking-wider text-[#D4C2A6]">
            02. Solid Hardwood Legs & Base Frame
          </label>
          <span className="text-xs text-[#B08D57] font-medium">
            {selectedWood.name}
            {selectedWood.priceModifier > 0 && ` (+$${selectedWood.priceModifier})`}
          </span>
        </div>

        <p className="text-[11px] text-[#D4C2A6]/70 mb-3 leading-relaxed">
          {selectedWood.description} · <span className="font-mono text-[#E8DCC8]">{selectedWood.timberSource}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BRAND_CONFIG.woods.map((wood) => {
            const isSelected = wood.id === selectedWood.id;
            return (
              <button
                key={wood.id}
                type="button"
                onClick={() => onSelectWood(wood)}
                className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#B08D57] bg-[#F5EFE6]/10 shadow-sm ring-1 ring-[#B08D57]'
                    : 'border-[#F5EFE6]/15 hover:border-[#D4C2A6]/50 bg-black/20'
                }`}
              >
                {/* Photo thumbnail of the actual leg finish */}
                <div className="w-12 h-12 rounded overflow-hidden bg-black/40 border border-white/10 shrink-0">
                  <img
                    src={wood.imageUrl}
                    alt={wood.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-medium text-[#F5EFE6] truncate">
                      {wood.name}
                    </span>
                    {isSelected && <Check size={14} className="text-[#B08D57] shrink-0" />}
                  </div>
                  <span className="text-[10px] font-mono text-[#D4C2A6]/70 block">
                    {wood.priceModifier === 0 ? 'Included' : `+$${wood.priceModifier}`}
                  </span>
                  <span className="text-[9px] font-mono text-[#B08D57]/90 block truncate">
                    {wood.timberSource.split(' ')[0]} {wood.timberSource.split(' ')[1]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zero-Risk Purchase Reassurance Strip */}
      <div className="pt-6 pb-2 border-t border-[#F5EFE6]/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-mono text-[#D4C2A6]/85">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <ShieldCheck size={14} className="text-[#B08D57] shrink-0" />
          <span>10-Yr Frame Guarantee</span>
        </div>
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="text-[#B08D57] font-bold text-xs">✓</span>
          <span>White-Glove Placement Included</span>
        </div>
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="text-[#B08D57] font-bold text-xs">✓</span>
          <span>30-Day Risk-Free Trial</span>
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href="#rooms"
          className="flex items-center gap-2 text-xs font-mono text-[#D4C2A6] hover:text-[#F5EFE6] border border-[#D4C2A6]/30 px-4 py-2 rounded transition-colors cursor-pointer w-full sm:w-auto justify-center"
        >
          <Eye size={13} className="text-[#B08D57]" />
          <span>View In 7 Curated Spaces</span>
        </a>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-[#D4C2A6]/70 block">
              Total with Finishes
            </span>
            <span className="font-mono text-xl font-medium text-[#F5EFE6] tabular-nums">
              ${totalPrice.toLocaleString()} USD
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenReserve}
            className="px-6 py-3 bg-[#B08D57] hover:bg-[#C9A063] text-[#1C1612] font-semibold text-xs font-mono uppercase tracking-wider rounded transition-colors shadow-md cursor-pointer flex items-center gap-2"
          >
            <span>Reserve Custom Build</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
