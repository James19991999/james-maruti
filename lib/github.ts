export interface ContributionDay {
  date: string;
  count: number;
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionDay[][];
}

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

/**
 * Returns the last ~12 months of public GitHub contribution activity, or null if
 * GITHUB_TOKEN isn't configured or the request fails for any reason. Callers
 * should treat null as "don't render this," not as an error to surface —
 * this is a decorative enhancement, not something that should ever break a page.
 *
 * Requires a GitHub Personal Access Token with no special scopes (contribution
 * data for a public profile doesn't need repo access) — a "fine-grained" token
 * with no permissions checked, or a classic token with no scopes selected, both
 * work for this.
 */
export async function getGithubContributions(login: string): Promise<ContributionData | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      // Contribution data doesn't need to be fresher than hourly for a portfolio widget.
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const json = await response.json();
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    const weeks: ContributionDay[][] = calendar.weeks.map(
      (week: { contributionDays: { date: string; contributionCount: number }[] }) =>
        week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount }))
    );

    return { totalContributions: calendar.totalContributions, weeks };
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return null;
  }
}
