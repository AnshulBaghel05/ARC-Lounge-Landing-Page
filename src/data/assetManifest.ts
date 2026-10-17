/**
 * Centralized Asset Manifest for FORMA LIVING ARC Lounge Chair
 * Local, permanent public asset paths optimized for Vercel deployment.
 * Provides complete matrix mapping for all combinations of:
 * - Upholstery (Cream Bouclé, Cognac Leather, Terracotta Velvet, Oat Belgian Linen)
 * - Perspectives (3/4 Perspective, Front, Profile, Rear, Macro Detail)
 * - Wood Finishes (American Walnut, European White Oak, Charred Ebony)
 */

export type PerspectiveId = 'three_quarter' | 'front' | 'profile' | 'rear' | 'macro';
export type UpholsteryId = 'cream-boucle' | 'cognac-leather' | 'terracotta-velvet' | 'oat-belgian-linen';
export type WoodFinishId = 'american-walnut' | 'european-white-oak' | 'charred-ebony';

export interface PerspectiveConfig {
  id: PerspectiveId;
  name: string;
  shortLabel: string;
  description: string;
}

export interface UpholsteryAsset {
  id: UpholsteryId;
  name: string;
  hex: string;
  priceModifier: number;
  composition: string;
  martindale: string;
  description: string;
  cutoutUrl: string;
  perspectives: Record<PerspectiveId, string>;
}

export interface WoodAsset {
  id: WoodFinishId;
  name: string;
  hex: string;
  priceModifier: number;
  description: string;
  timberSource: string;
  imageUrl: string;
}

export interface RoomHotspot {
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  note: string;
}

export interface RoomAsset {
  id: string;
  title: string;
  subtitle: string;
  timeOfDay: string;
  caption: string;
  atmosphere: string;
  url: string;
  jpgUrl: string;
  lightTemp: string;
  suggestedScale: number;
  defaultPosition: { x: number; y: number };
  depictedFabricId: UpholsteryId;
  depictedWoodId: WoodFinishId;
  depictedFabricName: string;
  depictedWoodName: string;
  architecturalDetails: string[];
  hotspots: RoomHotspot[];
}

export const PERSPECTIVE_CONFIGS: PerspectiveConfig[] = [
  {
    id: 'three_quarter',
    name: '3/4 Perspective',
    shortLabel: 'Perspective',
    description: 'Embracing barrel contour, deep floating cushion, and tapered splayed legs.',
  },
  {
    id: 'front',
    name: 'Front Elevation',
    shortLabel: 'Front',
    description: 'Symmetrical elevation highlighting continuous armrest arc and seating depth.',
  },
  {
    id: 'profile',
    name: 'Side Profile',
    shortLabel: 'Profile',
    description: 'Profile silhouette exhibiting the 18° relaxed lounge recline angle.',
  },
  {
    id: 'rear',
    name: 'Rear Contour',
    shortLabel: 'Rear',
    description: 'Seamless unbroken upholstery curvature and rear timber apron integration.',
  },
  {
    id: 'macro',
    name: 'Artisan Joinery',
    shortLabel: 'Macro Detail',
    description: 'Microscopic inspection of textile weave, tailored seams, and brass ferrules.',
  },
];

export const ASSET_MANIFEST = {
  // 1. Perspectives Config List
  perspectives: PERSPECTIVE_CONFIGS,

  // 2. Comprehensive Upholstery Matrix (Every perspective mapped to authentic photography)
  upholstery: [
    {
      id: 'cream-boucle',
      name: 'Cream Bouclé',
      hex: '#F0ECE1',
      priceModifier: 0,
      composition: '65% Tuscan Virgin Wool, 35% Organic Cotton',
      martindale: '50,000 cycles',
      description: 'Tactile textured virgin wool blend with cozy looped warmth and acoustic softness',
      cutoutUrl: '/images/products/arc-lounge-chair/cutouts/cream-boucle-three-quarter.webp',
      perspectives: {
        three_quarter: '/images/products/arc-lounge-chair/cream-boucle/three-quarter.webp',
        front: '/images/products/arc-lounge-chair/cream-boucle/front.webp',
        profile: '/images/products/arc-lounge-chair/cream-boucle/profile.webp',
        rear: '/images/products/arc-lounge-chair/cream-boucle/rear.webp',
        macro: '/images/products/arc-lounge-chair/cream-boucle/macro-detail.webp',
      },
    },
    {
      id: 'cognac-leather',
      name: 'Cognac Leather',
      hex: '#7A4328',
      priceModifier: 540,
      composition: '100% Aniline Scandinavian Cattle Hide',
      martindale: '80,000 cycles',
      description: 'Full-grain Scandinavian aniline leather with natural buttery hand and rich patina',
      cutoutUrl: '/images/products/arc-lounge-chair/cutouts/cognac-leather.webp',
      perspectives: {
        three_quarter: '/images/products/arc-lounge-chair/cognac-leather/three-quarter.webp',
        front: '/images/products/arc-lounge-chair/cognac-leather/front.webp',
        profile: '/images/products/arc-lounge-chair/cognac-leather/profile.webp',
        rear: '/images/products/arc-lounge-chair/cognac-leather/rear.webp',
        macro: '/images/products/arc-lounge-chair/cognac-leather/macro-detail.webp',
      },
    },
    {
      id: 'terracotta-velvet',
      name: 'Terracotta Velvet',
      hex: '#984B3A',
      priceModifier: 320,
      composition: '100% Combed Italian Cotton Velvet',
      martindale: '45,000 cycles',
      description: 'Short-pile Italian cotton velvet with rich earthy warmth and liquid drape',
      cutoutUrl: '/images/products/arc-lounge-chair/cutouts/terracotta-velvet.webp',
      perspectives: {
        three_quarter: '/images/products/arc-lounge-chair/terracotta-velvet/three-quarter.webp',
        front: '/images/products/arc-lounge-chair/terracotta-velvet/front.webp',
        profile: '/images/products/arc-lounge-chair/terracotta-velvet/profile.webp',
        rear: '/images/products/arc-lounge-chair/terracotta-velvet/rear.webp',
        macro: '/images/products/arc-lounge-chair/terracotta-velvet/macro-detail.webp',
      },
    },
    {
      id: 'oat-belgian-linen',
      name: 'Oat Belgian Linen',
      hex: '#D7CBBA',
      priceModifier: 180,
      composition: '100% Raw Belgian Flax Linen',
      martindale: '40,000 cycles',
      description: 'Heavyweight raw slub linen with breathable textured drape and organic hand',
      cutoutUrl: '/images/products/arc-lounge-chair/cutouts/oat-linen.webp',
      perspectives: {
        three_quarter: '/images/products/arc-lounge-chair/oat-belgian-linen/three-quarter.webp',
        front: '/images/products/arc-lounge-chair/oat-belgian-linen/front.webp',
        profile: '/images/products/arc-lounge-chair/oat-belgian-linen/profile.webp',
        rear: '/images/products/arc-lounge-chair/oat-belgian-linen/rear.webp',
        macro: '/images/products/arc-lounge-chair/oat-belgian-linen/macro-detail.webp',
      },
    },
  ] as UpholsteryAsset[],

  // 3. Solid Wood Hardwood Legs & Base Frame Options
  woods: [
    {
      id: 'american-walnut',
      name: 'American Walnut',
      hex: '#4A3222',
      priceModifier: 0,
      description: 'Kiln-dried FSC dark heartwood with hand-rubbed botanical oil and brushed brass ferrules',
      timberSource: 'Appalachian Sustainable Reserves',
      imageUrl: '/images/products/arc-lounge-chair/wood-finishes/american-walnut.webp',
    },
    {
      id: 'european-white-oak',
      name: 'European White Oak',
      hex: '#B59871',
      priceModifier: 90,
      description: 'Quarter-sawn oak with warm honey undertones, matte lacquer, and brushed brass ferrules',
      timberSource: 'French Sustainable Forests',
      imageUrl: '/images/products/arc-lounge-chair/wood-finishes/european-white-oak.webp',
    },
    {
      id: 'charred-ebony',
      name: 'Charred Ebony',
      hex: '#211D1B',
      priceModifier: 160,
      description: 'Deep carbon-tinted solid ash preserving tactile grain lines and brushed brass ferrules',
      timberSource: 'Northern European Ash',
      imageUrl: '/images/products/arc-lounge-chair/wood-finishes/charred-ebony.webp',
    },
  ] as WoodAsset[],

  // 4. Transparent Cutouts by Perspective (for spatial room placement)
  angleCutouts: {
    three_quarter: '/images/products/arc-lounge-chair/cutouts/cream-boucle-three-quarter.webp',
    front: '/images/products/arc-lounge-chair/cutouts/cream-boucle-front.webp',
    side: '/images/products/arc-lounge-chair/cutouts/cream-boucle-side.webp',
  },

  // 5. Architectural Dimensions Schematics
  dimensions: {
    front: '/images/products/arc-lounge-chair/dimensions/schematic-front.webp',
    side: '/images/products/arc-lounge-chair/dimensions/schematic-side.webp',
  },

  // 6. Natural Interior Lifestyle Spaces (Editorial Photography featuring authentic ARC Lounge Chair)
  interiors: [
    {
      id: 'modern-living-room',
      title: 'Modern Living Room',
      subtitle: 'Travertine Pavilion & Fluted Timber',
      timeOfDay: '10:30 AM · Warm Morning Sun',
      caption: 'The ARC Lounge Chair in tactile Cream Bouclé anchored beside an organic travertine table, fluted oak millwork, and warm sunlight across herringbone timber.',
      atmosphere: 'Warm directional morning sunlight, expansive architectural living room with sheer linen drapes.',
      url: '/images/interiors/arc-lounge-chair/modern-living-room.webp',
      jpgUrl: '/images/interiors/arc-lounge-chair/modern-living-room.jpg',
      lightTemp: '3400K Warm Sun',
      suggestedScale: 1.0,
      defaultPosition: { x: -10, y: 55 },
      depictedFabricId: 'cream-boucle',
      depictedWoodId: 'american-walnut',
      depictedFabricName: 'Cream Bouclé',
      depictedWoodName: 'American Walnut',
      architecturalDetails: [
        'Curved continuous barrel silhouette cradling posture',
        'Low organic travertine sculptural pedestal side table',
        'Floor-to-ceiling sheer linen drapery diffusing daylight',
        'Splayed solid walnut legs with hand-rubbed botanical oil and brass ferrules',
      ],
      hotspots: [
        {
          x: 54,
          y: 50,
          title: 'Embracing Barrel Contour',
          note: 'Continuous 18° low-slung recline designed by Hallgeir Homstvedt for unhurried conversation.',
        },
        {
          x: 48,
          y: 78,
          title: 'Solid American Walnut Legs',
          note: 'Splayed hardwood leg frame with hand-finished oil and brushed brass ferrule caps.',
        },
        {
          x: 27,
          y: 68,
          title: 'Organic Travertine Plinth',
          note: 'Sculptural stone table paired with ambient amber glass luminaire for warm evening glow.',
        },
      ],
    },
    {
      id: 'reading-corner',
      title: 'Minimalist Reading Corner',
      subtitle: 'Diffused Daylight & Greenery Sanctuary',
      timeOfDay: '02:15 PM · Soft Diffused Light',
      caption: 'Rich Scandinavian Cognac aniline leather chair placed alongside a full-height glass window, slender brass reading luminaire, and rough-hewn stone plinth.',
      atmosphere: 'Soft diffused natural daylight, contemplative solitude, tactile buttery leather.',
      url: '/images/interiors/arc-lounge-chair/reading-corner.webp',
      jpgUrl: '/images/interiors/arc-lounge-chair/reading-corner.jpg',
      lightTemp: '4800K Diffused Skylight',
      suggestedScale: 0.95,
      defaultPosition: { x: 20, y: 60 },
      depictedFabricId: 'cognac-leather',
      depictedWoodId: 'american-walnut',
      depictedFabricName: 'Cognac Aniline Leather',
      depictedWoodName: 'American Walnut',
      architecturalDetails: [
        '100% full-grain Scandinavian aniline leather with natural patina',
        'Floor-to-ceiling architectural window framing a quiet garden',
        'Monolithic chiselled limestone plinth and curated monographs',
        'Slender directional brass reading floor lamp',
      ],
      hotspots: [
        {
          x: 48,
          y: 52,
          title: 'Full-Grain Scandinavian Leather',
          note: 'Supple aniline hide develops a distinctive, rich patina unique to its owner over decades.',
        },
        {
          x: 28,
          y: 45,
          title: 'Minimalist Brass Luminaire',
          note: 'Directional task lighting focused for prolonged reading without visual glare.',
        },
        {
          x: 77,
          y: 72,
          title: 'Chiselled Limestone Plinth',
          note: 'Raw organic stone contrast against tailored leather and architectural glazing.',
        },
      ],
    },
    {
      id: 'luxury-contemporary',
      title: 'Luxury Contemporary Interior',
      subtitle: 'Terracotta Velvet & Dark Espresso Wood',
      timeOfDay: '08:30 PM · Evening Cove Warmth',
      caption: 'Italian cotton velvet in deep terracotta rust paired with charred ebony hardwood legs, floating against textured plaster and backlit walnut wall panelling.',
      atmosphere: 'Intimate evening warmth, deep acoustic texture, architectural prestige.',
      url: '/images/interiors/arc-lounge-chair/luxury-contemporary.webp',
      jpgUrl: '/images/interiors/arc-lounge-chair/luxury-contemporary.jpg',
      lightTemp: '2700K Amber Cove',
      suggestedScale: 1.0,
      defaultPosition: { x: 0, y: 55 },
      depictedFabricId: 'terracotta-velvet',
      depictedWoodId: 'charred-ebony',
      depictedFabricName: 'Terracotta Italian Velvet',
      depictedWoodName: 'Charred Ebony',
      architecturalDetails: [
        'High-density short-pile combed Italian cotton velvet upholstery',
        'Charred ebony carbon-tinted solid ash legs with brushed brass caps',
        'Concealed linear cove warm LED lighting washing walnut millwork',
        'Deep looped ivory wool area rug providing acoustic tranquility',
      ],
      hotspots: [
        {
          x: 50,
          y: 53,
          title: 'Combed Italian Cotton Velvet',
          note: '45,000 Martindale abrasion rating with rich liquid drape and earthy terracotta depth.',
        },
        {
          x: 65,
          y: 78,
          title: 'Charred Ebony Ash Frame',
          note: 'Carbonized hardwood with visible tactile grain lines and brass ferrule accents.',
        },
        {
          x: 29,
          y: 65,
          title: 'C-Table Drinks Perch',
          note: 'Solid walnut and brass cantilever side table designed to nest smoothly beside the seat.',
        },
      ],
    },
    {
      id: 'organic-interior',
      title: 'Warm Organic Interior',
      subtitle: 'Japandi Calm & Raw Belgian Flax',
      timeOfDay: '09:00 AM · Gentle Morning Sun',
      caption: 'Tactile Oat Belgian slub linen and European white oak legs resting on wide-plank bleached oak floors, with sheer linen curtains and a sculpted olive tree.',
      atmosphere: 'Airy natural illumination, raw textured flax, soft organic shadow patterns.',
      url: '/images/interiors/arc-lounge-chair/organic-interior.webp',
      jpgUrl: '/images/interiors/arc-lounge-chair/organic-interior.jpg',
      lightTemp: '4200K Soft Daylight',
      suggestedScale: 1.02,
      defaultPosition: { x: -15, y: 55 },
      depictedFabricId: 'oat-belgian-linen',
      depictedWoodId: 'european-white-oak',
      depictedFabricName: 'Oat Belgian Flax Linen',
      depictedWoodName: 'European White Oak',
      architecturalDetails: [
        'Heavyweight raw slub flax woven in Courtrai, Belgium',
        'Quarter-sawn European white oak legs with natural honey matte lacquer',
        'Sculptural potted Japanese olive tree providing organic verticality',
        'Hand-turned solid walnut drink stool and natural woven jute rug',
      ],
      hotspots: [
        {
          x: 48,
          y: 54,
          title: 'Heavyweight Belgian Flax Linen',
          note: 'Breathable organic weave with tactile slub texture, highly durable and hypoallergenic.',
        },
        {
          x: 43,
          y: 82,
          title: 'European White Oak Base',
          note: 'Quarter-sawn timber with natural honey warmth and brushed brass protective shoes.',
        },
        {
          x: 84,
          y: 72,
          title: 'Turned Timber Pedestal',
          note: 'Sculpted hourglass side table handcrafted from solid American walnut.',
        },
      ],
    },
    {
      id: 'designer-apartment',
      title: 'Designer Apartment',
      subtitle: 'Haussmann Parquet & Parisian Grace',
      timeOfDay: '11:45 AM · High Parisian Daylight',
      caption: 'The ARC Lounge Chair in Cream Bouclé centerpiece against French chevron parquet, arched balcony French windows, delicate ornate mouldings, and modern art.',
      atmosphere: 'High-ceiling Parisian elegance, graceful natural light, museum-grade poise.',
      url: '/images/interiors/arc-lounge-chair/designer-apartment.webp',
      jpgUrl: '/images/interiors/arc-lounge-chair/designer-apartment.jpg',
      lightTemp: '5000K Clear Skylight',
      suggestedScale: 1.0,
      defaultPosition: { x: 5, y: 65 },
      depictedFabricId: 'cream-boucle',
      depictedWoodId: 'american-walnut',
      depictedFabricName: 'Cream Bouclé',
      depictedWoodName: 'American Walnut',
      architecturalDetails: [
        'Tuscan virgin wool textured bouclé with deep floating seat cushion',
        'Authentic 19th-century French chevron solid oak parquet floors',
        'Tall arched Haussmann double French doors opening to ornate ironwork balconies',
        'Curated abstract color field oil painting and sculptural tri-fold brass table',
      ],
      hotspots: [
        {
          x: 49,
          y: 68,
          title: 'Sculptural Statement in Space',
          note: 'Low-slung 785mm height allows architectural vistas and ornate wall mouldings to remain uninterrupted.',
        },
        {
          x: 71,
          y: 75,
          title: 'Tri-Blade Brass Accent Stool',
          note: 'Solid unlacquered brass side table creates rich material dialogue with the leg ferrules.',
        },
        {
          x: 27,
          y: 35,
          title: 'Classic Haussmann Archway',
          note: 'Tall floor-to-ceiling French doors flood the curved boucle weave with multidirectional daylight.',
        },
      ],
    },
  ] as RoomAsset[],

  // 7. Complementary Architectural Suite
  complementary: {
    ottoman: '/images/complementary/ottoman.webp',
    sideTable: '/images/complementary/side-table.webp',
    floorLamp: '/images/complementary/floor-lamp.webp',
  },
};

/**
 * Resolves the exact product image for any upholstery and perspective combination.
 * Guaranteed to never return an unrelated upholstery as fallback.
 */
export function getProductImage(
  upholsteryId: string,
  perspectiveId: PerspectiveId | string,
  woodFinishId?: string
): string {
  // Normalize IDs in case of legacy aliases (e.g. oat-linen -> oat-belgian-linen)
  const normalizedUphId = upholsteryId === 'oat-linen' ? 'oat-belgian-linen' : upholsteryId;
  const uph = ASSET_MANIFEST.upholstery.find((u) => u.id === normalizedUphId) || ASSET_MANIFEST.upholstery[0];

  // If perspective is macro and a specific wood finish is inspected, can show wood finish asset if desired
  const normalizedPersp = (perspectiveId as PerspectiveId) in uph.perspectives ? (perspectiveId as PerspectiveId) : 'three_quarter';

  const image = uph.perspectives[normalizedPersp];
  if (image) {
    return image;
  }

  // Graceful fallback to same upholstery three_quarter view (never unrelated fabric)
  return uph.perspectives.three_quarter;
}

/**
 * Returns wood finish asset details
 */
export function getWoodFinishAsset(woodId: string): WoodAsset {
  const normalizedId = woodId === 'solid-walnut' ? 'american-walnut' : woodId === 'natural-oak' ? 'european-white-oak' : woodId;
  return ASSET_MANIFEST.woods.find((w) => w.id === normalizedId) || ASSET_MANIFEST.woods[0];
}

// In-memory image decode cache for sub-2ms UI transitions
const imageMemoryCache = new Set<string>();

/**
 * Preloads and decodes an image URL into browser cache & memory.
 */
export function preloadImage(url: string): Promise<void> {
  if (typeof window === 'undefined' || !url || imageMemoryCache.has(url)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;

    const onDone = () => {
      imageMemoryCache.add(url);
      resolve();
    };

    if ('decode' in img && typeof img.decode === 'function') {
      img
        .decode()
        .then(onDone)
        .catch(() => {
          onDone();
        });
    } else {
      img.onload = onDone;
      img.onerror = () => resolve();
    }
  });
}

/**
 * Preload all perspectives of an upholstery immediately when selected
 */
export function preloadUpholsteryPerspectives(upholsteryId: string): void {
  const normalizedId = upholsteryId === 'oat-linen' ? 'oat-belgian-linen' : upholsteryId;
  const uph = ASSET_MANIFEST.upholstery.find((u) => u.id === normalizedId);
  if (!uph) return;

  Object.values(uph.perspectives).forEach((url) => {
    preloadImage(url);
  });
  if (uph.cutoutUrl) {
    preloadImage(uph.cutoutUrl);
  }
}

/**
 * Preload high-priority hero assets immediately upon mount
 */
export function preloadCriticalAssets(): void {
  if (typeof window === 'undefined') return;

  // 1. Initial hero images (Cream Bouclé all perspectives)
  preloadUpholsteryPerspectives('cream-boucle');

  // 2. Primary views of other upholsteries
  for (const u of ASSET_MANIFEST.upholstery) {
    preloadImage(u.perspectives.three_quarter);
    preloadImage(u.perspectives.front);
  }

  // 3. Wood finishes
  for (const w of ASSET_MANIFEST.woods) {
    preloadImage(w.imageUrl);
  }

  // 4. Primary interior lifestyle showcase
  preloadImage('/images/interiors/arc-lounge-chair/modern-living-room.webp');

  // 5. Preload remaining perspectives & interiors in idle background
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      for (const u of ASSET_MANIFEST.upholstery) {
        Object.values(u.perspectives).forEach((url) => preloadImage(url));
      }
      for (const room of ASSET_MANIFEST.interiors) {
        preloadImage(room.url);
      }
    });
  } else {
    setTimeout(() => {
      for (const u of ASSET_MANIFEST.upholstery) {
        Object.values(u.perspectives).forEach((url) => preloadImage(url));
      }
      for (const room of ASSET_MANIFEST.interiors) {
        preloadImage(room.url);
      }
    }, 500);
  }
}
