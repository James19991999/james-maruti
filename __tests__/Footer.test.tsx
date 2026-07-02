import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders the brand name and current year copyright", () => {
    render(<Footer />);
    expect(screen.getByText("James Maruti")).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()} James Maruti`))
    ).toBeInTheDocument();
  });

  it("renders social and legal navigation links", () => {
    render(<Footer />);
    expect(screen.getByRole("navigation", { name: "Social" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Legal" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy"
    );
    expect(screen.getByRole("link", { name: "Terms of Service" })).toHaveAttribute(
      "href",
      "/terms-of-service"
    );
    expect(screen.getByRole("link", { name: "Entity Schema" })).toHaveAttribute(
      "href",
      "/schema"
    );
  });

  it("includes a newsletter signup form", () => {
    render(<Footer />);
    expect(screen.getByLabelText(/get occasional updates/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });
});
