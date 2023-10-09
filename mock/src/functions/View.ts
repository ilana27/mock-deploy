// Note this is a .ts file, not .tsx. It's TypeScript, but not React.
import { Dispatch, SetStateAction, useState } from "react";
import { Command } from "../components/REPL";

/**
 * 
 *
 */
export function view(
  filepath: string,
  commandString: string
) {
  let filepathMap = new Map<string, string[][]>([
    ["data/filepath1", [
        ["1", "2", "3", "4", "5"],
        ["The", "song", "remains", "the", "same."],]
    ],
    ["data/filepath2", [
        ["a", "b", "c", "d", "e"],
        ["Hi", "my", "name", "is", "Ari"],]
    ],
    ["data/ten-star.csv", [
        ["StarID", "ProperName", "X", "Y", "Z"],
        ["0", "Sol", "0", "0", "0"],
        ["1", "", "282.43485", "0.00449", "5.36884"],
        ["2", "", "43.04329", "0.00285", "-15.24144"],
        ["3", "", "277.11358", "0.02422", "223.27753"],
        ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
        ["70667", "Proxima Centauri", "-0.47175", "-0.36132", "-1.15037"],]
    ],
    ["data/ten-star_no_headings.csv", [
        ["0", "Sol", "0", "0", "0"],
        ["1", "", "282.43485", "0.00449", "5.36884"],
        ["2", "", "43.04329", "0.00285", "-15.24144"],
        ["3", "", "277.11358", "0.02422", "223.27753"],
        ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
        ["70667", "Proxima Centauri", "-0.47175", "-0.36132", "-1.15037"],]
    ]]);
  let result = filepathMap.get(filepath);
  if (result === undefined) {
    return new Command(commandString, [], "Error: CSV file could not be viewed. Load correct filepath first.");
  } 
  return new Command(commandString, result, "View success!");
}
