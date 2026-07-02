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
        <p className="font-label-mono text-[11px] text-secondary uppercase tracking-widest mb-1">
          {category}
        </p>
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
