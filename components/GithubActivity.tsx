import { getGithubContributions, type ContributionData } from "@/lib/github";
import { siteConfig } from "@/lib/site-data";

/** Tailwind-safe static classes (dynamic template strings don't survive Tailwind's build-time scan). */
function intensityClass(count: number): string {
  if (count === 0) return "bg-surface-container-high";
  if (count <= 2) return "bg-secondary-fixed-dim/60";
  if (count <= 5) return "bg-secondary/70";
  if (count <= 9) return "bg-secondary";
  return "bg-primary";
}

/** Fetches contribution data, or null if GITHUB_TOKEN isn't configured / the request fails. */
export async function fetchGithubActivity(): Promise<ContributionData | null> {
  const login = siteConfig.github.replace(/\/$/, "").split("/").pop() ?? "";
  return getGithubContributions(login);
}

export default function GithubActivity({ data }: { data: ContributionData }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="font-label-mono text-[11px] text-secondary uppercase tracking-widest">
          {data.totalContributions.toLocaleString()} contributions in the last year
        </p>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label-mono text-[11px] text-on-surface-variant hover:text-primary transition-colors"
        >
          View on GitHub →
        </a>
      </div>
      <div className="flex gap-[3px] overflow-x-auto pb-2" role="img" aria-label={`GitHub contribution graph: ${data.totalContributions} contributions in the last year`}>
        {data.weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                className={`w-[10px] h-[10px] rounded-sm ${intensityClass(day.count)}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
