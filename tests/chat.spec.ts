import { test, expect } from "@playwright/test";

test("AI chat page loads and accepts a message", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(
    page.getByRole("heading", { name: "AI Tool Chat" })
  ).toBeVisible();

  const input = page.getByPlaceholder("Ask something...");

  await expect(input).toBeVisible();

  await input.fill("hi");

  await page.getByRole("button", { name: "Send" }).click();

  await expect(page.getByText("You").first()).toBeVisible();
});
