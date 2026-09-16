// jest.setup.ts globally mocks this module (see comment there) so that
// rendering Footer/ContactForm elsewhere in the suite doesn't pull in
// firebase-admin's ESM-incompatible dependency chain. This file is the
// exception — it exists specifically to test the real implementation.
jest.unmock("@/app/actions/contact");

jest.mock("next/headers", () => ({
  headers: jest.fn().mockResolvedValue({ get: () => null }),
}));

function makeFormData(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    data.set(key, value);
  }
  return data;
}

describe("submitContact", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns a clean error instead of throwing when a dependency fails to load", async () => {
    // Simulates exactly the failure mode this refactor exists to catch: not a
    // function that throws when called, but a module that fails at import
    // time (e.g. firebase-admin's dependency chain breaking in production).
    // The factory itself throwing is how Jest simulates a load failure.
    jest.doMock("@/lib/firebase-admin", () => {
      throw new Error("Simulated module load failure");
    });

    const { submitContact } = await import("@/app/actions/contact");
    const result = await submitContact(
      makeFormData({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "This is a long enough test message.",
      })
    );

    expect(result.ok).toBe(false);
    expect(result.error).toBe("Something went wrong on our end. Please try again shortly.");
  });

  it("still validates fields before attempting anything Firebase-related", async () => {
    const { submitContact } = await import("@/app/actions/contact");

    const result = await submitContact(makeFormData({ name: "J", email: "not-an-email", message: "short" }));
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Please provide your name.");
  });

  it("treats a filled honeypot field as success without touching Firebase", async () => {
    const adminDbSpy = jest.fn();
    jest.doMock("@/lib/firebase-admin", () => ({ getAdminDb: adminDbSpy }));

    const { submitContact } = await import("@/app/actions/contact");
    const result = await submitContact(
      makeFormData({
        name: "Bot",
        email: "bot@example.com",
        message: "This is a long enough test message.",
        website: "http://spam.example",
      })
    );

    expect(result.ok).toBe(true);
    expect(adminDbSpy).not.toHaveBeenCalled();
  });
});
