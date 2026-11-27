import type { SavedDesign, SavedExperiment } from "@/data/nanoData";

const KEYS = {
  theme: "nano-nails-theme",
  designs: "nano-nails-lookbook",
  favorites: "nano-nails-favorites",
  missions: "nano-nails-missions",
  experiments: "nano-nails-experiments",
  activeEdit: "nano-nails-active-edit",
} as const;

export type ThemeMode = "cozy" | "lab";

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors in mock mode
  }
}

export const readTheme = (): ThemeMode => safeRead<ThemeMode>(KEYS.theme, "cozy");
export const writeTheme = (mode: ThemeMode): void => safeWrite(KEYS.theme, mode);

export const readDesigns = (): SavedDesign[] => safeRead<SavedDesign[]>(KEYS.designs, []);
export const writeDesigns = (designs: SavedDesign[]): void => safeWrite(KEYS.designs, designs);

export const readFavorites = (): string[] => safeRead<string[]>(KEYS.favorites, ["nano-pearl", "opal-particles"]);
export const writeFavorites = (ids: string[]): void => safeWrite(KEYS.favorites, ids);

export const readCompletedMissions = (): string[] => safeRead<string[]>(KEYS.missions, []);
export const writeCompletedMissions = (ids: string[]): void => safeWrite(KEYS.missions, ids);

export const readExperiments = (): SavedExperiment[] => safeRead<SavedExperiment[]>(KEYS.experiments, []);
export const writeExperiments = (exps: SavedExperiment[]): void => safeWrite(KEYS.experiments, exps);

export const setPendingStudioDesign = (design: SavedDesign | null): void => {
  if (!design) {
    if (typeof window !== "undefined") window.localStorage.removeItem(KEYS.activeEdit);
    return;
  }
  safeWrite(KEYS.activeEdit, design);
};

export const consumePendingStudioDesign = (): SavedDesign | null => {
  const found = safeRead<SavedDesign | null>(KEYS.activeEdit, null);
  if (found && typeof window !== "undefined") {
    window.localStorage.removeItem(KEYS.activeEdit);
  }
  return found;
};