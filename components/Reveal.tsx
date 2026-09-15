"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger multiple Reveal siblings by passing increasing values (in ms). */
  delayMs?: number;
  className?: string;
}

/**
 * Fades and slides content in the first time it scrolls into view. Pure CSS
 * transition driven by a `data-reveal` attribute — see globals.css. Under
 * `prefers-reduced-motion`, that same stylesheet makes content appear instantly
 * with no transform, so this never delays or hides content for anyone who's
 * asked their OS to minimize motion.
 */
export default function Reveal({ children, delayMs = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={visible ? "visible" : "hidden"}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
