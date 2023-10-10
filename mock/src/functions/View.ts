// Note this is a .ts file, not .tsx. It's TypeScript, but not React.
import { Command } from "../functions/Command";
import { filepathMap } from "../functions/mockedJson";

/**
 *
 *
 */
export function view(filepath: string, commandString: string) {
  let result = filepathMap.get(filepath);
  if (result === undefined) {
    return new Command(
      commandString,
      [],
      "Error: CSV file could not be viewed. Load correct filepath first."
    );
  }
  if (result.length === 0) {
    return new Command(
      commandString,
      result,
      "View success! However, " + filepath + " appears to be an empty file."
    );
  }
  return new Command(commandString, result, "View success!");
}
