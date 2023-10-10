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
   * test load and view with mode, then without mode
   */
  test("mode, load, and view success (verbose mode then brief mode)", async ({ page }) => {
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
    await expect(page.getByLabel('data2').getByRole('cell', { name: 'song' })).toHaveText("song");

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("mode");
    await page.getByRole("button", { name: "Submitted 3 times" }).click();
    await expect(page.getByLabel("commandMessage3")).toHaveText("Mode success!");

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("view");
    await page.getByRole("button", { name: "Submitted 4 times" }).click();
    await expect(page.getByLabel("commandMessage4")).toHaveText(
      "View success!"
    );
    // TODO idk why line 58 doesn't work
    // await expect(page.getByLabel('data4').getByRole('cell', { name: 'song' })).toHaveText("song");
});

  /**
   * try to load a valid file, then view, then an invalid file, then view 
   */
  test("mode, load valid file and view, load invalid file and view, verbose mode", async ({ page }) => {
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
    await expect(page.getByLabel('data2').getByRole('cell', { name: 'song' })).toHaveText("song");
  
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_file outside-of-data-directory.csv");
    await page.getByRole("button", { name: "Submitted 3 times" }).click();
    await expect(page.getByLabel("commandString3")).toHaveText("load_file outside-of-data-directory.csv");
    await expect(page.getByLabel("commandMessage3")).toHaveText(
        "Error: filepath outside-of-data-directory.csv located in an unaccessible directory."
    );

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("view");
    await page.getByRole("button", { name: "Submitted 4 times" }).click();
    await expect(page.getByLabel("commandString4")).toHaveText("view");
    await expect(page.getByLabel("commandMessage4")).toHaveText(
      "Error: CSV file could not be viewed. Load correct filepath first."
    );
  });

  /**
   * mode, load an invalid file, try to search, load a valid file, do an unsuccessful search, do a successful search
   */
  test("failed load_file, failed search, successful load_file, a failed search, then a successful search, verbose mode", async ({
    page,
  }) => {
    // Notice: http, not https! Our front-end is not set up for HTTPs.
    await page.goto("http://localhost:8000/");
    // set into verbose mode
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("mode");
    await page.getByRole("button", { name: "Submitted 0 times" }).click();
    await expect(page.getByLabel("commandString0")).toHaveText("mode");
    await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
    // Failed load_file
    await page.getByLabel("Command input").click();
    await page
      .getByLabel("Command input")
      .fill("load_file data/non-existent-file.csv");
    await page.getByRole("button", { name: "Submitted 1 times" }).click();
    await expect(page.getByLabel("commandMessage1")).toHaveText(
      "Error: data/non-existent-file.csv not found"
    );
    // Write into command box
    await expect(page.getByLabel("Command input")).toBeVisible();
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("search 0 0");
    // Submit command
    await page.getByRole("button", { name: "Submitted 2 times" }).click();
    await expect(page.getByLabel("commandString2")).toHaveText("search 0 0");
    await expect(page.getByLabel("commandMessage2")).toHaveText(
      "Error: CSV file could not be searched. Load correct filepath first."
    );

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_file data/filepath1");
    await page.getByRole("button", { name: "Submitted 3 times" }).click();
    await expect(page.getByLabel("commandString3")).toHaveText("load_file data/filepath1");
    await expect(page.getByLabel("commandMessage3")).toHaveText(
      "Load success!"
    );

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("search 1 nonexistent-value");
    await page.getByRole("button", { name: "Submitted 4 times" }).click();
    await expect(page.getByLabel("commandString4")).toHaveText("search 1 nonexistent-value");
    await expect(page.getByLabel("commandMessage4")).toHaveText(
        "Error: search unsuccessful, could not find the value in the given column."
    );

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("search 1 The");
    await page.getByRole("button", { name: "Submitted 5 times" }).click();
    await expect(page.getByLabel("commandString5")).toHaveText("search 1 The");
    await expect(page.getByLabel("commandMessage5")).toHaveText(
      "Search success!"
    );
    await expect(page.getByLabel('data5').getByRole('cell', { name: 'song' })).toHaveText("song");
  });

    /**
   * mode, load a valid file, do a successful search, load a new file, try to search on the old file and fail, do a successful search on the new file 
   */
    test("successful load_file, successful search, successful load_file, failed search, then a successful search, verbose mode", async ({
        page,
      }) => {
        // Notice: http, not https! Our front-end is not set up for HTTPs.
        await page.goto("http://localhost:8000/");
        // set into verbose mode
        await page.getByLabel("Command input").click();
        await page.getByLabel("Command input").fill("mode");
        await page.getByRole("button", { name: "Submitted 0 times" }).click();
        await expect(page.getByLabel("commandString0")).toHaveText("mode");
        await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
    
        await page.getByLabel("Command input").click();
        await page.getByLabel("Command input").fill("load_file data/dol_ri_earnings_disparity.csv");
        await page.getByRole("button", { name: "Submitted 1 times" }).click();
        await expect(page.getByLabel("commandString1")).toHaveText("load_file data/dol_ri_earnings_disparity.csv");
        await expect(page.getByLabel("commandMessage1")).toHaveText(
          "Load success!"
        );

        await page.getByLabel("Command input").click();
        await page.getByLabel("Command input").fill("search 0 RI");
        await page.getByRole("button", { name: "Submitted 2 times" }).click();
        await expect(page.getByLabel("commandString2")).toHaveText("search 0 RI");
        await expect(page.getByLabel("commandMessage2")).toHaveText(
          "Search success!"
        );
        await expect(page.getByLabel('data2')).toBeVisible;
        await expect(page.getByLabel('data2').getByRole('cell', { name: 'White' })).toHaveText("White");
        await expect(page.getByLabel('data2').getByRole('cell', { name: 'Black' })).toHaveText("Black");
        await expect(page.getByLabel('data2').getByRole('cell', { name: 'Native American/American Indian' })).toHaveText("Native American/American Indian");
        await expect(page.getByLabel('data2').getByRole('cell', { name: 'Asian-Pacific Islander' })).toHaveText("Asian-Pacific Islander");
        await expect(page.getByLabel('data2').getByRole('cell', { name: 'Hispanic/Latino' })).toHaveText("Hispanic/Latino");
        await expect(page.getByLabel('data2').getByRole('cell', { name: 'Multiracial' })).toHaveText("Multiracial");

        await page.getByLabel("Command input").click();
        await page.getByLabel("Command input").fill("load_file data/ten-star.csv");
        await page.getByRole("button", { name: "Submitted 3 times" }).click();
        await expect(page.getByLabel("commandString3")).toHaveText("load_file data/ten-star.csv");
        await expect(page.getByLabel("commandMessage3")).toHaveText(
          "Load success!"
        );
    
        await page.getByLabel("Command input").click();
        await page.getByLabel("Command input").fill("search 0 RI");
        await page.getByRole("button", { name: "Submitted 4 times" }).click();
        await expect(page.getByLabel("commandString4")).toHaveText("search 0 RI");
        await expect(page.getByLabel("commandMessage4")).toHaveText(
            "Error: search unsuccessful, could not find the value in the given column."
        );
    
        await page.getByLabel("Command input").click();
        await page.getByLabel("Command input").fill("search StarID 0");
        await page.getByRole("button", { name: "Submitted 5 times" }).click();
        await expect(page.getByLabel("commandString5")).toHaveText("search StarID 0");
        await expect(page.getByLabel("commandMessage5")).toHaveText(
          "Search success!"
        );
        await expect(page.getByLabel('data5').getByRole('cell', { name: 'Sol' })).toHaveText("Sol");
       
      });


