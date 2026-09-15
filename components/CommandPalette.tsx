"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import { useCommandPalette } from "./CommandPaletteContext";
import { featuredProjects, siteConfig } from "@/lib/site-data";

const staticPages = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about", icon: "person" },
  { label: "Expertise", href: "/expertise", icon: "psychology" },
  { label: "Experience", href: "/experience", icon: "work_history" },
  { label: "Services", href: "/services", icon: "design_services" },
  { label: "FAQ", href: "/faq", icon: "help" },
  { label: "Contact", href: "/contact", icon: "mail" },
  { label: "Entity Schema", href: "/schema", icon: "data_object" },
];

export default function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  // cmdk handles Escape-to-close and focus trapping internally; this effect only
  // needs to lock body scroll while the dialog is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(href: string, external = false) {
    setOpen(false);
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
    >
      <div
        className="fixed inset-0 bg-on-background/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl bg-surface rounded-xl shadow-2xl border border-outline-variant/30 overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-outline-variant/20">
          <span className="material-symbols-outlined text-on-surface-variant" aria-hidden="true">
            search
          </span>
          <Command.Input
            placeholder="Search pages, projects, actions…"
            className="w-full py-4 bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant"
          />
          <kbd className="hidden sm:block font-label-mono text-[10px] text-on-surface-variant border border-outline-variant/40 rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-96 overflow-y-auto p-2">
          <Command.Empty className="py-8 text-center text-on-surface-variant text-sm">
            No results found.
          </Command.Empty>

          <Command.Group
            heading="Navigate"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-label-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-on-surface-variant"
          >
            {staticPages.map((page) => (
              <Command.Item
                key={page.href}
                onSelect={() => go(page.href)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-on-surface data-[selected=true]:bg-primary data-[selected=true]:text-on-primary"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  {page.icon}
                </span>
                {page.label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group
            heading="Projects"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-label-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-on-surface-variant"
          >
            {featuredProjects
              .filter((project) => !project.comingSoon && project.href)
              .map((project) => (
                <Command.Item
                  key={project.title}
                  onSelect={() => go(project.href, project.external)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-on-surface data-[selected=true]:bg-primary data-[selected=true]:text-on-primary"
                >
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">
                    {project.external ? "open_in_new" : "arrow_forward"}
                  </span>
                  {project.title}
                </Command.Item>
              ))}
          </Command.Group>

          <Command.Group
            heading="Actions"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-label-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-on-surface-variant"
          >
            <Command.Item
              onSelect={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
                setOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-on-surface data-[selected=true]:bg-primary data-[selected=true]:text-on-primary"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                {resolvedTheme === "dark" ? "light_mode" : "dark_mode"}
              </span>
              Toggle {resolvedTheme === "dark" ? "light" : "dark"} mode
            </Command.Item>
            <Command.Item
              onSelect={() => go(siteConfig.cvUrl)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-on-surface data-[selected=true]:bg-primary data-[selected=true]:text-on-primary"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                download
              </span>
              Download CV
            </Command.Item>
            <Command.Item
              onSelect={() => go(siteConfig.github, true)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-on-surface data-[selected=true]:bg-primary data-[selected=true]:text-on-primary"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                open_in_new
              </span>
              View GitHub Profile
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
