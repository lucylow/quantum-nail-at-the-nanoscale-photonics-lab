import type { NailConfig, NailShape, NanoIngredient } from "@/data/nanoData";
import { NAIL_COLORS } from "@/data/nanoData";

export function getColorById(id: string) {
  return NAIL_COLORS.find((c) => c.id === id) ?? NAIL_COLORS[0]!;
}

/** Returns an SVG path for a single nail in a 60x110 local box, tip at top. */
export function getNailPath(shape: NailShape, lengthPct: number): string {
  const ext = 24 + (lengthPct / 100) * 34; // tip height upwards
  const topY = 82 - ext;
  switch (shape) {
    case "round":
      return `M12,92 L12,${topY + 18} C12,${topY} 48,${topY} 48,${topY + 18} L48,92 C48,104 12,104 12,92 Z`;
    case "oval":
      return `M12,92 C11,${topY + 28} 15,${topY} 30,${topY} C45,${topY} 49,${topY + 28} 48,92 C48,104 12,104 12,92 Z`;
    case "square":
      return `M12,92 L12,${topY + 4} Q12,${topY} 16,${topY} L44,${topY} Q48,${topY} 48,${topY + 4} L48,92 C48,104 12,104 12,92 Z`;
    case "squoval":
      return `M12,92 L12,${topY + 10} Q12,${topY} 22,${topY} L38,${topY} Q48,${topY} 48,${topY + 10} L48,92 C48,104 12,104 12,92 Z`;
    case "almond":
      return `M12,92 C12,${topY + 34} 20,${topY + 8} 30,${topY} C40,${topY + 8} 48,${topY + 34} 48,92 C48,104 12,104 12,92 Z`;
    case "coffin":
      return `M12,92 L14,${topY + 24} L21,${topY} L39,${topY} L46,${topY + 24} L48,92 C48,104 12,104 12,92 Z`;
    case "stiletto":
      return `M12,92 C12,${topY + 38} 24,${topY + 12} 30,${topY - 4} C36,${topY + 12} 48,${topY + 38} 48,92 C48,104 12,104 12,92 Z`;
  }
}

export function SingleNailSvg({
  config,
  shape,
  length,
  uid,
  selected = false,
  showCoating = true,
  className = "h-28 w-16",
}: {
  config: NailConfig;
  shape: NailShape;
  length: number;
  uid: string;
  selected?: boolean;
  showCoating?: boolean;
  className?: string;
}) {
  const color = getColorById(config.colorId);
  const path = getNailPath(shape, length);
  const coatOpacity = showCoating && config.coating !== "none" ? 0.22 + (config.coatingThickness / 500) * 0.45 : 0;
  const dotRadius = 0.8 + (config.particleSize / 200) * 1.9;

  return (
    <svg viewBox="0 0 60 112" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`clip-${uid}`}>
          <path d={path} />
        </clipPath>
        <linearGradient id={`base-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.secondaryHex} />
          <stop offset="55%" stopColor={color.hex} />
          <stop offset="100%" stopColor={color.hex} stopOpacity={config.finish === "translucent" ? 0.62 : 1} />
        </linearGradient>
        <linearGradient id={`holo-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5B8D0" stopOpacity="0.85" />
          <stop offset="32%" stopColor="#C8B3EA" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#7BE5EC" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#FCE7B2" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`chrome-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="28%" stopColor={color.hex} stopOpacity="0.2" />
          <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.78" />
          <stop offset="78%" stopColor="#2A1C3E" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id={`aurora-${uid}`} cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#86F2F0" stopOpacity="0.78" />
          <stop offset="52%" stopColor="#C996F5" stopOpacity="0.48" />
          <stop offset="100%" stopColor="#F59CC2" stopOpacity="0.15" />
        </radialGradient>
      </defs>

      <path
        d={path}
        fill={`url(#base-${uid})`}
        fillOpacity={config.finish === "translucent" ? 0.72 : 1}
        stroke={selected ? "var(--primary)" : "rgba(62,38,94,0.22)"}
        strokeWidth={selected ? 2.6 : 1.1}
      />

      <g clipPath={`url(#clip-${uid})`}>
        {config.finish === "pearlescent" && (
          <ellipse cx="26" cy="48" rx="18" ry="38" fill="#FFFFFF" fillOpacity="0.34" />
        )}
        {config.finish === "chrome" && <rect x="0" y="0" width="60" height="112" fill={`url(#chrome-${uid})`} />}
        {config.finish === "holographic" && (
          <rect x="0" y="0" width="60" height="112" fill={`url(#holo-${uid})`} fillOpacity="0.62" />
        )}
        {config.finish === "aurora" && <rect x="0" y="0" width="60" height="112" fill={`url(#aurora-${uid})`} />}
        {config.finish === "glitter" && (
          <g fill="#FFFFFF" fillOpacity="0.88">
            {[
              [22, 34, 1.8], [36, 42, 1.4], [27, 56, 2], [40, 68, 1.5], [19, 74, 1.6], [33, 84, 1.3], [29, 25, 1.4],
            ].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} />
            ))}
          </g>
        )}
        {config.finish !== "matte" && (
          <path d="M19,86 C18,62 21,36 27,22 C24,42 23,66 25,88 Z" fill="#FFFFFF" fillOpacity="0.52" />
        )}
        {config.finish === "matte" && (
          <rect x="0" y="0" width="60" height="112" fill="#FFFFFF" fillOpacity="0.12" />
        )}

        {coatOpacity > 0 && (
          <g opacity={coatOpacity}>
            <rect
              x="0"
              y="0"
              width="60"
              height="112"
              fill={
                config.coating === "holographic-prism"
                  ? `url(#holo-${uid})`
                  : config.coating === "liquid-chrome"
                    ? `url(#chrome-${uid})`
                    : `url(#aurora-${uid})`
              }
            />
            {config.particleSize > 25 && (
              <g fill="#FFFFFF" fillOpacity="0.72">
                {[
                  [20, 38], [38, 46], [28, 62], [41, 76], [23, 82], [32, 30],
                ].map(([cx, cy], idx) => (
                  <circle key={idx} cx={cx} cy={cy} r={dotRadius} />
                ))}
              </g>
            )}
          </g>
        )}
      </g>
    </svg>
  );
}

export function MaterialArtSvg({ item, className = "h-36 w-full" }: { item: NanoIngredient; className?: string }) {
  const [c1, c2, c3] = item.colors;
  const gid = `mat-${item.id}`;
  return (
    <svg viewBox="0 0 240 140" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="55%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
      </defs>
      <rect width="240" height="140" rx="14" fill={`url(#${gid})`} fillOpacity="0.28" />
      {item.pattern === "spheres" &&
        Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={i}
            cx={36 + (i % 4) * 56 + (Math.floor(i / 4) % 2) * 18}
            cy={32 + Math.floor(i / 4) * 38}
            r={16}
            fill={`url(#${gid})`}
            fillOpacity="0.82"
            stroke="#FFFFFF"
            strokeOpacity="0.65"
          />
        ))}
      {item.pattern === "layers" &&
        [0, 1, 2, 3, 4].map((row) => (
          <path
            key={row}
            d={`M-10,${24 + row * 22} Q60,${10 + row * 22} 120,${26 + row * 22} T250,${24 + row * 22}`}
            fill="none"
            stroke={row % 2 === 0 ? c2 : c3}
            strokeWidth="10"
            strokeOpacity="0.72"
          />
        ))}
      {item.pattern === "hex" &&
        [0, 1, 2, 3, 4, 5].map((i) => {
          const cx = 46 + (i % 3) * 72 + (i > 2 ? 26 : 0);
          const cy = i > 2 ? 92 : 48;
          return (
            <polygon
              key={i}
              points={`${cx},${cy - 22} ${cx + 19},${cy - 11} ${cx + 19},${cy + 11} ${cx},${cy + 22} ${cx - 19},${cy + 11} ${cx - 19},${cy - 11}`}
              fill={`url(#${gid})`}
              fillOpacity="0.45"
              stroke={c3}
              strokeWidth="1.8"
            />
          );
        })}
      {item.pattern === "flakes" &&
        [
          "30,30 78,20 92,58 44,64",
          "104,18 166,34 150,74 96,54",
          "168,52 218,34 226,96 172,102",
          "52,78 118,74 132,120 62,122",
        ].map((pts, idx) => (
          <polygon key={idx} points={pts} fill={`url(#${gid})`} fillOpacity="0.78" stroke="#FFFFFF" strokeOpacity="0.7" />
        ))}
      {item.pattern === "wave" &&
        [0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M0,${32 + i * 24} C60,${8 + i * 20} 120,${58 + i * 20} 240,${28 + i * 22}`}
            fill="none"
            stroke={i % 2 === 0 ? c1 : c3}
            strokeWidth="4"
            strokeOpacity="0.88"
          />
        ))}
      {item.pattern === "dots" &&
        [
          [48, 44, 10], [96, 36, 16], [148, 52, 22], [198, 72, 26], [76, 98, 13], [134, 106, 18],
        ].map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r! + 6} fill={c1} fillOpacity="0.22" />
            <circle cx={cx} cy={cy} r={r} fill={`url(#${gid})`} stroke="#FFFFFF" strokeOpacity="0.7" />
          </g>
        ))}
    </svg>
  );
}