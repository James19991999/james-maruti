"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // next-themes can't know the resolved theme (system preference) until after
  // hydration, so we render a neutral placeholder on the server/first paint to
  // avoid a light/dark icon mismatch flash.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle color theme"}
      className="text-on-surface-variant hover:text-primary transition-colors w-6 h-6 flex items-center justify-center"
    >
      <span className="material-symbols-outlined text-xl" aria-hidden="true">
        {mounted ? (isDark ? "light_mode" : "dark_mode") : "brightness_medium"}
      </span>
    </button>
  );
}
