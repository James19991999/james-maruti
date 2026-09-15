interface LogoProps {
  /** Pixel size of the square mark. Defaults to a size that reads well inline in a nav bar. */
  size?: number;
  className?: string;
}

/**
 * The brand mark — same design as app/icon.svg (the site favicon) — kept as a
 * fixed navy/cream combination rather than adapting to light/dark theme.
 * Logo marks are usually a fixed brand color regardless of surrounding UI
 * (think Nike's swoosh, Apple's logo), not something that inverts with the
 * page — that consistency is part of what makes it read as a mark rather
 * than just more themed text.
 */
export default function Logo({ size = 36, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#00113A" />
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fontFamily="Georgia, 'Libre Caslon Text', serif"
        fontSize="28"
        fontWeight="700"
        fill="#FCF9F8"
      >
        JM
      </text>
    </svg>
  );
}
