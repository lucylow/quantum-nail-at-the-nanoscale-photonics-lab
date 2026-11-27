import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Atom,
  Beaker,
  BookOpen,
  Compass,
  FlaskConical,
  Layers,
  Microscope,
  Palette,
  Sparkles,
  Users,
} from "lucide-react";
import heroImg from "@/assets/nano-hero.jpg";
import { MaterialArtSvg } from "@/components/NanoVisuals";
import { NANO_INGREDIENTS } from "@/data/nanoData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nails at the Nanoscale — Beauty at the Smallest Scale" },
      {
        name: "description",
        content:
          "Explore the intersection of nail artistry, nanotechnology, materials science, and light in an interactive beauty laboratory.",
      },
      { property: "og:title", content: "Nails at the Nanoscale — Beauty at the Smallest Scale" },
      {
        property: "og:description",
        content: "Design iridescent nails, inspect nanostructures, mix simulated materials, and explore photonics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const FEATURED_MODULES = [
  {
    to: "/studio" as const,
    title: "Nano Nail Studio",
    description: "Sculpt ten individual nails with seven shapes, eight optical finishes, presets, and simulated nano-coatings.",
    cta: "Open Studio",
    icon: Palette,
    accent: "from-blush/50 via-lavender/35 to-aqua/35",
    span: "md:col-span-2",
  },
  {
    to: "/ingredients" as const,
    title: "Nano Ingredient Library",
    description: "Browse ten educational optical materials, compare properties, and curate your favorites.",
    cta: "Browse Materials",
    icon: Layers,
    accent: "from-lavender/45 via-pearl to-blush/35",
    span: "md:col-span-1",
  },
  {
    to: "/microscope" as const,
    title: "Nano-Zoom Microscope",
    description: "Zoom from macro gloss down to 100,000× simulated crystal lattices and thin-film stacks.",
    cta: "Inspect Samples",
    icon: Microscope,
    accent: "from-aqua/40 via-lavender/30 to-card",
    span: "md:col-span-1",
  },
  {
    to: "/mixing-lab" as const,
    title: "Material Mixing Station",
    description: "Combine simulated nanomaterials, tune proportions, and preview custom iridescent blends.",
    cta: "Start Mixing",
    icon: FlaskConical,
    accent: "from-blush/40 via-aqua/30 to-lavender/40",
    span: "md:col-span-2",
  },
  {
    to: "/photonics" as const,
    title: "Photonics Missions",
    description: "Solve six interactive light, spectrum, prism, and interference challenges.",
    cta: "Play Missions",
    icon: Compass,
    accent: "from-aqua/45 via-lilac/30 to-blush/30",
    span: "md:col-span-1",
  },
  {
    to: "/quantum-lab" as const,
    title: "Quantum Lab",
    description: "Explore luminous wave patterns, superposition, quantum dots, and probability visuals.",
    cta: "Enter Quantum Lab",
    icon: Atom,
    accent: "from-violet-deep/85 via-plum to-violet-deep/90",
    dark: true,
    span: "md:col-span-1",
  },
  {
    to: "/women-in-science" as const,
    title: "Women in Science",
    description: "Celebrate pioneering scientists whose discoveries shaped optics, polymers, and nanoscience.",
    cta: "Meet Pioneers",
    icon: Users,
    accent: "from-blush/40 via-pearl to-lavender/35",
    span: "md:col-span-1",
  },
  {
    to: "/glossary" as const,
    title: "Scientific Glossary",
    description: "Decode photonics, nanoparticles, dispersion, and crystal structure in plain language.",
    cta: "Explore Glossary",
    icon: BookOpen,
    accent: "from-lavender/40 via-aqua/25 to-pearl",
    span: "md:col-span-3",
  },
];

function HomePage() {
  const discovery = NANO_INGREDIENTS[6]!; // Photonic Crystal Concept

  return (
    <div>
      {/* Full-bleed luxury editorial hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Iridescent pearlescent nails hovering above glowing optical prisms in a futuristic beauty laboratory"
            width={1440}
            height={896}
            className="h-full w-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/78 to-background/15 dark:from-plum/95 dark:via-plum/82 dark:to-plum/25" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:py-32">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/75 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-primary backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" /> Where Beauty Meets Nanotechnology
            </p>
            <h1 className="mt-6 font-editorial text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              BEAUTY AT THE SMALLEST SCALE.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore the extraordinary intersection of nail artistry, nanotechnology, materials science, and light.
              Design, discover, and experiment in a futuristic beauty laboratory.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/studio"
                className="btn-nano inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide"
              >
                ENTER THE NANO STUDIO
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/microscope"
                className="glass-panel inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                EXPLORE THE SCIENCE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery of the Day */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="holo-border overflow-hidden rounded-3xl shadow-sm">
          <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-4">
                <MaterialArtSvg item={discovery} className="h-48 w-full" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Discovery of the Day</p>
              <h2 className="mt-2 font-editorial text-3xl font-semibold text-foreground sm:text-4xl">
                {discovery.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {discovery.detailedDescription}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground">
                  {discovery.scaleLabel}
                </span>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  {discovery.opticalEffect}
                </span>
                <span className="text-xs text-muted-foreground">Illustrative educational concept</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/ingredients"
                  className="btn-nano inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide"
                >
                  Explore Material Library
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/lookbook"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <Beaker className="h-3.5 w-3.5 text-primary" />
                  View Saved Lookbook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eight Featured Experiences */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-editorial text-4xl font-semibold text-foreground sm:text-5xl">
            Inside the Beauty-Science Laboratory
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Eight interactive rooms connecting color, light, nanostructure, and creative nail design.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {FEATURED_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.to}
                to={mod.to}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7 ${mod.accent} ${mod.span} ${
                  mod.dark ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                <div>
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${
                      mod.dark
                        ? "border-aqua/40 bg-plum/60 text-aqua"
                        : "border-border/70 bg-card/85 text-primary shadow-xs"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-editorial text-2xl font-semibold sm:text-3xl">{mod.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${mod.dark ? "opacity-85" : "text-muted-foreground"}`}>
                    {mod.description}
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                  <span>{mod.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
