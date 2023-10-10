import { test, expect } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

/**
 * test attempting to view without loading first in brief mode
 */
test("view only (without load), brief mode", async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("view");
    await page.getByRole("button", { name: "Submitted 0 times" }).click();
    await expect(page.getByLabel("commandMessage0")).toHaveText(
      "Error: CSV file could not be viewed. Load correct filepath first."
    );
  });

  /**
   * test attempting to view without loading first in verbose mode 
   */
test("mode then view (without load), verbose mode", async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("mode");
    await page.getByRole("button", { name: "Submitted 0 times" }).click();
    await expect(page.getByLabel("commandString0")).toHaveText("mode");
    await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("view");
    await page.getByRole("button", { name: "Submitted 1 times" }).click();
    await expect(page.getByLabel("commandString1")).toHaveText("view");
    await expect(page.getByLabel("commandMessage1")).toHaveText(
      "Error: CSV file could not be viewed. Load correct filepath first."
    );
  });

  /**
   * Nice test where everything goes smoothly, load loads a valid file
   */
  test("mode, load, and view success, verbose mode", async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("mode");
    await page.getByRole("button", { name: "Submitted 0 times" }).click();
    await expect(page.getByLabel("commandString0")).toHaveText("mode");
    await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_file data/filepath1");
    await page.getByRole("button", { name: "Submitted 1 times" }).click();
    await expect(page.getByLabel("commandString1")).toHaveText("load_file data/filepath1");
    await expect(page.getByLabel("commandMessage1")).toHaveText(
      "Load success!"
    );

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("view");
    await page.getByRole("button", { name: "Submitted 2 times" }).click();
    await expect(page.getByLabel("commandString2")).toHaveText("view");
    await expect(page.getByLabel("commandMessage2")).toHaveText(
      "View success!"
    );
    /** check that the data table was loaded */
    await expect(page.getByLabel('data2')).toBeVisible();
    await expect(page.getByLabel('data2').getByRole('cell', { name: 'song' })).toHaveText("song");
  });

  /**
   * try to load an invalid file, then view 
   */
  test("mode, load invalid file, and view, verbose mode", async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("mode");
    await page.getByRole("button", { name: "Submitted 0 times" }).click();
    await expect(page.getByLabel("commandString0")).toHaveText("mode");
    await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_file outside-of-data-directory.csv");
    await page.getByRole("button", { name: "Submitted 1 times" }).click();
    await expect(page.getByLabel("commandString1")).toHaveText("load_file outside-of-data-directory.csv");
    await expect(page.getByLabel("commandMessage1")).toHaveText(
        "Error: filepath outside-of-data-directory.csv located in an unaccessible directory."
    );

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("view");
    await page.getByRole("button", { name: "Submitted 2 times" }).click();
    await expect(page.getByLabel("commandString2")).toHaveText("view");
    await expect(page.getByLabel("commandMessage2")).toHaveText(
      "Error: CSV file could not be viewed. Load correct filepath first."
    );
  });

  /**
   * try to load a valid file, then an invalid file, then view 
   */
  test("mode, load valid file, load invalid file and view, verbose mode", async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("mode");
    await page.getByRole("button", { name: "Submitted 0 times" }).click();
    await expect(page.getByLabel("commandString0")).toHaveText("mode");
    await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_file data/filepath1");
    await page.getByRole("button", { name: "Submitted 1 times" }).click();
    await expect(page.getByLabel("commandString1")).toHaveText("load_file data/filepath1");
    await expect(page.getByLabel("commandMessage1")).toHaveText(
      "Load success!"
    );
  
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_file outside-of-data-directory.csv");
    await page.getByRole("button", { name: "Submitted 2 times" }).click();
    await expect(page.getByLabel("commandString2")).toHaveText("load_file outside-of-data-directory.csv");
    await expect(page.getByLabel("commandMessage2")).toHaveText(
        "Error: filepath outside-of-data-directory.csv located in an unaccessible directory."
    );

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("view");
    await page.getByRole("button", { name: "Submitted 3 times" }).click();
    await expect(page.getByLabel("commandString3")).toHaveText("view");
    await expect(page.getByLabel("commandMessage3")).toHaveText(
      "Error: CSV file could not be viewed. Load correct filepath first."
    );
  });
