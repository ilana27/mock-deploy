import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { load } from "../functions/Load";
import { Command } from "./REPL";
import { view } from "../functions/View";
import { search } from "../functions/Search";

interface REPLInputProps {
  history: Command[];
  mode: boolean;
  setHistory: Dispatch<SetStateAction<Command[]>>;
  setMode: Dispatch<SetStateAction<boolean>>;
}

export function REPLInput(props: REPLInputProps) {
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
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
      if (commandArr.length >= 4 || commandArr.length <= 1) {
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
        "Error: Please provide a valid command. Valid commands: mode, load_file, view, or search <column><value>"
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
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <br />
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
