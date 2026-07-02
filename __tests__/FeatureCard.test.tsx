import { render, screen } from "@testing-library/react";
import FeatureCard from "@/components/FeatureCard";

describe("FeatureCard", () => {
  it("renders title, description, and tags", () => {
    render(
      <FeatureCard
        icon="terminal"
        title="Scalable Systems"
        description="Enterprise-grade application architecture."
        tags={["React", "Next.js"]}
      />
    );

    expect(screen.getByRole("heading", { name: "Scalable Systems" })).toBeInTheDocument();
    expect(screen.getByText("Enterprise-grade application architecture.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("renders without tags when none are provided", () => {
    render(<FeatureCard icon="psychology" title="No Tags" description="Just a description." />);
    expect(screen.getByRole("heading", { name: "No Tags" })).toBeInTheDocument();
  });

  it("uses an h2 heading when headingLevel is set", () => {
    render(
      <FeatureCard
        icon="database"
        title="Heading Level Test"
        description="Description text."
        headingLevel="h2"
      />
    );
    const heading = screen.getByRole("heading", { name: "Heading Level Test" });
    expect(heading.tagName).toBe("H2");
  });
});
