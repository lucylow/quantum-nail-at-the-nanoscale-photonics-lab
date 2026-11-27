export type NailShape = "round" | "oval" | "square" | "squoval" | "almond" | "coffin" | "stiletto";
export type NailFinish = "glossy" | "matte" | "pearlescent" | "chrome" | "holographic" | "glitter" | "translucent" | "aurora";
export type CoatingType = "none" | "pearlescent-veil" | "holographic-prism" | "hydrophobic-glass" | "liquid-chrome" | "aurora-film";

export interface NailColor {
  id: string;
  name: string;
  hex: string;
  secondaryHex: string;
  family: string;
}

export interface NailConfig {
  colorId: string;
  finish: NailFinish;
  coating: CoatingType;
  coatingThickness: number; // 10 - 500 nm (illustrative)
  particleSize: number; // 5 - 200 nm (illustrative)
}

export interface StudioState {
  shape: NailShape;
  length: number; // 0 - 100
  nails: Record<string, NailConfig>;
}

export interface SavedDesign {
  id: string;
  name: string;
  createdAt: string;
  state: StudioState;
}

export interface SavedExperiment {
  id: string;
  name: string;
  createdAt: string;
  items: { materialId: string; ratio: number }[];
  summary: string;
  swatchGradient: string;
}

export const FINGER_IDS = [
  { id: "L-thumb", label: "Left Thumb", short: "L1", hand: "left" as const },
  { id: "L-index", label: "Left Index", short: "L2", hand: "left" as const },
  { id: "L-middle", label: "Left Middle", short: "L3", hand: "left" as const },
  { id: "L-ring", label: "Left Ring", short: "L4", hand: "left" as const },
  { id: "L-pinky", label: "Left Pinky", short: "L5", hand: "left" as const },
  { id: "R-thumb", label: "Right Thumb", short: "R1", hand: "right" as const },
  { id: "R-index", label: "Right Index", short: "R2", hand: "right" as const },
  { id: "R-middle", label: "Right Middle", short: "R3", hand: "right" as const },
  { id: "R-ring", label: "Right Ring", short: "R4", hand: "right" as const },
  { id: "R-pinky", label: "Right Pinky", short: "R5", hand: "right" as const },
];

export const NAIL_SHAPES: { id: NailShape; label: string; note: string }[] = [
  { id: "round", label: "Round", note: "Soft natural curve" },
  { id: "oval", label: "Oval", note: "Elongated silhouette" },
  { id: "square", label: "Square", note: "Crisp architectural tip" },
  { id: "squoval", label: "Squoval", note: "Balanced flat-soft edge" },
  { id: "almond", label: "Almond", note: "Tapered editorial point" },
  { id: "coffin", label: "Coffin", note: "Sculpted flat taper" },
  { id: "stiletto", label: "Stiletto", note: "Dramatic sharp apex" },
];

export const NAIL_FINISHES: { id: NailFinish; label: string; opticalNote: string }[] = [
  { id: "glossy", label: "Glossy", opticalNote: "Mirror-smooth specular reflection" },
  { id: "matte", label: "Matte", opticalNote: "Micro-textured diffuse scattering" },
  { id: "pearlescent", label: "Pearlescent", opticalNote: "Layered nacre-inspired sheen" },
  { id: "chrome", label: "Chrome", opticalNote: "High-reflectivity metallic luster" },
  { id: "holographic", label: "Holographic", opticalNote: "Diffraction rainbow spectrum" },
  { id: "glitter", label: "Glitter", opticalNote: "Faceted reflective micro-flakes" },
  { id: "translucent", label: "Translucent", opticalNote: "Jelly light-transmitting depth" },
  { id: "aurora", label: "Aurora", opticalNote: "Angle-shifting thin-film glow" },
];

export const NAIL_COLORS: NailColor[] = [
  { id: "nude", name: "Silk Nude", hex: "#EBD7CC", secondaryHex: "#F7ECE6", family: "Neutrals" },
  { id: "blush", name: "Blush Quartz", hex: "#F2B8C6", secondaryHex: "#FCE1E8", family: "Roses" },
  { id: "rose", name: "Quantum Rose", hex: "#DC7A9E", secondaryHex: "#F5B8D0", family: "Roses" },
  { id: "lavender", name: "Soft Lavender", hex: "#C8B3EA", secondaryHex: "#E8DEFA", family: "Violets" },
  { id: "pearl", name: "Nano Pearl", hex: "#F3EFF8", secondaryHex: "#DDF3F5", family: "Luminous" },
  { id: "champagne", name: "Champagne Mist", hex: "#E9D4B5", secondaryHex: "#FAF0DF", family: "Neutrals" },
  { id: "opal", name: "Opal Veil", hex: "#CFEAE8", secondaryHex: "#E9D6F7", family: "Luminous" },
  { id: "aqua", name: "Photon Aqua", hex: "#7BD5DC", secondaryHex: "#C7F4F6", family: "Spectrum" },
  { id: "sapphire", name: "Deep Sapphire", hex: "#4D69B8", secondaryHex: "#8EA9F2", family: "Spectrum" },
  { id: "amethyst", name: "Amethyst Ion", hex: "#8B5CC4", secondaryHex: "#C9A5F5", family: "Violets" },
  { id: "emerald", name: "Crystal Emerald", hex: "#3DA88A", secondaryHex: "#9BE5CF", family: "Spectrum" },
  { id: "plasma", name: "Ultraviolet Pulse", hex: "#B54CD8", secondaryHex: "#6BE3EC", family: "Experimental" },
  { id: "solar", name: "Iridescent Coral", hex: "#F08C7E", secondaryHex: "#F8D59B", family: "Experimental" },
  { id: "midnight", name: "Midnight Plum", hex: "#3A2050", secondaryHex: "#8A5AC0", family: "Experimental" },
];

export const COATINGS: { id: CoatingType; name: string; tagline: string; description: string; tint: string }[] = [
  { id: "none", name: "Base Coat Only", tagline: "Unmodified finish", description: "Displays the selected pigment and finish without an added nanoscale thin-film layer.", tint: "transparent" },
  { id: "pearlescent-veil", name: "Pearlescent Veil", tagline: "Simulated nacre interference", description: "Illustrates how ultra-thin alternating mineral platelets create soft milky luminescence.", tint: "#F5EEFA" },
  { id: "holographic-prism", name: "Holographic Prism", tagline: "Simulated micro-grating", description: "Illustrates spectral dispersion where periodic nanostructures split white light into rainbow bands.", tint: "#C7F0FF" },
  { id: "hydrophobic-glass", name: "Nano-Silica Glass", tagline: "Simulated smooth barrier", description: "Illustrates high-clarity silica lattice concepts studied for optical smoothness and gloss.", tint: "#E6FAFF" },
  { id: "liquid-chrome", name: "Liquid Chrome Film", tagline: "Simulated specular mirror", description: "Illustrates densely packed reflective flakes aligning parallel to the nail curvature.", tint: "#DCD8EB" },
  { id: "aurora-film", name: "Aurora Thin-Film", tagline: "Simulated angle-shift optics", description: "Illustrates constructive interference shifting from violet to aqua as thickness changes.", tint: "#9EEEF2" },
];

export function createUniformNails(config: NailConfig): Record<string, NailConfig> {
  const map: Record<string, NailConfig> = {};
  for (const f of FINGER_IDS) map[f.id] = { ...config };
  return map;
}

export interface DesignPreset {
  id: string;
  name: string;
  subtitle: string;
  accentColors: [string, string, string];
  state: StudioState;
}

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    id: "opal-bloom",
    name: "Opal Bloom",
    subtitle: "Milky opal with pearlescent veil",
    accentColors: ["#CFEAE8", "#F2B8C6", "#E9D6F7"],
    state: {
      shape: "almond",
      length: 62,
      nails: {
        ...createUniformNails({ colorId: "opal", finish: "pearlescent", coating: "pearlescent-veil", coatingThickness: 180, particleSize: 65 }),
        "L-ring": { colorId: "blush", finish: "aurora", coating: "aurora-film", coatingThickness: 220, particleSize: 55 },
        "R-ring": { colorId: "blush", finish: "aurora", coating: "aurora-film", coatingThickness: 220, particleSize: 55 },
      },
    },
  },
  {
    id: "aurora-glass",
    name: "Aurora Glass",
    subtitle: "Translucent aqua thin-film glow",
    accentColors: ["#7BD5DC", "#C8B3EA", "#F3EFF8"],
    state: {
      shape: "oval",
      length: 58,
      nails: createUniformNails({ colorId: "aqua", finish: "aurora", coating: "aurora-film", coatingThickness: 260, particleSize: 45 }),
    },
  },
  {
    id: "nano-pearl",
    name: "Nano Pearl",
    subtitle: "Sculpted silk pearl luster",
    accentColors: ["#F3EFF8", "#EBD7CC", "#DDF3F5"],
    state: {
      shape: "squoval",
      length: 48,
      nails: createUniformNails({ colorId: "pearl", finish: "pearlescent", coating: "hydrophobic-glass", coatingThickness: 140, particleSize: 35 }),
    },
  },
  {
    id: "prism-veil",
    name: "Prism Veil",
    subtitle: "Diffraction shimmer over lavender",
    accentColors: ["#C8B3EA", "#7BD5DC", "#F5B8D0"],
    state: {
      shape: "coffin",
      length: 72,
      nails: createUniformNails({ colorId: "lavender", finish: "holographic", coating: "holographic-prism", coatingThickness: 320, particleSize: 95 }),
    },
  },
  {
    id: "lunar-chrome",
    name: "Lunar Chrome",
    subtitle: "Liquid silver-violet mirror finish",
    accentColors: ["#DCD8EB", "#8B5CC4", "#E8DEFA"],
    state: {
      shape: "almond",
      length: 66,
      nails: createUniformNails({ colorId: "champagne", finish: "chrome", coating: "liquid-chrome", coatingThickness: 190, particleSize: 40 }),
    },
  },
  {
    id: "crystal-garden",
    name: "Crystal Garden",
    subtitle: "Emerald and opal faceted sparkle",
    accentColors: ["#3DA88A", "#CFEAE8", "#9BE5CF"],
    state: {
      shape: "oval",
      length: 56,
      nails: {
        ...createUniformNails({ colorId: "emerald", finish: "glitter", coating: "hydrophobic-glass", coatingThickness: 210, particleSize: 110 }),
        "L-middle": { colorId: "opal", finish: "translucent", coating: "pearlescent-veil", coatingThickness: 160, particleSize: 60 },
        "R-middle": { colorId: "opal", finish: "translucent", coating: "pearlescent-veil", coatingThickness: 160, particleSize: 60 },
      },
    },
  },
  {
    id: "quantum-rose",
    name: "Quantum Rose",
    subtitle: "Editorial rose with violet shift",
    accentColors: ["#DC7A9E", "#B54CD8", "#FCE1E8"],
    state: {
      shape: "stiletto",
      length: 78,
      nails: createUniformNails({ colorId: "rose", finish: "aurora", coating: "aurora-film", coatingThickness: 290, particleSize: 50 }),
    },
  },
  {
    id: "holographic-dream",
    name: "Holographic Dream",
    subtitle: "Ultraviolet pulse with full spectrum",
    accentColors: ["#B54CD8", "#6BE3EC", "#3A2050"],
    state: {
      shape: "coffin",
      length: 74,
      nails: {
        ...createUniformNails({ colorId: "plasma", finish: "holographic", coating: "holographic-prism", coatingThickness: 380, particleSize: 120 }),
        "L-thumb": { colorId: "midnight", finish: "chrome", coating: "liquid-chrome", coatingThickness: 200, particleSize: 45 },
        "R-thumb": { colorId: "midnight", finish: "chrome", coating: "liquid-chrome", coatingThickness: 200, particleSize: 45 },
      },
    },
  },
];

export type IngredientCategory =
  | "Optical materials"
  | "Pigments"
  | "Minerals"
  | "Polymers"
  | "Surface textures"
  | "Research concepts";

export interface NanoIngredient {
  id: string;
  name: string;
  category: IngredientCategory;
  shortDescription: string;
  detailedDescription: string;
  scaleLabel: string;
  opticalEffect: string;
  colors: [string, string, string];
  pattern: "spheres" | "layers" | "hex" | "flakes" | "wave" | "dots";
  properties: { reflectivity: number; iridescence: number; transparency: number; smoothness: number };
}

export const NANO_INGREDIENTS: NanoIngredient[] = [
  {
    id: "nano-pearl",
    name: "Nano Pearl",
    category: "Optical materials",
    shortDescription: "Layered platelet concept inspired by natural mother-of-pearl sheen.",
    detailedDescription: "Illustrates how stacked mineral-like platelets reflect light from multiple depths simultaneously, creating a soft luminous glow rather than harsh sparkle.",
    scaleLabel: "40–120 nm platelets",
    opticalEffect: "Soft multi-layer luster",
    colors: ["#F4EEF9", "#E5D3F5", "#CDEFF2"],
    pattern: "layers",
    properties: { reflectivity: 74, iridescence: 82, transparency: 52, smoothness: 90 },
  },
  {
    id: "opal-particles",
    name: "Opal Particles",
    category: "Minerals",
    shortDescription: "Uniform silica spheres arranged in periodic three-dimensional lattices.",
    detailedDescription: "Natural opals owe their play of color not to dye, but to tiny silica spheres packed in regular rows that diffract specific visible wavelengths.",
    scaleLabel: "150–300 nm spheres",
    opticalEffect: "Structural play-of-color",
    colors: ["#CBECEB", "#F3C7DA", "#CDB8F0"],
    pattern: "spheres",
    properties: { reflectivity: 68, iridescence: 96, transparency: 64, smoothness: 80 },
  },
  {
    id: "titanium-dioxide",
    name: "Titanium Dioxide Concept",
    category: "Pigments",
    shortDescription: "High-refractive-index mineral studied for brightness and UV scattering.",
    detailedDescription: "Demonstrates how particle size dramatically alters appearance: larger particles scatter white light opaquely, while nanoscale dispersions become increasingly transparent.",
    scaleLabel: "20–250 nm particles",
    opticalEffect: "High-index scattering",
    colors: ["#F7F5FA", "#DCD8EA", "#A8C6E8"],
    pattern: "spheres",
    properties: { reflectivity: 92, iridescence: 28, transparency: 30, smoothness: 84 },
  },
  {
    id: "silica-structures",
    name: "Silica Structures",
    category: "Minerals",
    shortDescription: "Porous and smooth silicon-dioxide networks used to tune gloss or matte feel.",
    detailedDescription: "Illustrates how controlling surface geometry at the nanoscale shifts a surface between mirror-like clarity and velvety light-diffusing matte finishes.",
    scaleLabel: "10–80 nm pores",
    opticalEffect: "Tunable gloss / matte diffusion",
    colors: ["#E2F6FA", "#C4DDF2", "#EFE6FA"],
    pattern: "hex",
    properties: { reflectivity: 55, iridescence: 34, transparency: 88, smoothness: 94 },
  },
  {
    id: "gold-nanoparticle",
    name: "Gold Nanoparticle Concept",
    category: "Research concepts",
    shortDescription: "Metallic nanospheres that appear ruby-rose or violet instead of metallic yellow.",
    detailedDescription: "A famous nanoscience phenomenon: localized surface plasmon resonance makes suspended gold nanoparticles absorb green-blue light and glow deep rose-red.",
    scaleLabel: "15–60 nm spheres",
    opticalEffect: "Plasmonic ruby-rose tint",
    colors: ["#E47EA2", "#F4C28E", "#9E4F8E"],
    pattern: "dots",
    properties: { reflectivity: 70, iridescence: 62, transparency: 58, smoothness: 86 },
  },
  {
    id: "reflective-flakes",
    name: "Reflective Flakes",
    category: "Surface textures",
    shortDescription: "Ultra-thin faceted micro-plates engineered to bounce light like miniature mirrors.",
    detailedDescription: "Shows how alignment matters: when flat flakes lie parallel to a curved surface, they create sleek liquid-chrome reflections; angled flakes create glittering sparkle.",
    scaleLabel: "80–500 nm thickness",
    opticalEffect: "Specular chrome & sparkle",
    colors: ["#E6E4F2", "#B5B2D6", "#8CE4EE"],
    pattern: "flakes",
    properties: { reflectivity: 98, iridescence: 64, transparency: 15, smoothness: 88 },
  },
  {
    id: "photonic-crystal",
    name: "Photonic Crystal Concept",
    category: "Optical materials",
    shortDescription: "Periodic nanostructures inspired by butterfly wings that filter light by geometry.",
    detailedDescription: "Demonstrates structural color: repeating nanoscale cavities forbid certain wavelengths from passing through, reflecting vivid, fade-resistant iridescence.",
    scaleLabel: "180–400 nm periodicity",
    opticalEffect: "Angle-dependent structural color",
    colors: ["#7CD6E6", "#9E78E8", "#F09BC2"],
    pattern: "wave",
    properties: { reflectivity: 86, iridescence: 98, transparency: 48, smoothness: 82 },
  },
  {
    id: "liquid-crystal",
    name: "Liquid Crystal Concept",
    category: "Polymers",
    shortDescription: "Self-organizing helical molecules that shift hue with subtle temperature or angle changes.",
    detailedDescription: "Illustrates cholesteric phases where molecules twist like tiny staircases; the pitch of the spiral selects which color of light reflects back to the eye.",
    scaleLabel: "250–600 nm pitch",
    opticalEffect: "Chromatic shift & aurora glow",
    colors: ["#6FE0DE", "#C58AF5", "#F7A6C4"],
    pattern: "wave",
    properties: { reflectivity: 78, iridescence: 95, transparency: 72, smoothness: 92 },
  },
  {
    id: "graphene-concept",
    name: "Graphene Concept",
    category: "Research concepts",
    shortDescription: "Single-atom-thick carbon honeycomb lattice studied for extraordinary strength.",
    detailedDescription: "Represents a two-dimensional crystal sheet just one atom thick, famous in materials science for combining near-transparency with remarkable mechanical resilience.",
    scaleLabel: "0.34 nm sheet",
    opticalEffect: "Smoky architectural sheen",
    colors: ["#4C3E6B", "#7B6B9E", "#75D2DF"],
    pattern: "hex",
    properties: { reflectivity: 64, iridescence: 42, transparency: 76, smoothness: 96 },
  },
  {
    id: "quantum-dot",
    name: "Quantum Dot Concept",
    category: "Research concepts",
    shortDescription: "Semiconductor nanocrystals whose emitted color depends directly on particle size.",
    detailedDescription: "Because of quantum confinement, smaller nanocrystals emit higher-energy blue-aqua light while slightly larger ones emit lush rose and amber hues.",
    scaleLabel: "2–10 nm nanocrystals",
    opticalEffect: "Size-tuned fluorescence",
    colors: ["#6EE3F0", "#B46CF2", "#F47EA8"],
    pattern: "dots",
    properties: { reflectivity: 60, iridescence: 90, transparency: 84, smoothness: 88 },
  },
];

export interface MicroscopeSample {
  id: string;
  name: string;
  subtitle: string;
  scaleRange: string;
  explanation: string;
  lightBehavior: string;
  colors: [string, string, string];
  annotations: { x: number; y: number; label: string; detail: string }[];
}

export const MICROSCOPE_SAMPLES: MicroscopeSample[] = [
  {
    id: "particle-clusters",
    name: "Particle Clusters",
    subtitle: "Dispersed spherical nanoparticles",
    scaleRange: "15–90 nm diameter",
    explanation: "When nanoparticles are evenly dispersed, light scatters smoothly across the film. As you zoom in, individual spherical clusters and inter-particle spacing become visible.",
    lightBehavior: "Rayleigh-inspired short-wavelength scattering creates soft opalescent halos.",
    colors: ["#E9B8D8", "#9B7CE8", "#7BE0EC"],
    annotations: [
      { x: 32, y: 34, label: "Primary Sphere (~35 nm)", detail: "Uniform radius helps keep optical haze low." },
      { x: 66, y: 58, label: "Inter-particle Gap", detail: "Spacing governs whether light passes or scatters." },
    ],
  },
  {
    id: "layered-surfaces",
    name: "Layered Surfaces",
    subtitle: "Alternating thin-film optical stacks",
    scaleRange: "60–220 nm per layer",
    explanation: "Thin-film interference occurs when light reflects off both the top and bottom boundaries of microscopic transparent layers, reinforcing certain hues.",
    lightBehavior: "Constructive interference shifts color smoothly from rose to aqua.",
    colors: ["#F4C4D8", "#C8B3EA", "#8AE8EE"],
    annotations: [
      { x: 28, y: 30, label: "Top Optical Boundary", detail: "First reflection splits incoming white light." },
      { x: 68, y: 66, label: "Sub-layer Stack", detail: "Path-length difference selects the reflected hue." },
    ],
  },
  {
    id: "crystal-structures",
    name: "Crystal Structures",
    subtitle: "Ordered hexagonal photonic lattice",
    scaleRange: "180–340 nm lattice",
    explanation: "Periodic geometric lattices interact with light waves like an architectural sieve, reflecting vivid iridescent tones without traditional chemical dyes.",
    lightBehavior: "Bragg-like diffraction produces jewel-like angle-shifting sheen.",
    colors: ["#7BD5DC", "#8B5CC4", "#F2A6C8"],
    annotations: [
      { x: 48, y: 32, label: "Periodic Lattice Node", detail: "Regular geometry determines the reflected wavelength." },
      { x: 72, y: 64, label: "Photonic Cavity", detail: "Guides and filters specific light frequencies." },
    ],
  },
  {
    id: "smooth-coatings",
    name: "Smooth Coatings",
    subtitle: "Self-leveling glass-like polymer surface",
    scaleRange: "5–25 nm surface profile",
    explanation: "A surface that looks glossy to the eye is extraordinarily flat at the nanoscale, allowing parallel rays of light to reflect in a single clean direction.",
    lightBehavior: "High specular reflection creates a wet-look mirror gloss.",
    colors: ["#F6EFFA", "#D7EEF6", "#EBC8DF"],
    annotations: [
      { x: 35, y: 42, label: "Specular Plane", detail: "Variations smaller than visible wavelengths appear mirror-smooth." },
      { x: 68, y: 54, label: "Cross-linked Matrix", detail: "Simulated polymer network supporting the glossy top." },
    ],
  },
  {
    id: "reflective-flakes",
    name: "Reflective Flakes",
    subtitle: "Faceted metallic & pearlescent platelets",
    scaleRange: "120–500 nm platelets",
    explanation: "Flat micro-flakes act as tiny mirrors suspended inside a clear coat. Orientation determines whether the nail reads as sleek chrome or twinkling shimmer.",
    lightBehavior: "Directional micro-reflections produce sparkling highlights.",
    colors: ["#E5E0F5", "#9B93C9", "#89E7F0"],
    annotations: [
      { x: 38, y: 36, label: "Aligned Platelet", detail: "Parallel alignment boosts mirror-like chrome luster." },
      { x: 64, y: 68, label: "Tilted Facet", detail: "Catches light at steep angles for starry sparkle." },
    ],
  },
  {
    id: "nanostructured-patterns",
    name: "Nanostructured Patterns",
    subtitle: "Holographic diffraction micro-grooves",
    scaleRange: "400–800 nm ridge pitch",
    explanation: "Microscopic parallel ridges split white light into a crisp rainbow fan, similar to the shimmer on a prism or iridescent beetle shell.",
    lightBehavior: "Diffraction spreads wavelengths across viewing angles.",
    colors: ["#F49CC0", "#86E5EE", "#B48CF5"],
    annotations: [
      { x: 30, y: 40, label: "Diffraction Groove", detail: "Ridge spacing matches visible light wavelengths." },
      { x: 70, y: 58, label: "Spectral Dispersion", detail: "Separates violet, aqua, and rose bands cleanly." },
    ],
  },
];

export interface PhotonicsMission {
  id: string;
  title: string;
  difficulty: "Beginner" | "Explorer" | "Lab Master";
  intro: string;
  goalText: string;
  controlLabel: string;
  unit: string;
  min: number;
  max: number;
  targetMin: number;
  targetMax: number;
  initial: number;
  scienceTakeaway: string;
  accent: [string, string];
}

export const PHOTONICS_MISSIONS: PhotonicsMission[] = [
  {
    id: "explore-spectrum",
    title: "Explore the Spectrum",
    difficulty: "Beginner",
    intro: "Visible light spans roughly 380 nm to 700 nm. Tune the photon beam to isolate luminous Aqua-Cyan light.",
    goalText: "Tune wavelength between 480 nm and 515 nm.",
    controlLabel: "Wavelength",
    unit: "nm",
    min: 380,
    max: 700,
    targetMin: 480,
    targetMax: 515,
    initial: 610,
    scienceTakeaway: "Shorter wavelengths appear violet and aqua; longer wavelengths shift toward rose and red.",
    accent: ["#7BD5DC", "#9B7CE8"],
  },
  {
    id: "color-changing-surface",
    title: "The Color-Changing Surface",
    difficulty: "Beginner",
    intro: "Adjust the simulated thin-film thickness until constructive interference reveals a vivid Aurora Lavender sheen.",
    goalText: "Set film thickness between 230 nm and 285 nm.",
    controlLabel: "Film Thickness",
    unit: "nm",
    min: 80,
    max: 480,
    targetMin: 230,
    targetMax: 285,
    initial: 120,
    scienceTakeaway: "Changing a transparent coating by just tens of nanometers shifts which color waves reinforce each other.",
    accent: ["#C8B3EA", "#F2B8C6"],
  },
  {
    id: "light-reflection",
    title: "Light and Reflection",
    difficulty: "Explorer",
    intro: "Match the detector angle to capture peak specular mirror reflection from a smooth nano-silica finish.",
    goalText: "Align the viewing angle between 42° and 48° (matching the 45° incoming beam).",
    controlLabel: "Viewing Angle",
    unit: "°",
    min: 10,
    max: 80,
    targetMin: 42,
    targetMax: 48,
    initial: 22,
    scienceTakeaway: "On a mirror-smooth coating, the angle of reflection equals the angle of incidence.",
    accent: ["#E5E0F5", "#7BD5DC"],
  },
  {
    id: "holographic-materials",
    title: "Holographic Materials",
    difficulty: "Explorer",
    intro: "Set the diffraction grating spacing so white light spreads into a balanced holographic rainbow.",
    goalText: "Dial groove spacing between 520 nm and 600 nm.",
    controlLabel: "Groove Spacing",
    unit: "nm",
    min: 250,
    max: 950,
    targetMin: 520,
    targetMax: 600,
    initial: 820,
    scienceTakeaway: "Periodic ridges close in size to visible wavelengths create vibrant holographic dispersion.",
    accent: ["#F09BC2", "#7CE4EE"],
  },
  {
    id: "prism-challenge",
    title: "The Prism Challenge",
    difficulty: "Lab Master",
    intro: "Increase the simulated refractive index of an optical top-coat to maximize prism-like brilliance.",
    goalText: "Set refractive index factor between 165 and 185 (representing 1.65–1.85).",
    controlLabel: "Refractive Index (×100)",
    unit: "",
    min: 120,
    max: 210,
    targetMin: 165,
    targetMax: 185,
    initial: 132,
    scienceTakeaway: "Higher refractive index bends light more sharply, deepening apparent gloss and sparkle.",
    accent: ["#8B5CC4", "#F4C28E"],
  },
  {
    id: "light-pattern",
    title: "Build a Light Pattern",
    difficulty: "Lab Master",
    intro: "Synchronize two overlapping light waves in phase to create a bright constructive interference band.",
    goalText: "Align phase offset between 0° and 20° (or 340°–360°).",
    controlLabel: "Phase Offset",
    unit: "°",
    min: 0,
    max: 360,
    targetMin: 0,
    targetMax: 24,
    initial: 180,
    scienceTakeaway: "Waves in phase amplify brightness; waves 180° out of phase cancel each other out.",
    accent: ["#B54CD8", "#6BE3EC"],
  },
];

export interface WomanInScience {
  id: string;
  name: string;
  years: string;
  field: "Optics & Photonics" | "Materials & Nanoscience" | "Chemistry & Structure";
  initials: string;
  accent: [string, string];
  bio: string;
  contribution: string;
}

export const WOMEN_IN_SCIENCE: WomanInScience[] = [
  {
    id: "dresselhaus",
    name: "Mildred Dresselhaus",
    years: "1930–2017",
    field: "Materials & Nanoscience",
    initials: "MD",
    accent: ["#8B5CC4", "#7BD5DC"],
    bio: "MIT physicist and electrical engineer widely honored as the 'Queen of Carbon Science.'",
    contribution: "Pioneered foundational research on carbon nanostructures, graphite intercalation, and nanomaterials.",
  },
  {
    id: "strickland",
    name: "Donna Strickland",
    years: "b. 1959",
    field: "Optics & Photonics",
    initials: "DS",
    accent: ["#6EE3F0", "#9E78E8"],
    bio: "Canadian optical physicist and co-recipient of the 2018 Nobel Prize in Physics.",
    contribution: "Co-invented chirped pulse amplification, enabling ultra-short, high-intensity laser pulses used across photonics.",
  },
  {
    id: "blodgett",
    name: "Katharine Burr Blodgett",
    years: "1898–1979",
    field: "Materials & Nanoscience",
    initials: "KB",
    accent: ["#F2B8C6", "#C8B3EA"],
    bio: "Physicist and chemist who became the first woman to earn a PhD in physics from the University of Cambridge.",
    contribution: "Developed molecularly thin Langmuir–Blodgett films and anti-reflective 'invisible' glass coatings.",
  },
  {
    id: "franklin",
    name: "Rosalind Franklin",
    years: "1920–1958",
    field: "Chemistry & Structure",
    initials: "RF",
    accent: ["#DC7A9E", "#8EA9F2"],
    bio: "British chemist and X-ray crystallographer known for precision structural imaging.",
    contribution: "Produced crucial X-ray diffraction evidence revealing the structures of DNA, RNA, viruses, and carbon materials.",
  },
  {
    id: "hodgkin",
    name: "Dorothy Crowfoot Hodgkin",
    years: "1910–1994",
    field: "Chemistry & Structure",
    initials: "DH",
    accent: ["#3DA88A", "#C8B3EA"],
    bio: "Nobel Prize–winning chemist who advanced X-ray crystallography for complex molecules.",
    contribution: "Mapped the three-dimensional atomic structures of penicillin, vitamin B12, and insulin.",
  },
  {
    id: "hammond",
    name: "Paula T. Hammond",
    years: "b. 1963",
    field: "Materials & Nanoscience",
    initials: "PH",
    accent: ["#B54CD8", "#F4C28E"],
    bio: "Chemical engineer and Institute Professor at MIT specializing in macromolecular self-assembly.",
    contribution: "Pioneered layer-by-layer nanoscale polymer films for biomedical delivery and functional coatings.",
  },
  {
    id: "bao",
    name: "Zhenan Bao",
    years: "b. 1970",
    field: "Materials & Nanoscience",
    initials: "ZB",
    accent: ["#7BD5DC", "#F09BC2"],
    bio: "Chemical engineer at Stanford University researching bio-inspired flexible materials.",
    contribution: "Developed skin-inspired stretchable polymers and organic electronic materials engineered at the nanoscale.",
  },
  {
    id: "curie",
    name: "Marie Skłodowska Curie",
    years: "1867–1934",
    field: "Chemistry & Structure",
    initials: "MC",
    accent: ["#4D69B8", "#C8B3EA"],
    bio: "Physicist and chemist who became the first person to win Nobel Prizes in two different sciences.",
    contribution: "Established foundational studies of radioactivity and isolated the elements polonium and radium.",
  },
];

export interface GlossaryEntry {
  id: string;
  term: string;
  simple: string;
  detailed: string;
  related: string[];
}

export const GLOSSARY_TERMS: GlossaryEntry[] = [
  { id: "nanotechnology", term: "Nanotechnology", simple: "Working with matter at the scale of 1 to 100 nanometers—about 1,000 times smaller than a human hair is wide.", detailed: "At the nanoscale, surfaces and particles can interact with light, electricity, and neighboring molecules differently than bulk materials do.", related: ["Nanoparticle", "Surface Area", "Quantum Dot"] },
  { id: "nanoparticle", term: "Nanoparticle", simple: "A microscopic particle measuring between roughly 1 and 100 nanometers across.", detailed: "Because so many of its atoms sit on or near the exterior, a nanoparticle's size and shape strongly influence its color, clarity, and optical scattering.", related: ["Nanotechnology", "Dispersion", "Light Scattering"] },
  { id: "surface-area", term: "Surface Area", simple: "The total exposed outer area of a material.", detailed: "Breaking a solid into nanoscale particles multiplies its total surface area dramatically while keeping the same overall mass, amplifying surface interactions.", related: ["Nanoparticle", "Material Interface"] },
  { id: "photonics", term: "Photonics", simple: "The science and technology of generating, guiding, and shaping light.", detailed: "Photonics explores how photons travel through lenses, crystals, thin films, and nanostructures to produce color, reflection, and optical signals.", related: ["Optical Properties", "Reflectivity", "Light Scattering"] },
  { id: "optical-properties", term: "Optical Properties", simple: "How a material reflects, transmits, absorbs, or bends light.", detailed: "Gloss, opacity, sparkle, pearlescence, and color-shifting sheen all arise from a material's optical properties and surface geometry.", related: ["Photonics", "Reflectivity", "Crystal Structure"] },
  { id: "polymer", term: "Polymer", simple: "A long-chain molecule built from many repeating smaller chemical units.", detailed: "Polymers form flexible films, glossy coatings, and smooth matrices capable of suspending pigments or optical micro-flakes.", related: ["Material Interface", "Dispersion"] },
  { id: "dispersion", term: "Dispersion", simple: "How evenly particles are spread throughout a liquid or solid matrix, or how light splits into colors.", detailed: "In materials science, uniform dispersion keeps coatings smooth; in optics, dispersion describes white light fanning into spectral colors.", related: ["Nanoparticle", "Polymer", "Optical Properties"] },
  { id: "crystal-structure", term: "Crystal Structure", simple: "An orderly, repeating three-dimensional arrangement of atoms or particles.", detailed: "Ordered lattices—from gemstones to photonic opals—interact predictably with light waves to create structural iridescence.", related: ["Optical Properties", "Photonics"] },
  { id: "reflectivity", term: "Reflectivity", simple: "The share of incoming light a surface bounces back.", detailed: "Smooth metallic or high-index layers reflect light in crisp mirror-like beams, whereas rough textures scatter light softly in all directions.", related: ["Optical Properties", "Light Scattering"] },
  { id: "quantum-dot", term: "Quantum Dot", simple: "A tiny semiconductor crystal whose color depends directly on its nanoscale size.", detailed: "Confining electrons within a few nanometers alters their energy spacing, allowing researchers to tune emitted light across the spectrum.", related: ["Nanotechnology", "Photonics"] },
  { id: "light-scattering", term: "Light Scattering", simple: "The redirection of light rays when they strike tiny particles or uneven surfaces.", detailed: "Scattering explains why frosted glass looks soft, why fine matte finishes diffuse glare, and why the sky appears blue.", related: ["Nanoparticle", "Reflectivity"] },
  { id: "material-interface", term: "Material Interface", simple: "The boundary where two different materials or layers meet.", detailed: "Optical thin-film effects occur right at material interfaces, where partial reflection and transmission create glowing color shifts.", related: ["Surface Area", "Polymer", "Optical Properties"] },
];