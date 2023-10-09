import { test, expect } from "@playwright/test";

test("call load_file with no arguments, brief mode", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  //await expect(page.getByLabel("commandString0")).toHaveText("load_file");
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: incorrect number of arguments given to load_file command"
  );
});

test("call load_file with no arguments, verbose mode", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText("load_file");
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: incorrect number of arguments given to load_file command"
  );
});

test("call load_file with non-accessible file, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file outside-of-data-directory.csv");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  //await expect(page.getByLabel("commandString0")).toHaveText("load_file");
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: filepath outside-of-data-directory.csv located in an unaccessible directory."
  );
});
