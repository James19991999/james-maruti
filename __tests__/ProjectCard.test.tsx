import { render, screen } from "@testing-library/react";
import ProjectCard from "@/components/ProjectCard";

describe("ProjectCard", () => {
  it("renders project details and an internal link without target=_blank", () => {
    render(
      <ProjectCard
        title="PULSE"
        category="Fitness Tracker SaaS"
        description="Built with Next.js and Stripe."
        tags={["Web App", "SaaS"]}
        href="/pulse"
        external={false}
      />
    );

    expect(screen.getByRole("heading", { name: "PULSE" })).toBeInTheDocument();
    expect(screen.getByText("Fitness Tracker SaaS")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /view project/i });
    expect(link).toHaveAttribute("href", "/pulse");
    expect(link).not.toHaveAttribute("target");
  });

  it("opens external project links in a new tab safely", () => {
    render(
      <ProjectCard
        title="LocateSafe"
        category="Real-Time Tracking"
        description="School bus fleet tracking."
        tags={["SaaS"]}
        href="https://locatesafe-prody.vercel.app"
        external
      />
    );

    const link = screen.getByRole("link", { name: /view project/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a disabled Coming Soon button instead of a link for unreleased projects", () => {
    render(
      <ProjectCard
        title="PULSE"
        category="Fitness Tracker SaaS"
        description="Built with Next.js and Stripe."
        tags={["Web App"]}
        href=""
        external={false}
        comingSoon
      />
    );

    expect(screen.queryByRole("link", { name: /view project/i })).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /coming soon/i });
    expect(button).toBeDisabled();
  });
});
