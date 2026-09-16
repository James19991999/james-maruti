import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsletterForm from "@/components/NewsletterForm";
import { submitNewsletter } from "@/app/actions/newsletter";

jest.mock("@/app/actions/newsletter", () => ({
  submitNewsletter: jest.fn(),
}));

const mockedSubmitNewsletter = submitNewsletter as jest.MockedFunction<typeof submitNewsletter>;

describe("NewsletterForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("submits an email and shows a success state", async () => {
    mockedSubmitNewsletter.mockResolvedValue({ ok: true });

    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText(/get occasional updates/i), "reader@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/you're subscribed/i)).toBeInTheDocument();
    });

    expect(mockedSubmitNewsletter).toHaveBeenCalledTimes(1);
    const submittedFormData = mockedSubmitNewsletter.mock.calls[0][0];
    expect(submittedFormData.get("email")).toBe("reader@example.com");
  });

  it("surfaces a server error message", async () => {
    mockedSubmitNewsletter.mockResolvedValue({
      ok: false,
      error: "Please provide a valid email address.",
    });

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
