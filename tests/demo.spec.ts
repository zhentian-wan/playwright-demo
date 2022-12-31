import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("App", () => {
  test("Log is visible", async ({ page }) => {
    const logo = page.locator("img[alt=logo]");
    await expect(logo).toBeVisible();
  });

  test("Link should be valid", async ({ page }) => {
    const Link = page.locator("a", { hasText: "Learn React" });
    await expect(Link).toBeVisible();
    await expect(Link).toHaveAttribute("href", "https://reactjs.org");
  });

  // Visual screen comparsion
  test("Page screenshot", async ({ page }) => {
    expect(await page.screenshot()).toMatchSnapshot("button-base.png", {
      threshold: 0.2,
    });
  });

  test("should failed", async ({ page }) => {
    //create a todo
    await page.locator(".new-todo").fill("buy some cheese");
    await page.locator(".new-todo").press("Enter");

    // Make sure the list has the todo item
    await expect(page.locator(".view label")).toHaveText([
      "buy some cheeze", // typo here
    ]);
  });
});
