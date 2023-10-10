// Note this is a .ts file, not .tsx. It's TypeScript, but not React.
import { Command } from "../functions/Command";
import { validFiles, searchMap } from "../functions/mockedJson";

export function search(
  filepath: string,
  hasHeader: boolean,
  commandString: string,
  commandArr: string[]
) {
  let result = searchMap.get(
    filepath +
      " " +
      commandArr[1] +
      " " +
      commandArr[2] +
      " " +
      String(hasHeader)
  );
  if (!validFiles.includes(filepath)) {
    return new Command(
      commandString,
      [],
      "Error: CSV file could not be searched. Load correct filepath first."
    );
  } else if (commandArr.length !== 3) {
    return new Command(
      commandString,
      [],
      "Error: incorrect number of arguments given to search command. Two arguments expected: <column> <value>."
    );
  } else if (result === undefined) {
    if (!hasHeader && isNaN(parseInt(commandArr[1]))) {
      return new Command(
        commandString,
        [],
        'Error: search unsuccessful, could not search non-numeric column ID "' +
          commandArr[1] +
          '" in file with no headers.'
      );
    }
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
