// Note this is a .ts file, not .tsx. It's TypeScript, but not React.
import { Dispatch, SetStateAction, useState } from "react";
import { Command } from "../components/REPL";

export function search(
  filepath: string,
  hasHeader: boolean,
  commandString: string
) {
  let searchMap = new Map<string, string[][]>([
    ["data/filepath1 1 The true", [["The", "song", "remains", "the", "same."]]],
    [
      "data/filepath 2 e Ari true",
      [
        ["a", "b", "c", "d", "e"],
        ["Hi", "my", "name", "is", "Ari"],
      ],
    ],
    ["data/empty.csv 0 0 true", [[]]],
    ["data/empty.csv 0 0 false", [[]]],
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
  ]);

  let commandStringSplit: string[] = commandString.split(" ");

  console.log(
    filepath +
      " " +
      commandStringSplit[1] +
      " " +
      commandStringSplit[2] +
      " " +
      String(hasHeader)
  );
  let result = searchMap.get(
    filepath + commandStringSplit[1] + commandStringSplit[2] + String(hasHeader)
  );

  if (result === undefined) {
    return new Command(
      commandString,
      [],
      "Error: search unsuccessful, could not find the value in the given column."
    );
  }
  return new Command(commandString, result, "Search success");
}
