import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsletterForm from "@/components/NewsletterForm";

describe("NewsletterForm", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("submits an email and shows a success state", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    }) as unknown as typeof fetch;

    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText(/get occasional updates/i), "reader@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/you're subscribed/i)).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/newsletter",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("surfaces a server error message", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Please provide a valid email address." }),
    }) as unknown as typeof fetch;

    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText(/get occasional updates/i), "reader@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(
      await screen.findByText(/please provide a valid email address/i)
    ).toBeInTheDocument();
  });

  it("includes a hidden honeypot field that real users won't see", () => {
    render(<NewsletterForm />);
    const honeypot = screen.getByLabelText("Website") as HTMLInputElement;
    expect(honeypot.tabIndex).toBe(-1);
    expect(honeypot.autocomplete).toBe("off");
  });
});
