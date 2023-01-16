import { test, expect } from "@playwright/test";

test.describe("react-standard", () => {
  test("Loads page with welcome", async ({ page }) => {
    await page.goto("/");

    expect(await page.waitForSelector("text=React App")).toBeTruthy();
  });
});
