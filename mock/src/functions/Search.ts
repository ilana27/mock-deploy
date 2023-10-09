// Note this is a .ts file, not .tsx. It's TypeScript, but not React.
import { Dispatch, SetStateAction, useState } from "react";
import { Command } from "../components/REPL";

export function search(
  filepath: string,
  hasHeader: boolean,
  commandString: string
) {
  let searchMap = new Map<string, string[][]>([
    ["data/filepath11Thetrue", [["The", "song", "remains", "the", "same."]]],
    [
      "data/filepath2eAritrue",
      [
        ["a", "b", "c", "d", "e"],
        ["Hi", "my", "name", "is", "Ari"],
      ],
    ],
  ]);

  let commandStringSplit: string[] = commandString.split(" ");

  console.log(
    filepath + commandStringSplit[1] + commandStringSplit[2] + String(hasHeader)
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
