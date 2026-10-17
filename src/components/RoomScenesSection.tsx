import React, { useState, useEffect, useRef } from 'react';
import { RoomScene, BRAND_CONFIG, FabricSwatch, WoodSwatch } from '../data/config';
import { preloadImage } from '../data/assetManifest';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Compass,
  Check,
  ArrowRight,
  Info,
  Clock,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

interface RoomScenesSectionProps {
  activeRoomScene: RoomScene;
  onSelectScene: (scene: RoomScene) => void;
  selectedFabric: FabricSwatch;
  onSelectFabric: (f: FabricSwatch) => void;
  selectedWood: WoodSwatch;
  onSelectWood: (w: WoodSwatch) => void;
  onOpenReserve?: () => void;
}

export const RoomScenesSection: React.FC<RoomScenesSectionProps> = ({
  activeRoomScene,
  onSelectScene,
  selectedFabric,
  onSelectFabric,
  selectedWood,
  onSelectWood,
  onOpenReserve,
}) => {
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspotIdx, setActiveHotspotIdx] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scenes = BRAND_CONFIG.roomScenes;
  const currentIdx = scenes.findIndex((s) => s.id === activeRoomScene.id);
  const safeIdx = currentIdx >= 0 ? currentIdx : 0;
  const currentScene = scenes[safeIdx] || scenes[0];

  // Preload adjacent room images
  useEffect(() => {
    const nextIdx = (safeIdx + 1) % scenes.length;
    const prevIdx = (safeIdx - 1 + scenes.length) % scenes.length;
    preloadImage(scenes[nextIdx].url);
    preloadImage(scenes[prevIdx].url);
  }, [safeIdx, scenes]);

  // Navigate scenes with transition
  const handleSwitchScene = (nextScene: RoomScene) => {
    if (nextScene.id === currentScene.id) return;
    setIsTransitioning(true);
    setActiveHotspotIdx(null);
    onSelectScene(nextScene);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 150);
    return () => clearTimeout(timer);
  };

  const handleNext = () => {
    const nextIdx = (safeIdx + 1) % scenes.length;
    handleSwitchScene(scenes[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (safeIdx - 1 + scenes.length) % scenes.length;
    handleSwitchScene(scenes[prevIdx]);
  };

  // Keyboard navigation when section is in view or lightbox is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') setIsLightboxOpen(false);
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, safeIdx]);

  // Handle "Configure This Finish": update fabric and wood, scroll to customizer
  const handleConfigureDepictedFinish = () => {
    const matchingFabric = BRAND_CONFIG.fabrics.find(
      (f) => f.id === currentScene.depictedFabricId
    );
    const matchingWood = BRAND_CONFIG.woods.find(
      (w) => w.id === currentScene.depictedWoodId
    );

    if (matchingFabric) onSelectFabric(matchingFabric);
    if (matchingWood) onSelectWood(matchingWood);

    const customizerEl = document.getElementById('customizer');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Calculate live price for the depicted finish
  const depictedFabric =
    BRAND_CONFIG.fabrics.find((f) => f.id === currentScene.depictedFabricId) ||
    BRAND_CONFIG.fabrics[0];
  const depictedWood =
    BRAND_CONFIG.woods.find((w) => w.id === currentScene.depictedWoodId) ||
    BRAND_CONFIG.woods[0];
  const depictedPrice =
    BRAND_CONFIG.heroProduct.basePrice +
    depictedFabric.priceModifier +
    depictedWood.priceModifier;

  return (
    <section
      id="rooms"
      ref={containerRef}
      className="relative py-24 sm:py-32 md:py-40 bg-[#16120F] text-[#F5EFE6] border-t border-[#F5EFE6]/10 overflow-hidden"
    >
      {/* Subtle warm background lighting gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(176,141,87,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B08D57] font-semibold">
                Atmosphere & Living Spaces
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F5EFE6] leading-[1.05]">
              Designed to Belong.
            </h2>
            <p className="text-sm sm:text-base text-[#D4C2A6]/80 leading-relaxed font-sans">
              From sunlit travertine living rooms and contemplative reading sanctuaries to organic Japandi interiors and classic Haussmann apartments—experience how the ARC Lounge Chair’s sculptural barrel curve commands presence while seamlessly honoring its environment.
            </p>
          </div>

          {/* Quick Actions & Hotspot Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowHotspots(!showHotspots)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                showHotspots
                  ? 'bg-[#B08D57]/20 text-[#E8DCC8] border border-[#B08D57]/40 shadow-xs'
                  : 'bg-white/5 text-[#D4C2A6]/60 border border-white/10 hover:text-[#F5EFE6]'
              }`}
              title="Toggle interactive design hotspots on the photograph"
            >
              <Info size={13} className={showHotspots ? 'text-[#B08D57]' : ''} />
              <span>{showHotspots ? 'Hotspots Active' : 'Show Notes'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#B08D57] hover:bg-[#C9A063] text-[#16120F] text-xs font-mono font-semibold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
            >
              <Maximize2 size={13} />
              <span>Fullscreen Gallery</span>
            </button>
          </div>
        </div>

        {/* Space Selector Tabs (5 Curated Architectural Directions) */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/10">
          {scenes.map((scene, idx) => {
            const isSelected = scene.id === currentScene.id;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => handleSwitchScene(scene)}
                className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-left transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'border-[#B08D57] bg-[#2A1D14] ring-1 ring-[#B08D57] shadow-lg'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <span
                  className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                    isSelected ? 'text-[#B08D57]' : 'text-white/40 group-hover:text-white/60'
                  }`}
                >
                  0{idx + 1}
                </span>
                <span
                  className={`text-xs sm:text-sm font-medium transition-colors ${
                    isSelected ? 'text-[#F5EFE6]' : 'text-[#D4C2A6]/80 group-hover:text-[#F5EFE6]'
                  }`}
                >
                  {scene.title}
                </span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />}
              </button>
            );
          })}
        </div>

        {/* Main Showcase Grid: Large Lifestyle Visual on Left (16:9), Architectural Breakdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Main Visual Frame (16:9 Cinematic Photography) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="relative w-full aspect-16/9 sm:aspect-16/9 rounded-2xl overflow-hidden border border-[#B08D57]/30 bg-black shadow-2xl group select-none">
              {/* Primary Interior Photograph */}
              <img
                src={currentScene.url}
                alt={`${BRAND_CONFIG.heroProduct.name} in ${currentScene.title} (${currentScene.depictedFabricName})`}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isTransitioning ? 'opacity-70 scale-101' : 'opacity-100 scale-100'
                }`}
                loading="eager"
                decoding="async"
              />

              {/* Subtle Vignette & Contrast Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Top Bar inside image: Scene Title & Lightbox Trigger */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-auto">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[#F5EFE6]">
                  <Compass size={12} className="text-[#B08D57]" />
                  <span className="text-[11px] font-mono tracking-wider uppercase">
                    {currentScene.title}
                  </span>
                  <span className="text-white/30 font-mono text-[10px]">·</span>
                  <span className="text-[10px] font-mono text-[#D4C2A6]/80">
                    {currentScene.subtitle}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="flex items-center gap-1.5 bg-black/60 hover:bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[#F5EFE6] text-xs font-mono transition-colors shadow-sm cursor-pointer"
                  title="Expand to full screen high-resolution view"
                >
                  <Maximize2 size={12} />
                  <span className="hidden sm:inline">Inspect Fullscreen</span>
                </button>
              </div>

              {/* Interactive Design Hotspots */}
              {showHotspots &&
                currentScene.hotspots?.map((spot, idx) => {
                  const isActive = activeHotspotIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="absolute z-20"
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveHotspotIdx(isActive ? null : idx)}
                        onMouseEnter={() => setActiveHotspotIdx(idx)}
                        className="relative -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#16120F]/90 text-[#B08D57] border border-[#B08D57] flex items-center justify-center transition-transform hover:scale-125 focus:scale-125 shadow-xl cursor-pointer"
                        aria-label={spot.title}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
                        <span className="absolute inset-0 rounded-full bg-[#B08D57]/30 animate-ping" />
                      </button>

                      {/* Hotspot Tooltip */}
                      {isActive && (
                        <div
                          className="absolute z-30 w-64 -translate-x-1/2 mt-3 p-3.5 rounded-xl bg-[#16120F]/95 backdrop-blur-md border border-[#B08D57]/50 shadow-2xl text-left pointer-events-auto animate-fade-in"
                          style={{
                            left: spot.x > 75 ? '-6rem' : spot.x < 25 ? '6rem' : '0',
                          }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] font-semibold">
                              Specification Note
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveHotspotIdx(null)}
                              className="text-white/40 hover:text-white"
                            >
                              <X size={11} />
                            </button>
                          </div>
                          <h4 className="font-serif-luxury text-sm font-medium text-[#F5EFE6] leading-tight mb-1">
                            {spot.title}
                          </h4>
                          <p className="text-[11px] text-[#D4C2A6] leading-relaxed font-sans">
                            {spot.note}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}

              {/* Bottom Metadata Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-auto">
                <div className="bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 max-w-lg">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Clock size={11} className="text-[#B08D57]" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4C2A6]">
                      {currentScene.timeOfDay} · {currentScene.lightTemp}
                    </span>
                  </div>
                  <p className="text-xs text-[#F5EFE6] font-sans leading-snug">
                    {currentScene.caption}
                  </p>
                </div>

                {/* Left & Right Scene Navigation Arrows */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-[#F5EFE6] border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                    aria-label="Previous interior scene"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-[#F5EFE6] border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                    aria-label="Next interior scene"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Specification & Conversion Card (Right Column) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#1E1813] border border-[#B08D57]/30 shadow-xl">
            <div className="space-y-6">
              {/* Header: Depicted Finish Badge */}
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] block mb-1">
                  Depicted Atelier Finish
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#F5EFE6] leading-tight">
                  {currentScene.depictedFabricName}
                </h3>
                <span className="text-xs font-mono text-[#D4C2A6] block mt-0.5">
                  paired with Solid {currentScene.depictedWoodName}
                </span>
              </div>

              {/* Swatches & Material Specs */}
              <div className="space-y-3.5">
                {/* Textile Swatch */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/10">
                  <span
                    className="w-8 h-8 rounded-full border border-black/40 shadow-inner shrink-0"
                    style={{ backgroundColor: depictedFabric.hex }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-medium text-[#F5EFE6] truncate">
                        {depictedFabric.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#D4C2A6]/70">
                        {depictedFabric.priceModifier === 0 ? 'Included' : `+$${depictedFabric.priceModifier}`}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#B08D57] block truncate">
                      {depictedFabric.composition}
                    </span>
                  </div>
                </div>

                {/* Wood Frame Swatch */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/10">
                  <div className="w-8 h-8 rounded overflow-hidden border border-white/15 shrink-0 bg-black/50">
                    <img
                      src={depictedWood.imageUrl}
                      alt={depictedWood.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-medium text-[#F5EFE6] truncate">
                        Solid {depictedWood.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#D4C2A6]/70">
                        {depictedWood.priceModifier === 0 ? 'Included' : `+$${depictedWood.priceModifier}`}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#B08D57] block truncate">
                      {depictedWood.timberSource} · Brass Ferrules
                    </span>
                  </div>
                </div>
              </div>

              {/* Architectural Harmony Highlights */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4C2A6]/60 block mb-2">
                  Architectural Composition
                </span>
                <ul className="space-y-1.5 text-xs text-[#D4C2A6] font-sans">
                  {currentScene.architecturalDetails?.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#B08D57] mt-1.5 shrink-0" />
                      <span className="leading-tight">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price & Primary Call-to-Actions */}
            <div className="mt-8 pt-5 border-t border-white/10 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4C2A6]/70 block">
                    Specification Price
                  </span>
                  <div className="font-mono text-2xl font-medium text-[#F5EFE6] tabular-nums">
                    ${depictedPrice.toLocaleString()} <span className="text-xs text-[#D4C2A6]">USD</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#B08D57] bg-[#B08D57]/15 px-2.5 py-1 rounded">
                  {BRAND_CONFIG.heroProduct.leadTime.split('(')[0]}
                </span>
              </div>

              {/* Primary Conversion CTA: Configure This Exact Finish */}
              <button
                type="button"
                onClick={handleConfigureDepictedFinish}
                className="w-full py-3.5 px-4 rounded-sm bg-[#B08D57] hover:bg-[#C9A063] text-[#16120F] font-semibold text-xs font-mono uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Configure This Edition</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: Direct Atelier Reservation */}
              {onOpenReserve && (
                <button
                  type="button"
                  onClick={() => {
                    const matchingFabric = BRAND_CONFIG.fabrics.find(
                      (f) => f.id === currentScene.depictedFabricId
                    );
                    const matchingWood = BRAND_CONFIG.woods.find(
                      (w) => w.id === currentScene.depictedWoodId
                    );
                    if (matchingFabric) onSelectFabric(matchingFabric);
                    if (matchingWood) onSelectWood(matchingWood);
                    onOpenReserve();
                  }}
                  className="w-full py-2.5 px-4 rounded-sm bg-white/5 hover:bg-white/10 text-[#F5EFE6] border border-white/20 font-medium text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Reserve This Depicted Chair
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filmstrip Scene Gallery (Visual Index of All 5 Environments) */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4C2A6]/70">
              Browse All Architectural Editions (0{safeIdx + 1} / 0{scenes.length})
            </span>
            <span className="text-[11px] font-mono text-[#B08D57]">
              Click any interior to explore
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {scenes.map((scene, idx) => {
              const isSelected = scene.id === currentScene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleSwitchScene(scene)}
                  className={`group relative rounded-xl overflow-hidden border text-left transition-all cursor-pointer aspect-4/3 flex flex-col justify-end p-3 ${
                    isSelected
                      ? 'border-[#B08D57] ring-2 ring-[#B08D57] shadow-xl'
                      : 'border-white/10 hover:border-white/30 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={scene.url}
                    alt={scene.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                  <div className="relative z-10 space-y-0.5">
                    <span className="text-[9px] font-mono tracking-widest text-[#B08D57] uppercase block">
                      Scene 0{idx + 1}
                    </span>
                    <h5 className="font-serif-luxury text-xs text-[#F5EFE6] font-medium leading-tight truncate">
                      {scene.title}
                    </h5>
                    <span className="text-[9px] font-mono text-[#D4C2A6]/80 block truncate">
                      {scene.depictedFabricName.split(' ')[0]} + {scene.depictedWoodName.split(' ')[0]}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#B08D57] shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0C0A09]/98 backdrop-blur-2xl flex flex-col h-screen w-screen overflow-hidden select-none animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          {/* Fixed Top Bar (Guaranteed on top of image, never obscured) */}
          <header className="shrink-0 z-40 bg-[#16120F]/95 backdrop-blur-md border-b border-white/15 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-lg">
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] font-semibold truncate">
                  Architectural View · Scene 0{safeIdx + 1} of 0{scenes.length}
                </span>
              </div>
              <h3 className="font-serif-luxury text-lg sm:text-2xl text-[#F5EFE6] truncate leading-tight">
                {currentScene.title} <span className="hidden md:inline text-white/40 font-light">— {currentScene.subtitle}</span>
              </h3>
            </div>

            {/* Top Bar Action Controls: Prev, Next, and Exit */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Header Navigation Controls (Desktop & Mobile) */}
              <div className="flex items-center bg-white/5 border border-white/15 rounded-md p-1 shadow-sm">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-2.5 sm:px-3 py-1.5 rounded text-xs font-mono text-[#F5EFE6] hover:bg-[#B08D57] hover:text-[#16120F] flex items-center gap-1 transition-colors cursor-pointer"
                  title="Previous image (Left Arrow key)"
                  aria-label="Previous scene"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <span className="text-white/20 px-1 font-mono text-xs">|</span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-2.5 sm:px-3 py-1.5 rounded text-xs font-mono text-[#F5EFE6] hover:bg-[#B08D57] hover:text-[#16120F] flex items-center gap-1 transition-colors cursor-pointer"
                  title="Next image (Right Arrow key)"
                  aria-label="Next scene"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Exit Fullscreen Button with High Contrast & Guaranteed Prominence */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="px-3.5 sm:px-4 py-2 bg-[#B08D57] hover:bg-[#C9A063] active:bg-[#977644] text-[#16120F] font-mono text-xs font-semibold uppercase tracking-wider rounded-md flex items-center gap-1.5 transition-all shadow-md cursor-pointer border border-[#C9A063]"
                title="Exit Fullscreen (Escape key)"
                aria-label="Exit fullscreen viewer"
              >
                <X size={16} className="shrink-0" />
                <span className="hidden xs:inline sm:inline">Exit</span>
              </button>
            </div>
          </header>

          {/* Fullscreen Image Canvas Stage */}
          <div className="relative flex-1 min-h-0 w-full flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden bg-black/40">
            {/* Flanking Floating Previous Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#16120F]/90 hover:bg-[#B08D57] text-[#F5EFE6] hover:text-[#16120F] border border-[#B08D57]/40 hover:border-[#B08D57] flex items-center justify-center transition-all shadow-2xl cursor-pointer hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
              aria-label="Previous image"
              title="Previous scene (Left Arrow key)"
            >
              <ChevronLeft size={22} className="transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Flanking Floating Next Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#16120F]/90 hover:bg-[#B08D57] text-[#F5EFE6] hover:text-[#16120F] border border-[#B08D57]/40 hover:border-[#B08D57] flex items-center justify-center transition-all shadow-2xl cursor-pointer hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
              aria-label="Next image"
              title="Next scene (Right Arrow key)"
            >
              <ChevronRight size={22} className="transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Main High-Resolution Image */}
            <img
              src={currentScene.url}
              alt={`${BRAND_CONFIG.heroProduct.name} in ${currentScene.title}`}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
              loading="eager"
            />

            {/* Bottom floating position indicator */}
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-mono text-[#D4C2A6] pointer-events-none">
              <span className="text-[#B08D57] font-semibold">{safeIdx + 1}</span> / {scenes.length} · {currentScene.timeOfDay.split('·')[0].trim()}
            </div>
          </div>

          {/* Lightbox Footer with Finish & Conversion Actions */}
          <footer className="shrink-0 z-40 bg-[#16120F]/95 backdrop-blur-md border-t border-white/15 px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="text-xs text-[#D4C2A6] text-center sm:text-left min-w-0 truncate">
              <span className="text-white font-medium">Depicted Specification:</span> ARC Lounge Chair in{' '}
              <span className="text-[#B08D57] font-medium">{currentScene.depictedFabricName}</span> on Solid{' '}
              <span className="text-[#B08D57] font-medium">{currentScene.depictedWoodName}</span> with Brushed Brass Shoes
            </div>

            <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  handleConfigureDepictedFinish();
                }}
                className="px-4 py-2 rounded-sm bg-[#B08D57] hover:bg-[#C9A063] text-[#16120F] text-xs font-mono font-semibold uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>Configure This Finish</span>
                <ArrowRight size={13} />
              </button>

              {onOpenReserve && (
                <button
                  type="button"
                  onClick={() => {
                    setIsLightboxOpen(false);
                    const matchingFabric = BRAND_CONFIG.fabrics.find(
                      (f) => f.id === currentScene.depictedFabricId
                    );
                    const matchingWood = BRAND_CONFIG.woods.find(
                      (w) => w.id === currentScene.depictedWoodId
                    );
                    if (matchingFabric) onSelectFabric(matchingFabric);
                    if (matchingWood) onSelectWood(matchingWood);
                    onOpenReserve();
                  }}
                  className="px-4 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-[#F5EFE6] border border-white/20 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Reserve Piece</span>
                </button>
              )}
            </div>
          </footer>
        </div>
      )}
    </section>
  );
};
