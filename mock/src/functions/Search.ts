// Note this is a .ts file, not .tsx. It's TypeScript, but not React.
import { Dispatch, SetStateAction, useState } from "react";
import { Command } from "../components/REPL";

export function search(
  filepath: string,
  hasHeader: boolean,
  commandString: string
) {
  let validFiles: string[] = [
    "data/filepath1",
    "data/filepath2",
    "data/ten-star.csv",
    "data/ten-star_no_headings.csv",
    "data/empty.csv",
    "data/dol_ri_earnings_disparity.csv",
  ];
  let searchMap = new Map<string, string[][]>([
    ["data/filepath1 1 The true", [["The", "song", "remains", "the", "same."]]],
    [
      "data/filepath 2 e Ari true",
      [
        ["a", "b", "c", "d", "e"],
        ["Hi", "my", "name", "is", "Ari"],
      ],
    ],
    ["data/empty.csv 0 0 true", []],
    ["data/empty.csv 0 0 false", []],
    ["data/ten-star.csv 0 0 true", [["0", "Sol", "0", "0", "0"]]],
    ["data/ten-star.csv 0 0 false", [["0", "Sol", "0", "0", "0"]]],
    ["data/ten-star.csv StarID 0 true", [["0", "Sol", "0", "0", "0"]]],
    ["data/ten-star.csv StarID 4 true", []],
    [
      "data/ten-star_no_headings.csv 0 70667 true",
      [["70667", "Proxima Centauri", "-0.47175", "-0.36132", "-1.15037"]],
    ],
    [
      "data/ten-star_no_headings.csv 0 70667 false",
      [["70667", "Proxima Centauri", "-0.47175", "-0.36132", "-1.15037"]],
    ],
    [
      "data/dol_ri_earnings_disparity.csv 0 RI true",
      [
        ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
        ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
        [
          "RI",
          "Native American/American Indian",
          " $471.07 ",
          "2315.505646",
          " $0.45 ",
          "0%",
        ],
        [
          "RI",
          "Asian-Pacific Islander",
          '" $1,080.09 "',
          "18956.71657",
          " $1.02 ",
          "4%",
        ],
        ["RI", "Hispanic/Latino", " $673.14 ", "74596.18851", " $0.64 ", "14%"],
        ["RI", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
      ],
    ],
    [
      "data/dol_ri_earnings_disparity.csv 0 RI false",
      [
        ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
        ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
        [
          "RI",
          "Native American/American Indian",
          " $471.07 ",
          "2315.505646",
          " $0.45 ",
          "0%",
        ],
        [
          "RI",
          "Asian-Pacific Islander",
          '" $1,080.09 "',
          "18956.71657",
          " $1.02 ",
          "4%",
        ],
        ["RI", "Hispanic/Latino", " $673.14 ", "74596.18851", " $0.64 ", "14%"],
        ["RI", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
      ],
    ],
    [
      "data/dol_ri_earnings_disparity.csv State RI true",
      [
        ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
        ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
        [
          "RI",
          "Native American/American Indian",
          " $471.07 ",
          "2315.505646",
          " $0.45 ",
          "0%",
        ],
        [
          "RI",
          "Asian-Pacific Islander",
          '" $1,080.09 "',
          "18956.71657",
          " $1.02 ",
          "4%",
        ],
        ["RI", "Hispanic/Latino", " $673.14 ", "74596.18851", " $0.64 ", "14%"],
        ["RI", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
      ],
    ],
    ["data/dol_ri_earnings_disparity.csv State OH true", []],
    [
      "data/dol_ri_earnings_disparity.csv Data Type White true",
      [["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"]],
    ],
    [
      "data/dol_ri_earnings_disparity.csv 1 White true",
      [["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"]],
    ],
  ]);

  let commandStringSplit: string[] = commandString.split(" ");
  let result = searchMap.get(
    filepath +
      " " +
      commandStringSplit[1] +
      " " +
      commandStringSplit[2] +
      " " +
      String(hasHeader)
  );

  if (!validFiles.includes(filepath)) {
    return new Command(
      commandString,
      [],
      "Error: CSV file could not be searched. Load correct filepath first."
    );
  } else if (result === undefined) {
    return new Command(
      commandString,
      [],
      "Error: search unsuccessful, could not find the value in the given column."
    );
  }
  if (result.length === 0) {
    return new Command(
      commandString,
      result,
      'Search success! However, no rows matching the search criteria "' +
        commandString +
        '" were found.'
    );
  }
  return new Command(commandString, result, "Search success!");
}
