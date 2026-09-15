import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with hero content and primary nav", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  });

  test("nav links go to the right pages", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("footer links resolve (no dead /# links)", async ({ page }) => {
    await page.goto("/");
    const footerLinks = page.locator("footer a[href]");
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await footerLinks.nth(i).getAttribute("href");
      expect(href).not.toBe("#");
      expect(href).not.toBe("/#");
    }
  });

  test("404 page renders for an unknown route", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /doesn't exist/i })).toBeVisible();
  });
});
