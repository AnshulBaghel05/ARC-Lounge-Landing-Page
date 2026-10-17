/**
 * ARC Lounge Chair Configuration & Verified Specifications
 * Designed by Hallgeir Homstvedt for Stellar Works.
 * Verified real-world dimensions: 900W x 855D x 785H mm, Seat Height: 395mm.
 */

import {
  ASSET_MANIFEST,
  PerspectiveConfig,
  UpholsteryAsset,
  WoodAsset,
  RoomAsset,
  PerspectiveId,
  UpholsteryId,
  WoodFinishId,
  getProductImage,
  getWoodFinishAsset,
} from './assetManifest';

export type { PerspectiveId, UpholsteryId, WoodFinishId };
export interface ProductAngle extends PerspectiveConfig {}
export interface FabricSwatch extends UpholsteryAsset {}
export interface WoodSwatch extends WoodAsset {}
export interface RoomScene extends RoomAsset {}

export interface ProductConfiguration {
  upholstery: UpholsteryId | string;
  woodFinish: WoodFinishId | string;
}

export const BRAND_CONFIG = {
  name: 'FORMA LIVING',
  tagline: 'Form follows feeling.',
  heroProduct: {
    name: 'ARC Lounge Chair',
    subtitle: 'Low-slung curved barrel-back lounge chair',
    leadDescription:
      'Conceived by Hallgeir Homstvedt for Stellar Works, the ARC Lounge Chair introduces soft, embracing geometric curves to modern living sanctuaries. A continuous barrel shell envelops a deep, floating cushion, grounded on splayed solid hardwood legs tipped in brushed brass.',
    designer: 'Hallgeir Homstvedt',
    manufacturer: 'Stellar Works',
    edition: 'Official Atelier Collection',
    basePrice: 2450,
    currency: 'USD',
    currencySymbol: '$',
    leadTime: '6–8 weeks (Handcrafted to order)',
    verifiedDimensions: {
      metric: {
        width: 900, // mm
        depth: 855, // mm
        height: 785, // mm
        seatHeight: 395, // mm
        seatDepth: 560, // mm
        armrestHeight: 580, // mm
        weight: '22.5 kg',
      },
      imperial: {
        width: 35.4, // in
        depth: 33.7, // in
        height: 30.9, // in
        seatHeight: 15.6, // in
        seatDepth: 22.0, // in
        armrestHeight: 22.8, // in
        weight: '49.6 lbs',
      },
    },
  },

  // Available authentic camera inspection angles
  angles: ASSET_MANIFEST.perspectives,

  // Authentic upholstery swatches with corresponding imagery and transparent cutouts
  fabrics: ASSET_MANIFEST.upholstery,

  // Solid wood finishes
  woods: ASSET_MANIFEST.woods,

  // Pre-configured room backdrops for visualization
  roomScenes: ASSET_MANIFEST.interiors,

  principles: [
    {
      number: '01',
      title: 'Sculptural Ergonomics',
      desc: 'Form is never arbitrary. The 18-degree barrel recline cradles the shoulder blades while keeping posture upright and centered for unhurried conversation.',
    },
    {
      number: '02',
      title: 'Tactile Honesty',
      desc: 'Materials remain untreated by synthetic sealants. The Tuscan virgin bouclé breathes, the American walnut drinks botanical oil, and the solid brass gently patinas.',
    },
    {
      number: '03',
      title: 'Architectural Permanence',
      desc: 'Built with modular assembly, mortise joinery, and replaceable upholstery sleeves designed to endure generations rather than seasons.',
    },
  ],

  complementaryPieces: [
    {
      id: 'arc-ottoman',
      name: 'ARC Curved Ottoman',
      category: 'Footstool & Bench',
      dimensions: 'W 62 x D 45 x H 38 cm',
      price: '$1,150',
      description: 'Matching sculpted bouclé silhouette on recessed walnut plinth base.',
      image: ASSET_MANIFEST.complementary.ottoman,
    },
    {
      id: 'walnut-side-table',
      name: 'SOLA Low Table',
      category: 'Side & Occasional',
      dimensions: 'Dia 52 x H 36 cm',
      price: '$920',
      description: 'Turned solid walnut disc with brushed architectural brass ring inlay.',
      image: ASSET_MANIFEST.complementary.sideTable,
    },
    {
      id: 'brass-arc-lamp',
      name: 'AURA Arc Luminaire',
      category: 'Lighting',
      dimensions: 'W 140 x H 195 cm',
      price: '$1,480',
      description: 'Hand-bent solid brass slender arc with translucent washi-parchment dome.',
      image: ASSET_MANIFEST.complementary.floorLamp,
    },
  ],

  craftMetrics: [
    { label: 'Virgin Wool Blend', value: '65%', detail: 'Tuscan textile mill spinning' },
    { label: 'Solid Hardwood', value: '100%', detail: 'FSC-certified American Walnut' },
    { label: 'Craft Hours Per Chair', value: '38h', detail: 'By single artisan guild team' },
    { label: 'Structural Frame Warranty', value: '10 yr', detail: 'Comprehensive replacement guarantee' },
  ],

  trustItems: [
    { title: '10-Year Frame Warranty', desc: 'Crafted with kiln-dried hardwood joints that outlast decades.' },
    { title: 'White-Glove Delivery', desc: 'Complimentary inside room placement, unboxing, and packaging recycling.' },
    { title: '30-Day In-Home Trial', desc: 'Experience the ARC in your natural light with zero return freight friction.' },
    { title: 'FSC Certified Forestry', desc: 'Every tree harvested is matched by two planted in certified Appalachian reserves.' },
  ],

  testimonials: [
    {
      quote:
        'The ARC redefined our living pavilion. Its curvature softens modern concrete lines while providing the most supportive reading posture I have ever encountered.',
      author: 'Evelyn Vane',
      role: 'Principal Architect',
      studio: 'Vane & Holtz Architecture, Stockholm',
    },
    {
      quote:
        'The bouclé texture in morning light has an almost poetic depth. Clients consistently migrate straight to it during walkthroughs.',
      author: 'Marcus Lindqvist',
      role: 'Interior Director',
      studio: 'Nordic Contemporary Projects',
    },
    {
      quote:
        'Exceptional joinery. You can feel the acoustic density of solid walnut the moment you settle in.',
      author: 'Camilla Rossi',
      role: 'Design Critic & Curator',
      studio: 'Spazio Architettura Milano',
    },
  ],

  pressLogos: [
    'ARCHITECTURAL DIGEST',
    'WALLPAPER*',
    'ELLE DÉCOR',
    'DISENHO INTERNO',
    'MONOCLE',
  ],
};
