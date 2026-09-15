import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("shows a validation error when submitted empty", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /send inquiry/i }).click();
    await expect(page.getByText(/please fill in your name, email/i)).toBeVisible();
  });

  test("honeypot field is present but not visible to a real user", async ({ page }) => {
    await page.goto("/contact");
    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toHaveCount(1);
    await expect(honeypot).not.toBeVisible();
  });
});
