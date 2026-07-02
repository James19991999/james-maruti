import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

describe("ContactForm", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("shows a validation error when required fields are missing", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(
      await screen.findByText(/please fill in your name, email, and project brief/i)
    ).toBeInTheDocument();
  });

  it("submits the form and shows a success state on a valid response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    }) as unknown as typeof fetch;

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/project brief/i), "I need a scalable Next.js build.");
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/inquiry sent/i)).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("surfaces a server error message", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Please provide a valid email address." }),
    }) as unknown as typeof fetch;

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/project brief/i), "I need a scalable Next.js build.");
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(
      await screen.findByText(/please provide a valid email address/i)
    ).toBeInTheDocument();
  });
});
