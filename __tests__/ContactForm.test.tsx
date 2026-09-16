import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";
import { submitContact } from "@/app/actions/contact";

jest.mock("@/app/actions/contact", () => ({
  submitContact: jest.fn(),
}));

const mockedSubmitContact = submitContact as jest.MockedFunction<typeof submitContact>;

describe("ContactForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows a validation error when required fields are missing", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(
      await screen.findByText(/please fill in your name, email, and project brief/i)
    ).toBeInTheDocument();
    // Client-side validation should short-circuit before the action is ever called.
    expect(mockedSubmitContact).not.toHaveBeenCalled();
  });

  it("submits the form and shows a success state on a valid response", async () => {
    mockedSubmitContact.mockResolvedValue({ ok: true });

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/project brief/i), "I need a scalable Next.js build.");
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/inquiry sent/i)).toBeInTheDocument();
    });

    expect(mockedSubmitContact).toHaveBeenCalledTimes(1);
    const submittedFormData = mockedSubmitContact.mock.calls[0][0];
    expect(submittedFormData.get("name")).toBe("Jane Doe");
    expect(submittedFormData.get("email")).toBe("jane@example.com");
  });

  it("surfaces a server error message", async () => {
    mockedSubmitContact.mockResolvedValue({
      ok: false,
      error: "Please provide a valid email address.",
    });

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
