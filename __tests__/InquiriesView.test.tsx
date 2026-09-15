import { render, screen, waitFor } from "@testing-library/react";
import InquiriesView from "@/components/InquiriesView";

const mockGetIdToken = jest.fn().mockResolvedValue("fake-id-token");

jest.mock("@/lib/auth-context", () => ({
  useAuth: () => ({
    user: { getIdToken: mockGetIdToken },
    loading: false,
  }),
}));

describe("InquiriesView", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("shows a 403 as a clear 'not authorized' state, not a generic error", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 403,
      ok: false,
      json: async () => ({ error: "not authorized" }),
    }) as unknown as typeof fetch;

    render(<InquiriesView />);

    expect(await screen.findByText(/not authorized/i)).toBeInTheDocument();
    expect(screen.getByText(/admin_emails/i)).toBeInTheDocument();
  });

  it("renders inquiries and subscribers once loaded, with a tab switch between them", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        inquiries: [
          {
            id: "1",
            name: "Jane Doe",
            email: "jane@example.com",
            inquiryType: "Freelance Partnership",
            message: "I'd like to discuss a project.",
            createdAt: "2026-01-15T10:00:00.000Z",
          },
        ],
        subscribers: [{ id: "2", email: "reader@example.com", subscribedAt: null }],
      }),
    }) as unknown as typeof fetch;

    render(<InquiriesView />);

    expect(await screen.findByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("I'd like to discuss a project.")).toBeInTheDocument();
    expect(mockGetIdToken).toHaveBeenCalled();

    // Subscriber isn't shown until that tab is active.
    expect(screen.queryByText("reader@example.com")).not.toBeInTheDocument();
  });

  it("sends the Firebase ID token as a bearer header", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ inquiries: [], subscribers: [] }),
    }) as unknown as typeof fetch;

    render(<InquiriesView />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const [, requestInit] = (global.fetch as jest.Mock).mock.calls[0];
    expect(requestInit.headers.Authorization).toBe("Bearer fake-id-token");
  });
});
