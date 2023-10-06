import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { load } from "../functions/Load";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: string[];
  mode: boolean;
  setHistory: Dispatch<SetStateAction<string[]>>;
  setNotification: Dispatch<SetStateAction<string>>;
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

  // TODO WITH TA: build a handleSubmit function called in button onClick
  // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    let commandArr: Array<string> = commandString.split(" ");
    let command: String = commandArr[0];
    if (command === "mode") {
      props.setMode(!props.mode);
      props.setNotification("");
    } else if (command === "load_file") {
      //load
      if (commandArr.length !== 2) {
        props.setNotification(
          "Error: incorrect number of arguments given to load_file command"
        );
      } else {
        props.setNotification("");
      }
      load(commandArr[1], props.setNotification);
      setFilepath(commandArr[1]);
    } else if (command === "view") {
      //view
      props.setNotification("");
    } else if (command === "search") {
      //search
      props.setNotification("");
    } else {
      props.setNotification(
        "Please provide a valid command. Valid commands: mode, load_file, view, or search <column><value>"
      );
    }

    setCount(count + 1);
    // CHANGED
    props.setHistory([...props.history, commandString]);
    setCommandString("");
  }
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
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
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
