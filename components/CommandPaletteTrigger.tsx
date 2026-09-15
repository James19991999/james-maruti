"use client";

import { useEffect, useState } from "react";
import { useOpenCommandPalette } from "./CommandPaletteContext";

export default function CommandPaletteTrigger() {
  const open = useOpenCommandPalette();
  // Avoid rendering a platform-specific shortcut hint before hydration, which
  // would otherwise briefly show the wrong modifier key on the server render.
  const [isMac, setIsMac] = useState<boolean | null>(null);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform ?? navigator.userAgent));
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open command palette (search pages, projects, and actions)"
      className="hidden md:flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/40 rounded-lg px-3 py-1.5"
    >
      <span className="material-symbols-outlined text-lg" aria-hidden="true">
        search
      </span>
      {isMac !== null && (
        <kbd className="font-label-mono text-[10px]">{isMac ? "⌘K" : "Ctrl K"}</kbd>
      )}
    </button>
  );
}
