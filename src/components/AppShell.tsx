import { Link, useRouterState } from "@tanstack/react-router";
import { FlaskConical, Menu, Sparkles, Sun, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { readTheme, writeTheme, type ThemeMode } from "@/lib/storage";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/studio", label: "Nano Studio" },
  { to: "/ingredients", label: "Ingredients" },
  { to: "/microscope", label: "Microscope" },
  { to: "/mixing-lab", label: "Mixing Lab" },
  { to: "/photonics", label: "Photonics" },
  { to: "/quantum-lab", label: "Quantum Lab" },
  { to: "/women-in-science", label: "Women in Science" },
  { to: "/glossary", label: "Glossary" },
  { to: "/lookbook", label: "Lookbook" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [theme, setTheme] = useState<ThemeMode>("cozy");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = readTheme();
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "lab");
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const next: ThemeMode = theme === "cozy" ? "lab" : "cozy";
    setTheme(next);
    writeTheme(next);
    document.documentElement.classList.toggle("dark", next === "lab");
  };

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <header className="glass-panel sticky top-0 z-40 border-b border-border/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <span className="iridescent-gradient flex h-8 w-8 items-center justify-center rounded-full shadow-sm">
              <Sparkles className="h-4 w-4 text-plum" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-editorial text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Nails at the Nanoscale
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                Beauty × Photonics Lab
              </span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-full px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "cozy" ? "Laboratory" : "Cozy"} mode`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-xs transition-colors hover:bg-secondary"
            >
              {theme === "cozy" ? (
                <>
                  <FlaskConical className="h-3.5 w-3.5 text-primary" />
                  <span className="hidden sm:inline">Lab Mode</span>
                </>
              ) : (
                <>
                  <Sun className="h-3.5 w-3.5 text-aqua" />
                  <span className="hidden sm:inline">Cozy Mode</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-foreground xl:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-border/70 bg-card/95 px-4 py-4 backdrop-blur-xl xl:hidden"
          >
            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-3">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/60 text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 border-t border-border/70 bg-card/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-editorial text-2xl font-semibold text-foreground">Nails at the Nanoscale</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                An imaginative beauty-science laboratory exploring nail design, photonics, thin-film optics, and
                nanoscale materials through interactive visual storytelling.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 md:col-span-7">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <p>
              Educational simulation disclaimer: All nanoscale values, coatings, material mixes, microscope views, and
              quantum visualizations are illustrative mock simulations and not verified laboratory data or cosmetic
              formulations.
            </p>
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider">
              {theme === "cozy" ? "Cozy Mode" : "Laboratory Mode"}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}