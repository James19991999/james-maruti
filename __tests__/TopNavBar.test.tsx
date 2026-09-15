import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/testing/test-utils";
import TopNavBar from "@/components/TopNavBar";

describe("TopNavBar", () => {
  it("renders the brand link and primary nav items", () => {
    renderWithProviders(<TopNavBar />);
    expect(screen.getByRole("link", { name: "James Maruti" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Expertise" })[0]).toHaveAttribute(
      "href",
      "/expertise"
    );
  });

  it("renders a call-to-action link to the contact page", () => {
    renderWithProviders(<TopNavBar />);
    const ctaLinks = screen.getAllByRole("link", { name: "Let's Build" });
    expect(ctaLinks.length).toBeGreaterThan(0);
    ctaLinks.forEach((link) => expect(link).toHaveAttribute("href", "/contact"));
  });

  it("renders a command palette trigger", () => {
    renderWithProviders(<TopNavBar />);
    expect(
      screen.getByRole("button", { name: /open command palette/i })
    ).toBeInTheDocument();
  });
});
