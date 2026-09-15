import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "@/components/Accordion";

const items = [
  { question: "What services do you offer?", answer: "Design and engineering." },
  { question: "Where are you based?", answer: "Nairobi, Kenya." },
];

describe("Accordion", () => {
  it("opens the first item by default", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("Design and engineering.")).toBeVisible();
  });

  it("toggles a panel open and closed on click", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const secondButton = screen.getByRole("button", { name: /where are you based/i });
    expect(secondButton).toHaveAttribute("aria-expanded", "false");

    await user.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Nairobi, Kenya.")).toBeVisible();

    await user.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
  });
});
