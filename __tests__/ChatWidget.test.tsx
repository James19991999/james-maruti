import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatWidget from "@/components/ChatWidget";

describe("ChatWidget", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("is closed by default and opens on click", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /open chat/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows a greeting message once opened", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);
    await user.click(screen.getByRole("button", { name: /open chat/i }));
    expect(screen.getByText(/i can answer questions about/i)).toBeInTheDocument();
  });

  it("sends a message and displays the assistant's reply", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: "James specializes in Next.js and UI/UX." }),
    }) as unknown as typeof fetch;

    const user = userEvent.setup();
    render(<ChatWidget />);
    await user.click(screen.getByRole("button", { name: /open chat/i }));

    await user.type(screen.getByRole("textbox"), "What does he specialize in?");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/james specializes in next\.js/i)).toBeInTheDocument();
    });

    const [, requestInit] = (global.fetch as jest.Mock).mock.calls[0];
    const sentBody = JSON.parse(requestInit.body);
    // The decorative greeting should never be sent to the API as conversation history.
    expect(sentBody.messages).toEqual([
      { role: "user", content: "What does he specialize in?" },
    ]);
  });

  it("surfaces a graceful error when the assistant isn't configured", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "The chat assistant isn't configured yet. Try the contact form instead.",
      }),
    }) as unknown as typeof fetch;

    const user = userEvent.setup();
    render(<ChatWidget />);
    await user.click(screen.getByRole("button", { name: /open chat/i }));

    await user.type(screen.getByRole("textbox"), "Hello");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/try the contact form instead/i)).toBeInTheDocument();
  });
});
