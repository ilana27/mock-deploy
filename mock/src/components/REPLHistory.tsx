import "../styles/main.css";
import CsvTable from "./CsvTable";
import { Command } from "./REPL";
import { useRef, useEffect } from "react";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  history: Command[];
  mode: boolean;
}
export function REPLHistory(props: REPLHistoryProps) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.history]);
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.history.map((command, index) =>
        props.mode ? (
          <div className="leftAlign">
            <p aria-label={"commandMessage" + String(index)}>
              {command.message}
            </p>
            <CsvTable data={command.data} />
            <br />
            <hr />
          </div>
        ) : (
          <div className="leftAlign">
            <span className="boldText">Command: </span>
            <span aria-label={"commandString" + String(index)}>
              {command.commandString}
            </span>
            <br />
            <span className="boldText">Ouptut: </span>
            <span aria-label={"commandMessage" + String(index)}>
              {command.message}
            </span>
            <CsvTable data={command.data} />
            <br />
            <hr />
          </div>
        )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
