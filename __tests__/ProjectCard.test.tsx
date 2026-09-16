import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectCard from "@/components/ProjectCard";

describe("ProjectCard", () => {
  afterEach(() => {
    Object.defineProperty(navigator, "share", { value: undefined, configurable: true });
    Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });
  });

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

  it("does not render a share button for coming-soon projects (nothing real to share yet)", () => {
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
    expect(screen.queryByRole("button", { name: /share/i })).not.toBeInTheDocument();
  });

  it("uses navigator.share when available", async () => {
    const shareMock = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", { value: shareMock, configurable: true });

    const user = userEvent.setup();
    render(
      <ProjectCard
        title="EduConnect"
        category="Education SaaS"
        description="School management portal."
        tags={["SaaS"]}
        href="https://edu-connect-prod-six.vercel.app"
        external
      />
    );

    await user.click(screen.getByRole("button", { name: /share educonnect/i }));

    await waitFor(() => {
      expect(shareMock).toHaveBeenCalledWith({
        title: "EduConnect",
        text: "School management portal.",
        url: "https://edu-connect-prod-six.vercel.app",
      });
    });
  });

  it("falls back to copying the link when navigator.share isn't available", async () => {
    // userEvent.setup() installs its own navigator.clipboard stub for its
    // copy/paste helpers — defining ours BEFORE calling setup() would get
    // silently overwritten, so setup() has to run first.
    const user = userEvent.setup();
    const writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      configurable: true,
    });

    render(
      <ProjectCard
        title="EduConnect"
        category="Education SaaS"
        description="School management portal."
        tags={["SaaS"]}
        href="https://edu-connect-prod-six.vercel.app"
        external
      />
    );

    await user.click(screen.getByRole("button", { name: /share educonnect/i }));

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith("https://edu-connect-prod-six.vercel.app");
    });
  });
});
