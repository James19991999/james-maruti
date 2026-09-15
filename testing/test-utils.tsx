import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { CommandPaletteContextProvider } from "@/components/CommandPaletteContext";

/**
 * Wraps ui in the app-level providers it needs to render without throwing —
 * currently just CommandPaletteContextProvider, since CommandPaletteTrigger
 * (used inside TopNavBar and Sidebar) calls useCommandPalette(), which requires
 * this context to exist. Add further providers here if new global context gets
 * introduced (theme, auth, etc.) rather than duplicating wrapper JSX per test file.
 */
export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(<CommandPaletteContextProvider>{ui}</CommandPaletteContextProvider>, options);
}

export * from "@testing-library/react";
