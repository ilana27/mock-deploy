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
    ]]);
  let result = filepathMap.get(filepath);
  if (result === undefined) {
    return new Command(commandString, [], "Error: CSV file could not be viewed. Load correct filepath first.");
  } 
  return new Command(commandString, result, "View success");
}
