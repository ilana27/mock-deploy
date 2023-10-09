import "../styles/main.css";
import CsvTable from "./CsvTable";
import { Command } from "./REPL";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  history: Command[];
  mode: boolean;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.history.map((command, index) =>
        props.mode ? (
            <div>
                 <p>{command.message}</p>
                <CsvTable data={command.data}/>
            </div>
        ) : (
          <div>
            <p>Command: {command.commandString}</p>
            <p>Ouptut: {command.message}</p>
            <CsvTable data={command.data}/>
          </div>
        )
      )}
    </div>
  );
}
