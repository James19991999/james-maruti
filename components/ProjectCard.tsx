"use client";

import { useState } from "react";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  external: boolean;
  /** Matches the source design: unreleased projects render a disabled, locked button instead of a link. */
  comingSoon?: boolean;
}

export default function ProjectCard({
  title,
  category,
  description,
  tags,
  href,
  external,
  comingSoon = false,
}: ProjectCardProps) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareUrl = href.startsWith("http")
      ? href
      : `${window.location.origin}${href}`;

    // navigator.share isn't available on most desktop browsers — falls back
    // to copying the link, which covers the same underlying need ("give this
    // to someone else") without a broken or silently-missing button.
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: shareUrl });
      } catch {
        // User cancelled the share sheet — not an error, nothing to do.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied/unavailable — fail silently rather than show
      // an alarming error for what is a minor convenience feature.
    }
  }

  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 hover-lift flex flex-col">
      <div
        className="aspect-video bg-surface-container-highest flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="material-symbols-outlined text-primary opacity-20 text-display-lg">
          image
        </span>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-label-mono text-[11px] text-secondary uppercase tracking-widest">
            {category}
          </p>
          {!comingSoon && (
            <button
              type="button"
              onClick={handleShare}
              aria-label={`Share ${title}`}
              title={copied ? "Link copied!" : "Share"}
              className="shrink-0 text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                {copied ? "check" : "share"}
              </span>
            </button>
          )}
        </div>
        <h3 className="font-headline-md text-2xl text-primary mb-3">{title}</h3>
        <p className="text-on-surface-variant mb-6 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/5 text-primary px-3 py-1 rounded font-label-mono text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>
        {comingSoon ? (
          <button
            type="button"
            disabled
            title="This project isn't public yet"
            className="inline-flex items-center gap-2 text-secondary font-label-mono text-label-mono opacity-50 cursor-not-allowed w-fit"
          >
            Coming Soon{" "}
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              lock
            </span>
          </button>
        ) : (
          <Link
            href={href}
            {...linkProps}
            className="inline-flex items-center gap-2 text-secondary font-label-mono text-label-mono hover:gap-4 transition-all"
          >
            View Project{" "}
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
