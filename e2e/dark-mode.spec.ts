import { test, expect } from "@playwright/test";

test.describe("Dark mode", () => {
  test("toggling switches the theme and persists across reload", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");

    const toggle = page.getByRole("button", { name: /switch to dark mode|toggle color theme/i });
    await toggle.click();
    await expect(html).toHaveClass(/dark/);

    await page.reload();
    await expect(html).toHaveClass(/dark/);
  });
});
