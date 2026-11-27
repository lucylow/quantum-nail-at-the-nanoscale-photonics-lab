import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Eye, Layers, RotateCcw, Save, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getColorById, SingleNailSvg } from "@/components/NanoVisuals";
import {
  COATINGS,
  DESIGN_PRESETS,
  FINGER_IDS,
  NAIL_COLORS,
  NAIL_FINISHES,
  NAIL_SHAPES,
  type CoatingType,
  type NailFinish,
  type NailShape,
  type SavedDesign,
  type StudioState,
} from "@/data/nanoData";
import { consumePendingStudioDesign, readDesigns, writeDesigns } from "@/lib/storage";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Nano Nail Studio — Nails at the Nanoscale" },
      {
        name: "description",
        content: "Design all ten fingernails with shapes, optical finishes, presets, and simulated nanoscale coatings.",
      },
      { property: "og:title", content: "Nano Nail Studio — Nails at the Nanoscale" },
      { property: "og:description", content: "Interactive nail-design workspace with simulated nano-coatings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudioPage,
});

function cloneState(s: StudioState): StudioState {
  const nails: StudioState["nails"] = {};
  for (const [k, v] of Object.entries(s.nails)) nails[k] = { ...v };
  return { shape: s.shape, length: s.length, nails };
}

function StudioPage() {
  const [studio, setStudio] = useState<StudioState>(() => cloneState(DESIGN_PRESETS[0]!.state));
  const [activeHand, setActiveHand] = useState<"both" | "left" | "right">("both");
  const [selectedIds, setSelectedIds] = useState<string[]>(["L-ring"]);
  const [panelTab, setPanelTab] = useState<"design" | "coating" | "presets">("design");
  const [beforeAfter, setBeforeAfter] = useState<"after" | "before">("after");
  const [designName, setDesignName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const pending = consumePendingStudioDesign();
    if (pending) {
      setStudio(cloneState(pending.state));
      setDesignName(pending.name);
      setEditingId(pending.id);
      toast.info(`Loaded "${pending.name}" into Nano Studio`);
    }
  }, []);

  const primaryId = selectedIds[0] ?? "L-ring";
  const primaryNail = studio.nails[primaryId] ?? studio.nails["L-ring"]!;
  const activeCoating = COATINGS.find((c) => c.id === primaryNail.coating) ?? COATINGS[0]!;

  const toggleFinger = (id: string, multi: boolean) => {
    if (multi) {
      setSelectedIds((prev) => (prev.includes(id) ? (prev.length > 1 ? prev.filter((x) => x !== id) : prev) : [...prev, id]));
    } else {
      setSelectedIds([id]);
    }
  };

  const updateNails = (targetIds: string[], patch: Partial<typeof primaryNail>) => {
    setStudio((prev) => {
      const nextNails = { ...prev.nails };
      for (const id of targetIds) {
        const current = nextNails[id];
        if (current) nextNails[id] = { ...current, ...patch };
      }
      return { ...prev, nails: nextNails };
    });
  };

  const applyToSelected = (patch: Partial<typeof primaryNail>) => updateNails(selectedIds, patch);
  const applyToAll = () => {
    updateNails(
      FINGER_IDS.map((f) => f.id),
      { ...primaryNail },
    );
    toast.success("Applied current nail style to all ten nails");
  };

  const resetDesign = () => {
    setStudio(cloneState(DESIGN_PRESETS[0]!.state));
    setSelectedIds(["L-ring"]);
    setDesignName("");
    setEditingId(null);
    toast("Reset to Opal Bloom starter design");
  };

  const saveDesign = () => {
    const trimmed = designName.trim() || `Nano Creation ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    const existing = readDesigns();
    const entry: SavedDesign = {
      id: editingId ?? `design-${Date.now()}`,
      name: trimmed,
      createdAt: new Date().toISOString(),
      state: cloneState(studio),
    };
    const updated = editingId ? existing.map((d) => (d.id === editingId ? entry : d)) : [entry, ...existing];
    if (editingId && !existing.some((d) => d.id === editingId)) updated.unshift(entry);
    writeDesigns(updated);
    setDesignName(trimmed);
    setEditingId(entry.id);
    toast.success(`Saved "${trimmed}" to your Lookbook`);
  };

  const visibleHands: ("left" | "right")[] = activeHand === "both" ? ["left", "right"] : [activeHand];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col justify-between gap-4 border-b border-border/70 pb-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Interactive Workspace</p>
          <h1 className="mt-1 font-editorial text-4xl font-semibold text-foreground sm:text-5xl">Nano Nail Studio</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Select any nail—or hold multi-select—to customize color, shape, optical finish, and simulated nanoscale coatings.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            placeholder="Name your design..."
            aria-label="Design name"
            className="h-10 rounded-full border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
          <button
            type="button"
            onClick={saveDesign}
            className="btn-nano inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-xs font-semibold"
          >
            <Save className="h-3.5 w-3.5" /> Save Design
          </button>
          <button
            type="button"
            onClick={resetDesign}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-xs font-medium text-foreground hover:bg-secondary"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Live Hand & Nail Preview Canvas */}
        <div className="lg:col-span-7">
          <div className="holo-border rounded-3xl p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex rounded-full border border-border bg-secondary/70 p-1 text-xs">
                {(["both", "left", "right"] as const).map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setActiveHand(h)}
                    className={`rounded-full px-3 py-1 font-medium capitalize transition-colors ${
                      activeHand === h ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {h === "both" ? "Both Hands" : `${h} Hand`}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedIds(FINGER_IDS.map((f) => f.id))}
                  className="rounded-full border border-border px-3 py-1 font-medium text-foreground hover:bg-secondary"
                >
                  Select All 10
                </button>
                <button
                  type="button"
                  onClick={applyToAll}
                  className="rounded-full bg-accent px-3 py-1 font-medium text-accent-foreground hover:opacity-90"
                >
                  Apply Style to All
                </button>
              </div>
            </div>

            {/* Interactive Hands Stage */}
            <div
              className={`mt-6 grid gap-6 rounded-2xl bg-gradient-to-b from-secondary/50 via-card to-pearl/60 p-5 ${
                visibleHands.length === 2 ? "sm:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {visibleHands.map((hand) => {
                const fingers = FINGER_IDS.filter((f) => f.hand === hand);
                const ordered = hand === "left" ? [...fingers].reverse() : fingers;
                const offsets = hand === "left" ? [28, 12, 0, 10, 38] : [38, 10, 0, 12, 28];
                return (
                  <div key={hand} className="flex flex-col items-center">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {hand === "left" ? "Left Hand" : "Right Hand"}
                    </span>
                    <div className="mt-4 flex items-end justify-center gap-1.5 sm:gap-2">
                      {ordered.map((finger, idx) => {
                        const cfg = studio.nails[finger.id]!;
                        const isSel = selectedIds.includes(finger.id);
                        return (
                          <button
                            key={finger.id}
                            type="button"
                            onClick={(e) => toggleFinger(finger.id, e.shiftKey || e.metaKey || e.ctrlKey)}
                            style={{ marginBottom: `${offsets[idx] ?? 0}px` }}
                            aria-pressed={isSel}
                            aria-label={`Select ${finger.label}`}
                            className={`group flex flex-col items-center rounded-2xl p-1.5 transition-all ${
                              isSel ? "bg-primary/12 ring-2 ring-primary" : "hover:bg-secondary/80"
                            }`}
                          >
                            <SingleNailSvg
                              config={cfg}
                              shape={studio.shape}
                              length={studio.length}
                              uid={`stage-${finger.id}`}
                              selected={isSel}
                              showCoating={beforeAfter === "after"}
                              className="h-24 w-12 sm:h-28 sm:w-14"
                            />
                            <span className="mt-1.5 rounded-full bg-blush/35 px-2 py-0.5 font-mono text-[10px] text-foreground">
                              {finger.short}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Finger Readout + Before/After */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card/80 px-4 py-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-foreground">
                  Selected ({selectedIds.length}):
                </span>
                <span className="text-muted-foreground">
                  {selectedIds.length === 10
                    ? "All 10 nails"
                    : selectedIds.map((id) => FINGER_IDS.find((f) => f.id === id)?.short ?? id).join(", ")}
                </span>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium text-secondary-foreground">
                  {getColorById(primaryNail.colorId).name} · {primaryNail.finish}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setBeforeAfter((v) => (v === "after" ? "before" : "after"))}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-medium text-foreground hover:bg-secondary"
              >
                <Eye className="h-3.5 w-3.5 text-primary" />
                {beforeAfter === "after" ? "Coating: After" : "Coating: Before"}
              </button>
            </div>

            {/* Multi-finger quick chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {FINGER_IDS.map((f) => {
                const active = selectedIds.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFinger(f.id, true)}
                    className={`rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors ${
                      active ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f.short}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Controls Panel */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-xs sm:p-6">
            <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-secondary/70 p-1 text-xs font-semibold">
              {[
                { id: "design" as const, label: "Color & Shape" },
                { id: "coating" as const, label: "Nano Coating" },
                { id: "presets" as const, label: "Presets (8)" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPanelTab(t.id)}
                  className={`rounded-xl py-2 transition-colors ${
                    panelTab === t.id ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {panelTab === "design" && (
              <div className="mt-6 space-y-6">
                {/* Color Palette */}
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="font-editorial text-xl font-semibold">Color Palette</h2>
                    <span className="text-xs text-muted-foreground">{getColorById(primaryNail.colorId).name}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-7 gap-2">
                    {NAIL_COLORS.map((c) => {
                      const active = primaryNail.colorId === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          title={c.name}
                          aria-label={c.name}
                          onClick={() => applyToSelected({ colorId: c.id })}
                          className={`relative h-9 w-9 rounded-full border transition-transform hover:scale-105 ${
                            active ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : "border-border"
                          }`}
                          style={{ background: `linear-gradient(135deg, ${c.secondaryHex}, ${c.hex})` }}
                        >
                          {active && <Check className="mx-auto h-3.5 w-3.5 text-plum" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Finish Selection */}
                <div>
                  <h2 className="font-editorial text-xl font-semibold">Optical Finish</h2>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {NAIL_FINISHES.map((fin) => {
                      const active = primaryNail.finish === fin.id;
                      return (
                        <button
                          key={fin.id}
                          type="button"
                          onClick={() => applyToSelected({ finish: fin.id as NailFinish })}
                          className={`rounded-2xl border p-2.5 text-left transition-colors ${
                            active ? "border-primary bg-primary/10" : "border-border bg-background/60 hover:bg-secondary/60"
                          }`}
                        >
                          <div className="text-xs font-semibold text-foreground">{fin.label}</div>
                          <div className="mt-0.5 text-[11px] text-muted-foreground">{fin.opticalNote}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Shape & Length */}
                <div>
                  <h2 className="font-editorial text-xl font-semibold">Nail Shape & Length</h2>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {NAIL_SHAPES.map((sh) => (
                      <button
                        key={sh.id}
                        type="button"
                        onClick={() => setStudio((s) => ({ ...s, shape: sh.id as NailShape }))}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          studio.shape === sh.id
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-secondary"
                        }`}
                      >
                        {sh.label}
                      </button>
                    ))}
                  </div>
                  <label className="mt-4 block text-xs font-medium text-foreground">
                    Length: <span className="font-mono text-primary">{studio.length}%</span>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={studio.length}
                      onChange={(e) => setStudio((s) => ({ ...s, length: Number(e.target.value) }))}
                      className="mt-1.5 w-full accent-primary"
                    />
                  </label>
                </div>
              </div>
            )}

            {panelTab === "coating" && (
              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-editorial text-xl font-semibold">Nano Coating Simulator</h2>
                  <Layers className="h-4 w-4 text-primary" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {COATINGS.map((c) => {
                    const active = primaryNail.coating === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => applyToSelected({ coating: c.id as CoatingType })}
                        className={`rounded-2xl border p-2.5 text-left transition-colors ${
                          active ? "border-primary bg-primary/10" : "border-border bg-background/60 hover:bg-secondary/60"
                        }`}
                      >
                        <div className="text-xs font-semibold text-foreground">{c.name}</div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground">{c.tagline}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3 rounded-2xl border border-border/70 bg-secondary/40 p-4">
                  <label className="block text-xs font-medium text-foreground">
                    Simulated Coating Thickness:{" "}
                    <span className="font-mono text-primary">{primaryNail.coatingThickness} nm</span>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      value={primaryNail.coatingThickness}
                      onChange={(e) => applyToSelected({ coatingThickness: Number(e.target.value) })}
                      className="mt-1.5 w-full accent-primary"
                    />
                  </label>
                  <label className="block text-xs font-medium text-foreground">
                    Simulated Particle Size:{" "}
                    <span className="font-mono text-primary">{primaryNail.particleSize} nm</span>
                    <input
                      type="range"
                      min={5}
                      max={200}
                      value={primaryNail.particleSize}
                      onChange={(e) => applyToSelected({ particleSize: Number(e.target.value) })}
                      className="mt-1.5 w-full accent-primary"
                    />
                  </label>
                </div>

                {/* Visual Cross-Section Layer Representation */}
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Visual Layer Cross-Section (Illustrative)
                  </p>
                  <div className="mt-3 space-y-1.5">
                    <div
                      className="flex items-center justify-between rounded-lg border border-aqua/50 px-3 text-[11px] font-medium text-plum transition-all"
                      style={{
                        height: `${Math.max(24, Math.round(18 + (primaryNail.coatingThickness / 500) * 34))}px`,
                        background:
                          primaryNail.coating === "none"
                            ? "transparent"
                            : "linear-gradient(90deg, #F5B8D0, #C8B3EA, #7BE5EC)",
                      }}
                    >
                      <span>{activeCoating.name}</span>
                      <span className="font-mono">{primaryNail.coatingThickness} nm</span>
                    </div>
                    <div
                      className="flex h-7 items-center justify-between rounded-lg px-3 text-[11px] font-medium text-plum"
                      style={{ backgroundColor: getColorById(primaryNail.colorId).hex }}
                    >
                      <span>Pigment Layer ({primaryNail.finish})</span>
                      <span className="font-mono">{primaryNail.particleSize} nm dots</span>
                    </div>
                    <div className="flex h-6 items-center justify-between rounded-lg bg-blush/40 px-3 text-[11px] text-foreground">
                      <span>Keratin Nail Plate</span>
                      <span className="font-mono">Base</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{activeCoating.description}</p>
                  <p className="mt-2 rounded-xl bg-muted px-3 py-2 text-[11px] text-muted-foreground">
                    Educational visual simulation only—sliders illustrate optical concepts and do not represent validated
                    laboratory measurements.
                  </p>
                </div>
              </div>
            )}

            {panelTab === "presets" && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-editorial text-xl font-semibold">Signature Presets</h2>
                  <Link to="/lookbook" className="text-xs font-medium text-primary hover:underline">
                    Open Lookbook
                  </Link>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {DESIGN_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setStudio(cloneState(preset.state));
                        setDesignName(preset.name);
                        toast.success(`Applied "${preset.name}" preset`);
                      }}
                      className="group rounded-2xl border border-border bg-background/70 p-3 text-left transition-all hover:border-primary hover:shadow-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        {preset.accentColors.map((hex, i) => (
                          <span
                            key={i}
                            className="h-4 w-4 rounded-full border border-border/70"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                        <Sparkles className="ml-auto h-3.5 w-3.5 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <div className="mt-2 text-xs font-semibold text-foreground">{preset.name}</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">{preset.subtitle}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}