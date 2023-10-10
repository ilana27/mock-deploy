import { test, expect } from "@playwright/test";

/**
 * This test calls search before loading, without parameters, which fails.
 * It is in brief mode, so we check the output shown to make sure that the
 * proper error message is shown.
 */
test("call search without loading, without parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: CSV file could not be searched. Load correct filepath first."
  );
});

/**
 * This test calls search before loading, with parameters, which fails.
 * It is in brief mode, so we check the output shown to make sure that the
 * proper error message is shown.
 */
test("call search without loading, with parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: CSV file could not be searched. Load correct filepath first."
  );
});

/**
 * This test calls search with no parameters, without loading, and after a gibberish
 * command, which fails. It is in brief mode, so we check the output shown to make
 * sure that the proper error message is shown.
 */
test("call search after gibberish command, without parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Failed load_file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("hello");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: Please provide a valid command. Valid commands: mode, load_file, view, or search <column><value>"
  );
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: CSV file could not be searched. Load correct filepath first."
  );
});

/**
 * This test calls search with no parameters, after load_file call failed, so
 * search fails. It is in brief mode, so we check the output shown to make
 * sure that the proper error message is shown.
 */
test("call search after failed load_file, without parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Failed load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/non-existent-file.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: data/non-existent-file.csv not found"
  );
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: CSV file could not be searched. Load correct filepath first."
  );
});

/**
 * This test calls search with no parameters, after load_file call failed, so
 * search fails. It is in verbose mode, so we check the output shown to make
 * sure that the proper command and proper error message are shown.
 */
test("call search after failed load_file, without parameters, verbose mode", async ({
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
});

/**
 * This test calls search after an empty file has been loaded, but with no
 * parameters, so search fails. It is in brief mode, so we check the output
 * shown to make sure that the proper error message is shown.
 */
test("call search after loaded empty csv, without parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // load_file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/empty.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: search unsuccessful, could not find the value in the given column."
  );
});

/**
 * This test calls search after an empty file has been loaded, but the search
 * finds no matching results. It is in brief mode, so we check the output
 * shown to make sure that the proper success message is shown.
 */
test("call search after loaded empty csv, with parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // load_file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/empty.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    'Search success! However, no rows matching the search criteria "search 0 0" were found.'
  );
});

/**
 * This test calls search after ten-star file has been loaded, but with no
 * parameters, so search fails. It is in brief mode, so we check the output
 * shown to make sure that the proper error message is shown.
 */
test("call search after loaded ten-star csv, without parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // load_file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/ten-star.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: search unsuccessful, could not find the value in the given column."
  );
});

/**
 * This test calls search after ten-star file has been loaded, but no matching
 * rows are found in the data. It is in brief mode, so we check the output
 * shown to make sure that the proper success message is shown.
 */
test("call search after loaded ten-star csv, with parameters, no rows found, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // load_file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/ten-star.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 4");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    'Search success! However, no rows matching the search criteria "search StarID 4" were found.'
  );
});

/**
 * This test calls search after ten-star file has been loaded, and one matching row
 * is found. It is in verbose mode, so we check the output shown to make sure that
 * the proper command, proper success message, and proper row of data are shown.
 */
test("call search after loaded ten-star csv, with parameters, one row found, verbose mode", async ({
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
  // load_file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/ten-star.csv");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Search success!"
  );
  // Check that table shows up
  await expect(page.getByLabel("data2")).toBeVisible();
  // Check that the expected row is in the table
  await expect(page.getByLabel("data2")).toHaveText("0Sol000");
});

/**
 * This test calls search after ten-star file has been loaded, specifying that there
 * are headers. One matching rowis found. It is in verbose mode, so we check the output
 * shown to make sure that the proper command, proper success message, and proper row of
 * data are shown.
 */
test("call search after loaded ten-star csv, with headers, one row found, verbose mode", async ({
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
  // load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv true");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Search success!"
  );
  // Check that table shows up
  await expect(page.getByLabel("data2")).toBeVisible();
  // Check that the expected row is in the table
  await expect(page.getByLabel("data2")).toHaveText("0Sol000");
});

/**
 * This test calls search after ten-star file has been loaded, specifying that
 * the file has no headers. One matching row is found. It is in verbose mode, so we
 * check the output shown to make sure that the proper command, proper success message,
 * and proper row of data are shown.
 */
test("call search after loaded ten-star csv, one row found, no headers, verbose mode", async ({
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
  // load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv false");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Search success!"
  );
  // Check that table shows up
  await expect(page.getByLabel("data2")).toBeVisible();
  // Check that the expected row is in the table
  await expect(page.getByLabel("data2")).toHaveText("0Sol000");
});

/**
 * This test calls search after ten-star file has been loaded, specifying that there
 * are no headers. We try to search a non-numeric column ID, even though there are
 * no headers, so the search finds nothing. It is in verbose mode, so we check the
 * output shown to make sure that the proper command and proper error message are shown.
 */
test("call search after loaded ten-star csv, one row found, no headers, nothing found, verbose mode", async ({
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
  // load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv false");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Error: search unsuccessful, could not find the value in the given column. "
  );
});

/**
 * This test calls search after ten-star file has been loaded, multiple matching rows are found.
 * It is in verbose mode, so we check the output shown to make sure that the proper command,
 * proper success message, and proper rows of data are shown.
 */
test("call search after loaded earnings disparity csv, with parameters, multiple rows found, verbose mode", async ({
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
  // load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/dol_ri_earnings_disparity.csv");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search State RI");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Search success!"
  );
  // Check that table shows up
  await expect(page.getByLabel("data2")).toBeVisible();
  // Check that all expected rows are in the table
  await expect(
    page.getByLabel("data2").getByRole("cell", { name: "White" })
  ).toBeVisible();
  await expect(
    page.getByLabel("data2").getByRole("cell", { name: "Black" })
  ).toBeVisible();
  await expect(
    page
      .getByLabel("data2")
      .getByRole("cell", { name: "Native American/American Indian" })
  ).toBeVisible();
  await expect(
    page.getByLabel("data2").getByRole("cell", { name: "Hispanic/Latino" })
  ).toBeVisible();
  await expect(
    page.getByLabel("data2").getByRole("cell", { name: "Multiracial" })
  ).toBeVisible();
});