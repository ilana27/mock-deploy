import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { load } from "../functions/Load";
import { Command } from "./REPL";
import { view } from "../functions/View";
import { search } from "../functions/Search";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: Command[];
  mode: boolean;
  setHistory: Dispatch<SetStateAction<Command[]>>;
  setMode: Dispatch<SetStateAction<boolean>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);
  const [filepath, setFilepath] = useState<string>("");
  const [hasHeader, setHeader] = useState<boolean>(true);

  const handleKey = (e: any) => {
    if (e.key === "Enter") {
      if (!commandString) {
        return;
      }
      handleSubmit(commandString);
    }
  };

  // TODO WITH TA: build a handleSubmit function called in button onClick
  // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    let commandArr: Array<string> = commandString.split(" ");
    let command: String = commandArr[0];
    let newCommand: Command;
    if (command === "mode") {
      props.setMode(!props.mode);
      newCommand = new Command(commandString, [], "Mode success!");
    } else if (command === "load_file") {
      //load
      if (commandArr.length !== 2) {
        newCommand = new Command(
          commandString,
          [],
          "Error: incorrect number of arguments given to load_file command"
        );
      } else {
        let loadMessage: string = load(commandArr, setHeader);
        newCommand = new Command(commandString, [], loadMessage);
        setFilepath(commandArr[1]);
      }
    } else if (command === "view") {
      newCommand = view(filepath, commandString);
    } else if (command === "search") {
      newCommand = search(filepath, hasHeader, commandString);
    } else {
      newCommand = new Command(
        commandString,
        [],
        "Please provide a valid command. Valid commands: mode, load_file, view, or search <column><value>"
      );
    }

    setCount(count + 1);
    // CHANGED
    props.setHistory([...props.history, newCommand]);
    setCommandString("");
  }
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input" onKeyDown={handleKey}>
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <br />
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
