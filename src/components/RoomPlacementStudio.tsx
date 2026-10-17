import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, RotateCcw, ZoomIn, ZoomOut, Move, Check, Sparkles, Sliders, Image as ImageIcon } from 'lucide-react';
import { BRAND_CONFIG, FabricSwatch, WoodSwatch } from '../data/config';
import { ASSET_MANIFEST, preloadImage } from '../data/assetManifest';

interface RoomPlacementStudioProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFabric: FabricSwatch;
  onSelectFabric: (f: FabricSwatch) => void;
  selectedWood: WoodSwatch;
  onReserveFromRoom: () => void;
}

export const RoomPlacementStudio: React.FC<RoomPlacementStudioProps> = ({
  isOpen,
  onClose,
  selectedFabric,
  onSelectFabric,
  selectedWood,
  onReserveFromRoom,
}) => {
  const [activeBackdropIdx, setActiveBackdropIdx] = useState(0);
  const [customRoomUrl, setCustomRoomUrl] = useState<string | null>(null);
  const [chairScale, setChairScale] = useState(1.0);
  const [chairRotation, setChairRotation] = useState(0); // degrees -25 to 25
  const [chairPos, setChairPos] = useState({ x: 0, y: 50 }); // relative offset in pixels
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeAngleKey, setActiveAngleKey] = useState<'three_quarter' | 'front' | 'side'>('three_quarter');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, initX: 0, initY: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const backdrops = BRAND_CONFIG.roomScenes;

  // Determine which transparent cutout to use
  const cutoutImage = React.useMemo(() => {
    if (selectedFabric.id === 'cream-boucle' && activeAngleKey !== 'three_quarter') {
      return ASSET_MANIFEST.angleCutouts[activeAngleKey];
    }
    return selectedFabric.cutoutUrl;
  }, [selectedFabric, activeAngleKey]);

  useEffect(() => {
    preloadImage(cutoutImage);
  }, [cutoutImage]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initX: chairPos.x,
      initY: chairPos.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.mouseX;
    const dy = e.clientY - dragStartRef.current.mouseY;
    setChairPos({
      x: dragStartRef.current.initX + dx,
      y: dragStartRef.current.initY + dy,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Upload custom room photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setUploadError('Image size exceeds 15MB. Please choose a smaller room photo.');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setCustomRoomUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetScene = () => {
    setChairPos({ x: 0, y: 50 });
    setChairScale(1.0);
    setChairRotation(0);
    setIsFlipped(false);
    setActiveAngleKey('three_quarter');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#1C1612] text-[#F5EFE6] rounded-2xl overflow-hidden shadow-2xl border border-[#B08D57]/40 flex flex-col max-h-[94vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F5EFE6]/10 bg-[#16110E]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57]" />
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#B08D57] uppercase block">
                Spatial Visualization Studio
              </span>
              <h3 className="font-serif-luxury text-xl md:text-2xl text-[#F5EFE6] font-medium leading-tight">
                Place the ARC in Your Room
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetScene}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#D4C2A6] hover:text-[#F5EFE6] hover:bg-white/10 transition-colors cursor-pointer"
              title="Reset chair position and scale"
            >
              <RotateCcw size={13} />
              <span>Reset Scene</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#D4C2A6] hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close room studio"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Viewport Stage */}
        <div
          className="relative flex-1 min-h-[380px] sm:min-h-[460px] md:min-h-[520px] bg-neutral-900 overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Background Room Photo */}
          <img
            src={customRoomUrl || backdrops[activeBackdropIdx].url}
            alt="Interior room preview"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-95"
            draggable={false}
          />

          {/* Scale & Proportion Callout Badge */}
          <div className="absolute top-4 left-4 z-20 bg-[#1C1612]/90 backdrop-blur-sm px-3.5 py-1.5 rounded text-[11px] font-mono text-[#D4C2A6] border border-[#B08D57]/30 flex items-center gap-2 shadow-md">
            <span className="text-[#B08D57] font-semibold">1:1 Proportion</span>
            <span className="text-white/40">·</span>
            <span>W 900 × D 855 × H 785 mm</span>
          </div>

          {/* Draggable & Scalable ARC Lounge Chair with Transparent Cutout */}
          <div
            className="absolute z-10 touch-none flex flex-col items-center"
            style={{
              left: `calc(50% + ${chairPos.x}px)`,
              top: `calc(50% + ${chairPos.y}px)`,
              transform: `translate(-50%, -50%) scale(${chairScale}) rotate(${chairRotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.12s ease-out',
            }}
            onPointerDown={handlePointerDown}
          >
            {/* Ground Contact Shadow */}
            <div
              className="w-72 sm:w-84 md:w-96 h-14 bg-black/60 rounded-[100%] blur-md -mb-6 pointer-events-none"
              style={{ transform: 'scale(1.15, 0.35)' }}
            />
            <div
              className="w-56 sm:w-64 md:w-72 h-6 bg-black/80 rounded-[100%] blur-xs -mb-3 pointer-events-none"
              style={{ transform: 'scale(1.0, 0.25)' }}
            />

            {/* Authentic Transparent Chair Cutout Photo */}
            <img
              src={cutoutImage}
              alt="ARC Lounge Chair in room"
              className={`w-72 sm:w-88 md:w-96 max-w-none pointer-events-none filter drop-shadow-2xl transition-transform duration-200 ${
                isFlipped ? '-scale-x-100' : 'scale-x-100'
              }`}
              draggable={false}
            />

            {/* Subtle drag hint pill */}
            <div className="mt-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-xs text-[#F5EFE6] text-[10px] font-mono pointer-events-none border border-white/10 shadow-sm">
              <Move size={11} className="text-[#B08D57]" />
              <span>Drag to position chair</span>
            </div>
          </div>

          {/* Interactive Floating Quick Toolbars */}
          <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2">
            {/* Scale Slider / Zoom Controls */}
            <div className="flex items-center gap-2 bg-[#1C1612]/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/15 shadow-xl text-xs font-mono">
              <button
                type="button"
                onClick={() => setChairScale((s) => Math.max(0.55, s - 0.08))}
                className="p-1 hover:bg-white/10 rounded text-[#D4C2A6] hover:text-white cursor-pointer"
                title="Scale smaller"
              >
                <ZoomOut size={15} />
              </button>
              <input
                type="range"
                min="0.55"
                max="1.55"
                step="0.05"
                value={chairScale}
                onChange={(e) => setChairScale(parseFloat(e.target.value))}
                className="w-20 accent-[#B08D57] cursor-pointer"
                title="Scale"
              />
              <button
                type="button"
                onClick={() => setChairScale((s) => Math.min(1.55, s + 0.08))}
                className="p-1 hover:bg-white/10 rounded text-[#D4C2A6] hover:text-white cursor-pointer"
                title="Scale larger"
              >
                <ZoomIn size={15} />
              </button>
              <span className="text-[11px] text-[#B08D57] font-semibold w-10 text-right tabular-nums">
                {Math.round(chairScale * 100)}%
              </span>
            </div>

            {/* Rotation Angle Slider & Flip */}
            <div className="flex items-center gap-2 bg-[#1C1612]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/15 shadow-xl text-xs font-mono">
              <button
                type="button"
                onClick={() => setIsFlipped(!isFlipped)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                  isFlipped ? 'bg-[#B08D57] text-[#1C1612] font-semibold' : 'bg-white/10 text-[#D4C2A6]'
                }`}
              >
                Flip
              </button>
              <span className="text-[10px] uppercase text-[#D4C2A6]">Floor:</span>
              <input
                type="range"
                min="-20"
                max="20"
                step="1"
                value={chairRotation}
                onChange={(e) => setChairRotation(parseInt(e.target.value, 10))}
                className="w-16 accent-[#B08D57] cursor-pointer"
              />
              <span className="text-[10px] text-[#D4C2A6] w-6 text-right tabular-nums">
                {chairRotation}°
              </span>
            </div>
          </div>
        </div>

        {/* Studio Control Dock */}
        <div className="p-4 sm:p-6 bg-[#16110E] border-t border-[#F5EFE6]/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
          {/* 1. Interior Scene Selector & Custom Upload */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4C2A6] shrink-0 mr-1">
              Room Interior:
            </span>

            {backdrops.map((bd, idx) => (
              <button
                key={bd.id}
                type="button"
                onClick={() => {
                  setCustomRoomUrl(null);
                  setActiveBackdropIdx(idx);
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  !customRoomUrl && activeBackdropIdx === idx
                    ? 'bg-[#B08D57] text-[#1C1612] font-semibold shadow-xs'
                    : 'bg-black/40 text-[#D4C2A6] hover:bg-black/60 border border-white/10'
                }`}
              >
                {bd.title.split(' ')[0]} {bd.title.split(' ')[1]}
              </button>
            ))}

            {/* Custom Photo Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors border cursor-pointer ${
                customRoomUrl
                  ? 'bg-[#B08D57] text-[#1C1612] border-[#B08D57] font-semibold'
                  : 'bg-black/40 text-[#D4C2A6] border-white/15 hover:bg-black/60 hover:text-white'
              }`}
            >
              <Upload size={12} />
              <span>{customRoomUrl ? 'Custom Room Loaded' : 'Upload Your Room'}</span>
            </button>

            {uploadError && (
              <span className="text-xs text-[#F28B82] font-mono">{uploadError}</span>
            )}
          </div>

          {/* 2. Chair Finish Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4C2A6] shrink-0">
              Upholstery:
            </span>
            <div className="flex items-center gap-1.5">
              {BRAND_CONFIG.fabrics.map((fabric) => {
                const isSelected = fabric.id === selectedFabric.id;
                return (
                  <button
                    key={fabric.id}
                    type="button"
                    onClick={() => onSelectFabric(fabric)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#B08D57] bg-white/15 text-white ring-1 ring-[#B08D57]'
                        : 'border-white/15 bg-black/40 text-[#D4C2A6] hover:bg-black/60'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/30 shrink-0"
                      style={{ backgroundColor: fabric.hex }}
                    />
                    <span className="hidden sm:inline">{fabric.name.split(' ')[0]}</span>
                    {isSelected && <Check size={11} className="text-[#B08D57]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Direct Reservation CTA */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onReserveFromRoom();
            }}
            className="px-6 py-2.5 bg-[#F5EFE6] hover:bg-[#E8DCC8] text-[#1C1612] text-xs font-mono uppercase tracking-widest rounded-sm transition-colors font-medium shrink-0 text-center cursor-pointer"
          >
            Reserve This Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
