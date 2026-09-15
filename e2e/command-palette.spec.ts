import { test, expect } from "@playwright/test";

test.describe("Command palette", () => {
  test("opens via the trigger button and navigates to a page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open command palette/i }).click();

    const dialog = page.getByRole("dialog", { name: "Command palette" });
    await expect(dialog).toBeVisible();

    await page.getByPlaceholder(/search pages, projects, actions/i).fill("FAQ");
    await page.getByText("FAQ", { exact: true }).click();

    await expect(page).toHaveURL(/\/faq$/);
  });

  test("opens via keyboard shortcut and closes on Escape", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("ControlOrMeta+k");

    const dialog = page.getByRole("dialog", { name: "Command palette" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });
});
