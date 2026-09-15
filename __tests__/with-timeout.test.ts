import { withTimeout } from "@/lib/with-timeout";

describe("withTimeout", () => {
  it("resolves normally when the promise finishes before the timeout", async () => {
    const result = await withTimeout(Promise.resolve("done"), 1000, "test");
    expect(result).toBe("done");
  });

  it("rejects with a clear message when the promise hangs past the timeout", async () => {
    const neverResolves = new Promise(() => {});
    await expect(withTimeout(neverResolves, 50, "Slow call")).rejects.toThrow(
      "Slow call timed out after 50ms"
    );
  });

  it("propagates the original rejection when the promise fails before the timeout", async () => {
    await expect(
      withTimeout(Promise.reject(new Error("boom")), 1000, "test")
    ).rejects.toThrow("boom");
  });
});
