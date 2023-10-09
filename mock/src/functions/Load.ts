// Note this is a .ts file, not .tsx. It's TypeScript, but not React.
import { Dispatch, SetStateAction, useState } from "react";
import { Command } from "../components/REPL";

/**
 * 
 *
 * 
 */
export function load(
  commandArr: string[],
  setHeader: Dispatch<SetStateAction<boolean>>
) {
  let filepath = commandArr[1];
  let filepathSplit: string[] = filepath.split("/");
  if (
    !(
      filepathSplit[0] === "data" ||
      (filepathSplit[0] === "." && filepathSplit[1] === "data")
    )
  ) {
    return "Error: filepath " + filepath + " located in an unaccessible directory.";
  }
  if (commandArr.length > 2) {
    let hasHeader = commandArr[2];
    if (hasHeader.toLowerCase() === "true") {
      setHeader(true);
    } else if (hasHeader.toLowerCase() === "false") {
      setHeader(false);
    } else {
      return "Error: header parameter must be either true or false.";
    }
  }
  return "Load success!";
}
