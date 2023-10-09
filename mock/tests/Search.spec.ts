import { test, expect } from "@playwright/test";

test("call search without loading, brief mode", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: incorrect number of arguments given to load_file command"
  );
});
