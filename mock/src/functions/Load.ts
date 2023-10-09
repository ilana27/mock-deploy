// Note this is a .ts file, not .tsx. It's TypeScript, but not React.
import { Dispatch, SetStateAction, useState } from "react";
import { Command } from "../components/REPL";

/**
 * Defines the kinds of sequence we are thinking of---the answer to
 * the puzzle. We might imagine swapping in many of these and using
 * the same puzzle infrastructure.
 *
 * @param guess A 3-number sequences
 * @returns true or false, depending on if the sequence matches
 */
export function load(
  filepath: string,
) {
  let filepathSplit: string[] = filepath.split("/");
  if (
    !(
      filepathSplit[0] === "data" ||
      (filepathSplit[0] === "." && filepathSplit[1] === "data")
    )
  ) {
    return "Error: filepath " + filepath + " located in an unaccessible directory.";
  }
  return "success";
}
