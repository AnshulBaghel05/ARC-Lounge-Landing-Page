import React, { useState, useRef, useEffect, useTransition } from 'react';
import { ProductAngle, FabricSwatch, WoodSwatch, BRAND_CONFIG, PerspectiveId } from '../data/config';
import { getProductImage, preloadImage, preloadUpholsteryPerspectives } from '../data/assetManifest';
import { ChevronLeft, ChevronRight, RotateCw, ZoomIn, Sparkles, Check } from 'lucide-react';

interface HeroProductViewerProps {
  selectedFabric: FabricSwatch;
  onSelectFabric: (f: FabricSwatch) => void;
  selectedWood: WoodSwatch;
  onSelectWood: (w: WoodSwatch) => void;
  onOpenRoomPlacement: () => void;
}

export const HeroProductViewer: React.FC<HeroProductViewerProps> = ({
  selectedFabric,
  onSelectFabric,
  selectedWood,
  onSelectWood,
  onOpenRoomPlacement,
}) => {
  const [currentAngleIdx, setCurrentAngleIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [activeTabGroup, setActiveTabGroup] = useState<'upholstery' | 'wood'>('upholstery');
  const [, startTransition] = useTransition();

  // Active loaded image with seamless double-buffering to prevent any flicker or blank frames
  const [displayedImage, setDisplayedImage] = useState<string>('');
  const [incomingImage, setIncomingImage] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const angles = BRAND_CONFIG.angles;
  const currentAngle = angles[currentAngleIdx] || angles[0];

  // Resolve target image based on current perspective and selected upholstery/wood finish
  const targetImage = React.useMemo(() => {
    return getProductImage(selectedFabric.id, currentAngle.id, selectedWood.id);
  }, [selectedFabric.id, currentAngle.id, selectedWood.id]);

  // Preload all perspectives of the selected upholstery immediately upon selection
  useEffect(() => {
    preloadUpholsteryPerspectives(selectedFabric.id);
  }, [selectedFabric.id]);

  // Preload adjacent angles whenever angle index changes
  useEffect(() => {
    const nextIdx = (currentAngleIdx + 1) % angles.length;
    const prevIdx = (currentAngleIdx - 1 + angles.length) % angles.length;
    preloadImage(getProductImage(selectedFabric.id, angles[nextIdx].id, selectedWood.id));
    preloadImage(getProductImage(selectedFabric.id, angles[prevIdx].id, selectedWood.id));
  }, [currentAngleIdx, selectedFabric.id, selectedWood.id, angles]);

  // Double-buffering & instantaneous update for cached images
  useEffect(() => {
    if (!displayedImage) {
      setDisplayedImage(targetImage);
      return;
    }

    if (displayedImage === targetImage) return;

    // Fast image transition: preload and swap with smooth 100ms crossfade
    let isCancelled = false;
    preloadImage(targetImage).then(() => {
      if (isCancelled) return;
      setIncomingImage(targetImage);
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        if (isCancelled) return;
        setDisplayedImage(targetImage);
        setIsTransitioning(false);
      }, 100);

      return () => clearTimeout(timer);
    });

    return () => {
      isCancelled = true;
    };
  }, [targetImage, displayedImage]);

  // Next / Previous Angle
  const handlePrevAngle = () => {
    setHasInteracted(true);
    startTransition(() => {
      setCurrentAngleIdx((prev) => (prev === 0 ? angles.length - 1 : prev - 1));
    });
  };

  const handleNextAngle = () => {
    setHasInteracted(true);
    startTransition(() => {
      setCurrentAngleIdx((prev) => (prev === angles.length - 1 ? 0 : prev + 1));
    });
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevAngle();
    } else if (e.key === 'ArrowRight') {
      handleNextAngle();
    }
  };

  // Drag / Swipe handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    const threshold = 40;

    if (diff > threshold) {
      handlePrevAngle();
      setDragStartX(e.clientX);
    } else if (diff < -threshold) {
      handleNextAngle();
      setDragStartX(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Zoom lens positioning
  const handleMouseMoveZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isZoomed) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full rounded-2xl bg-gradient-to-b from-[#F2ECE3] to-[#E9DFD2] border border-[#1C1612]/10 p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-lg select-none outline-none focus:ring-2 focus:ring-[#B08D57]/40"
      aria-label="Interactive ARC Lounge Chair Multi-Angle Viewer. Use arrow keys or drag to rotate view."
    >
      {/* Top Header Row of Viewer: Authentic Badge & Active Configuration Summary */}
      <div className="flex items-center justify-between gap-4 mb-2 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#4A3222] font-semibold">
            {currentAngle.name} ({currentAngleIdx + 1}/{angles.length})
          </span>
          <span className="hidden sm:inline text-black/30 font-mono text-[10px]">·</span>
          <span className="hidden sm:inline text-[10px] font-mono text-[#4A3222]/80 uppercase">
            {selectedFabric.name} + {selectedWood.name}
          </span>
        </div>

        {/* View mode actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded transition-colors cursor-pointer ${
              isZoomed
                ? 'bg-[#1C1612] text-[#F5EFE6]'
                : 'bg-white/70 hover:bg-white text-[#1C1612] border border-[#1C1612]/10'
            }`}
            title="Toggle magnifying zoom lens"
          >
            <ZoomIn size={12} />
            <span className="hidden sm:inline">{isZoomed ? 'Reset Zoom' : 'Inspect Detail'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenRoomPlacement}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded bg-[#B08D57]/15 hover:bg-[#B08D57]/25 text-[#4A3222] border border-[#B08D57]/30 transition-colors cursor-pointer"
          >
            <Sparkles size={12} className="text-[#B08D57]" />
            <span>Place in Room</span>
          </button>
        </div>
      </div>

      {/* Main Image Display Stage with Touch / Drag Surface */}
      <div
        className="relative w-full aspect-4/3 sm:aspect-1/1 md:aspect-4/3 flex items-center justify-center my-auto cursor-grab active:cursor-grabbing overflow-hidden rounded-xl"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onMouseMove={handleMouseMoveZoom}
      >
        {/* Soft Radial Studio Spotlight Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.85)_0%,rgba(235,225,210,0.2)_70%)] pointer-events-none" />

        {/* Ground Contact Shadow */}
        <div
          className="absolute bottom-6 w-3/4 h-8 bg-[#2A1D14]/15 rounded-[100%] blur-xl pointer-events-none"
          style={{ transform: 'scale(1, 0.4)' }}
        />

        {/* Double-buffered image display: prevents blank frames, flashing, and layout shifts */}
        <div className="relative w-full h-full flex items-center justify-center">
          {displayedImage && (
            <img
              src={displayedImage}
              alt={`ARC Lounge Chair in ${selectedFabric.name} - ${currentAngle.name}`}
              className={`max-w-[92%] max-h-[92%] object-contain drop-shadow-xl transition-all duration-150 ease-out pointer-events-none ${
                isZoomed ? 'scale-175 origin-center' : 'scale-100'
              } ${isTransitioning ? 'opacity-85' : 'opacity-100'}`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }
                  : undefined
              }
              draggable={false}
              loading="eager"
              decoding="async"
            />
          )}

          {/* Incoming image crossfade buffer */}
          {isTransitioning && incomingImage && (
            <img
              src={incomingImage}
              alt={`ARC Lounge Chair - transition view`}
              className="absolute max-w-[92%] max-h-[92%] object-contain drop-shadow-xl pointer-events-none transition-opacity duration-100 opacity-100"
              draggable={false}
              loading="eager"
              decoding="async"
            />
          )}
        </div>

        {/* Left / Right Interactive Arrow Buttons */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevAngle();
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-[#1C1612] shadow-md border border-[#1C1612]/10 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B08D57] cursor-pointer"
          aria-label="Previous viewing angle"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNextAngle();
          }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-[#1C1612] shadow-md border border-[#1C1612]/10 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B08D57] cursor-pointer"
          aria-label="Next viewing angle"
        >
          <ChevronRight size={18} />
        </button>

        {/* First-time Interaction Hint */}
        {!hasInteracted && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#1C1612]/85 text-[#F5EFE6] px-3.5 py-1 rounded-full text-[11px] font-mono tracking-wider flex items-center gap-1.5 shadow-md pointer-events-none animate-pulse">
            <RotateCw size={12} className="text-[#B08D57]" />
            <span>Drag or click arrows to rotate view</span>
          </div>
        )}
      </div>

      {/* Bottom Controls: Perspective Tabs + Upholstery & Wood Finishes Quick Switcher */}
      <div className="mt-4 pt-4 border-t border-[#1C1612]/10 space-y-3 z-10">
        {/* Perspective Angle Tabs */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-1">
          {angles.map((angle, idx) => {
            const isActive = idx === currentAngleIdx;
            return (
              <button
                key={angle.id}
                type="button"
                onClick={() => {
                  setHasInteracted(true);
                  startTransition(() => {
                    setCurrentAngleIdx(idx);
                  });
                }}
                className={`px-3 py-1.5 rounded text-[11px] font-mono transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1612] text-[#F5EFE6] font-medium shadow-xs'
                    : 'bg-white/70 hover:bg-white text-[#1C1612]/80 border border-[#1C1612]/10'
                }`}
              >
                <span>{angle.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Dual Customization Switcher: Upholstery & Hardwood Legs */}
        <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Upholstery Finishes */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#1C1612]/60 mr-1 hidden sm:inline">
              Textile:
            </span>
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
                  className={`group relative flex items-center gap-1 p-1 pr-2 sm:pr-2.5 rounded-full border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#B08D57] bg-white ring-1 ring-[#B08D57]'
                      : 'border-[#1C1612]/15 bg-white/60 hover:bg-white'
                  }`}
                  title={`${fabric.name} (${fabric.priceModifier === 0 ? 'Included' : `+$${fabric.priceModifier}`})`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                    style={{ backgroundColor: fabric.hex }}
                  />
                  <span className="text-[10px] font-mono text-[#1C1612] font-medium hidden md:inline">
                    {fabric.name.split(' ')[0]}
                  </span>
                  {isSelected && <Check size={11} className="text-[#B08D57]" />}
                </button>
              );
            })}
          </div>

          {/* Hardwood Legs Quick Swatch */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#1C1612]/60 mr-1 hidden sm:inline">
              Legs:
            </span>
            {BRAND_CONFIG.woods.map((wood) => {
              const isSelected = wood.id === selectedWood.id;
              return (
                <button
                  key={wood.id}
                  type="button"
                  onClick={() => onSelectWood(wood)}
                  className={`group relative flex items-center gap-1 p-1 pr-2 rounded-full border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#B08D57] bg-white ring-1 ring-[#B08D57]'
                      : 'border-[#1C1612]/15 bg-white/60 hover:bg-white'
                  }`}
                  title={`${wood.name} (${wood.priceModifier === 0 ? 'Included' : `+$${wood.priceModifier}`})`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                    style={{ backgroundColor: wood.hex }}
                  />
                  <span className="text-[10px] font-mono text-[#1C1612] font-medium hidden lg:inline">
                    {wood.name.split(' ')[0]}
                  </span>
                  {isSelected && <Check size={11} className="text-[#B08D57]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
