type Accent = "primary" | "secondary" | "tertiary";

const accentIconBg: Record<Accent, string> = {
  primary: "bg-primary/5",
  secondary: "bg-secondary/5",
  tertiary: "bg-tertiary-container/5",
};

const accentIconColor: Record<Accent, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-on-tertiary-container",
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  tags?: string[];
  accent?: Accent;
  headingLevel?: "h2" | "h3";
}

export default function FeatureCard({
  icon,
  title,
  description,
  tags = [],
  accent = "primary",
  headingLevel = "h3",
}: FeatureCardProps) {
  const Heading = headingLevel;

  return (
    <div className="bg-surface p-8 rounded-xl border border-outline-variant/30 hover-lift">
      <div
        className={`w-12 h-12 ${accentIconBg[accent]} rounded-lg flex items-center justify-center mb-6`}
      >
        <span className={`material-symbols-outlined ${accentIconColor[accent]}`} aria-hidden="true">
          {icon}
        </span>
      </div>
      <Heading className="font-headline-md text-2xl text-primary mb-4">{title}</Heading>
      <p className="text-on-surface-variant mb-6">{description}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-surface-container-high px-3 py-1 rounded font-label-mono text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
