/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { BRAND_CONFIG, FabricSwatch, WoodSwatch, RoomScene } from './data/config';
import { HeroProductViewer } from './components/HeroProductViewer';
import { Navigation } from './components/Navigation';
import { CustomizerPanel } from './components/CustomizerPanel';
import { DimensionsSection } from './components/DimensionsSection';
import { RoomScenesSection } from './components/RoomScenesSection';
import { CraftSection } from './components/CraftSection';
import { GallerySection } from './components/GallerySection';
import { SocialProofSection } from './components/SocialProofSection';
import { PhilosophySection } from './components/PhilosophySection';
import { FooterSection } from './components/FooterSection';
import { MarqueeStrip } from './components/MarqueeStrip';
import { LeadReserveModal } from './components/LeadReserveModal';
import { preloadCriticalAssets } from './data/assetManifest';
import { ArrowDown } from 'lucide-react';

export default function App() {
  // Customizer selections (synced with URL search params)
  const [selectedFabric, setSelectedFabric] = useState<FabricSwatch>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const fId = params.get('fabric');
      const found = BRAND_CONFIG.fabrics.find((f) => f.id === fId);
      if (found) return found;
    }
    return BRAND_CONFIG.fabrics[0];
  });

  const [selectedWood, setSelectedWood] = useState<WoodSwatch>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const wId = params.get('wood');
      const found = BRAND_CONFIG.woods.find((w) => w.id === wId);
      if (found) return found;
    }
    return BRAND_CONFIG.woods[0];
  });

  // Preload critical assets on initial load
  useEffect(() => {
    preloadCriticalAssets();
  }, []);

  // Sync state to URL search params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('fabric', selectedFabric.id);
      url.searchParams.set('wood', selectedWood.id);
      window.history.replaceState({}, '', url.toString());
    }
  }, [selectedFabric, selectedWood]);

  // Copy shareable link feedback
  const [shareCopied, setShareCopied] = useState(false);
  const handleShareConfig = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2400);
    }
  };

  // Dimensions unit toggle state ('cm' for metric mm/cm, 'in' for imperial)
  const [dimensionUnit, setDimensionUnit] = useState<'cm' | 'in'>('cm');

  // Pinned Room Scene state
  const [activeRoomScene, setActiveRoomScene] = useState<RoomScene>(BRAND_CONFIG.roomScenes[0]);

  // Modals state
  const [isReserveOpen, setIsReserveOpen] = useState(false);

  // Calculate live total price
  const totalPrice = useMemo(() => {
    return BRAND_CONFIG.heroProduct.basePrice + selectedFabric.priceModifier + selectedWood.priceModifier;
  }, [selectedFabric, selectedWood]);

  return (
    <div className="relative min-h-screen bg-[#F5EFE6] text-[#1C1612] font-sans selection:bg-[#4A3222] selection:text-[#F5EFE6] overflow-x-hidden">
      {/* 1. Subtle Analog Film Grain Overlay */}
      <div className="film-grain" />

      {/* 2. Top Navigation Bar */}
      <Navigation
        currentPrice={totalPrice}
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenCustomizer={() => {
          document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Main Page Structure */}
      <main className="relative z-20">
        {/* SECTION 1: HERO VIEWPORT WITH SPLIT LAYOUT */}
        <section className="relative min-h-screen pt-28 pb-12 px-6 sm:px-10 md:px-14 flex flex-col justify-between max-w-7xl mx-auto">
          {/* 12-Column Split Hero Layout: Left Content, Right Interactive Product Viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
            {/* Left Column: Headline, Designer Specs, Pricing, CTAs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B08D57] block font-semibold">
                  {BRAND_CONFIG.heroProduct.edition} · {BRAND_CONFIG.heroProduct.designer}
                </span>
                <span className="text-xs font-mono text-[#1C1612]/60 uppercase tracking-wider block">
                  Manufactured by {BRAND_CONFIG.heroProduct.manufacturer}
                </span>
              </div>

              <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-[#1C1612] font-light">
                ARC Lounge Chair
              </h1>

              <p className="text-sm sm:text-base text-[#1C1612]/80 leading-relaxed font-sans max-w-lg">
                {BRAND_CONFIG.heroProduct.leadDescription}
              </p>

              {/* Price & Lead Time Badge with Zero-Risk Purchase Reassurance */}
              <div className="pt-2 flex flex-col gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-medium text-[#1C1612] tabular-nums">
                    ${totalPrice.toLocaleString()} USD
                  </span>
                  <span className="text-xs font-mono text-[#4A3222] bg-[#E8DCC8] px-2.5 py-1 rounded-sm">
                    {BRAND_CONFIG.heroProduct.leadTime}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#4A3222]/80 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span>✓ Complimentary White-Glove In-Home Placement</span>
                  <span className="text-[#B08D57]">·</span>
                  <span>✓ 30-Day In-Home Trial</span>
                  <span className="text-[#B08D57]">·</span>
                  <span>✓ 10-Yr Guarantee</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsReserveOpen(true)}
                  className="px-6 py-3.5 bg-[#1C1612] text-[#F5EFE6] text-xs font-mono uppercase tracking-widest rounded-sm hover:bg-[#4A3222] transition-colors shadow-md cursor-pointer"
                >
                  Reserve Handcrafted Edition
                </button>

                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 bg-white/70 hover:bg-white border border-[#1C1612]/20 text-[#1C1612] text-xs font-mono uppercase tracking-widest rounded-sm transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>Customize Finishes (4 Textiles · 3 Woods)</span>
                </button>
              </div>

              {/* Verified Dimension Highlights */}
              <div className="pt-4 border-t border-[#1C1612]/10 grid grid-cols-3 gap-3 font-mono text-xs text-[#1C1612]/75">
                <div>
                  <span className="text-[10px] text-[#B08D57] uppercase block">Width</span>
                  <span className="font-medium text-[#1C1612]">900 mm</span> (35.4″)
                </div>
                <div>
                  <span className="text-[10px] text-[#B08D57] uppercase block">Depth</span>
                  <span className="font-medium text-[#1C1612]">855 mm</span> (33.7″)
                </div>
                <div>
                  <span className="text-[10px] text-[#B08D57] uppercase block">Height</span>
                  <span className="font-medium text-[#1C1612]">785 mm</span> (30.9″)
                </div>
              </div>
            </div>

            {/* Right Column: Premium Lightweight Interactive Multi-Angle Product Viewer */}
            <div className="lg:col-span-7">
              <HeroProductViewer
                selectedFabric={selectedFabric}
                onSelectFabric={setSelectedFabric}
                selectedWood={selectedWood}
                onSelectWood={setSelectedWood}
              />
            </div>
          </div>

          {/* Bottom Hero Metadata & Scroll Cue */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-10 border-t border-[#1C1612]/10 mt-8">
            <div className="text-xs font-mono text-[#1C1612]/70 space-y-0.5">
              <div>Seating Height: 395 mm (15.6″) · Solid Hardwood Frame</div>
              <div>Certified ANSI/BIFMA X5.4 & EN 16139 Standard</div>
            </div>

            <a
              href="#philosophy"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1C1612]/60 hover:text-[#1C1612] transition-colors"
            >
              <span>Explore design & craft</span>
              <ArrowDown size={14} />
            </a>
          </div>
        </section>

        {/* SECTION 2: PHILOSOPHY */}
        <PhilosophySection />

        {/* MARQUEE TICKER */}
        <MarqueeStrip />

        {/* SECTION 3: LIVE CUSTOMIZER */}
        <section
          id="customizer"
          className="relative py-24 md:py-36 min-h-screen flex items-center justify-center px-6 md:px-12 bg-[#F5EFE6]"
        >
          <CustomizerPanel
            selectedFabric={selectedFabric}
            selectedWood={selectedWood}
            onSelectFabric={setSelectedFabric}
            onSelectWood={setSelectedWood}
            totalPrice={totalPrice}
            onOpenReserve={() => setIsReserveOpen(true)}
            onShareConfig={handleShareConfig}
            shareCopied={shareCopied}
          />
        </section>

        {/* SECTION 4: VERIFIED ARCHITECTURAL DIMENSIONS */}
        <DimensionsSection
          unit={dimensionUnit}
          onToggleUnit={() => setDimensionUnit(dimensionUnit === 'cm' ? 'in' : 'cm')}
        />

        {/* SECTION 5: ROOM SCENES & IN SITU PREVIEWS */}
        <RoomScenesSection
          activeRoomScene={activeRoomScene}
          onSelectScene={setActiveRoomScene}
          selectedFabric={selectedFabric}
          onSelectFabric={setSelectedFabric}
          selectedWood={selectedWood}
          onSelectWood={setSelectedWood}
          onOpenReserve={() => setIsReserveOpen(true)}
        />

        {/* SECTION 6: CRAFT & JOINERY */}
        <CraftSection />

        {/* SECTION 7: COMPLEMENTARY SUITE GALLERY */}
        <GallerySection
          onSelectPiece={() => {
            setIsReserveOpen(true);
          }}
        />

        {/* SECTION 8: SOCIAL PROOF & GUARANTEES */}
        <SocialProofSection />

        {/* SECTION 9: FINAL CTA & FOOTER */}
        <FooterSection onOpenReserve={() => setIsReserveOpen(true)} />
      </main>

      {/* Direct Atelier Reservation Lead Modal */}
      <LeadReserveModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        selectedFabric={selectedFabric}
        selectedWood={selectedWood}
        totalPrice={totalPrice}
      />
    </div>
  );
}
