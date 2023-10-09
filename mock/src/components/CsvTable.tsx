interface CsvTableProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  data: string[][];
}

export default function CsvTable(props: CsvTableProps) {
  const rows = props.data.map((row: string[], index: number) => {
    return (
      <tr key={`row-${index}`}>
        {row.map((column: string, index2: number) => {
          return <td key={`cell-${index2}`}>{column}</td>;
        })}
      </tr>
    );
  });

  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
}
