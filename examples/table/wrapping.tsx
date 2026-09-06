import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

export default function TableWrappingDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Default</TableCell>
          <TableCell>
            This value stays on one line and scrolls horizontally when space is
            limited.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Wrapped</TableCell>
          <TableCell className="whitespace-normal">
            This value wraps because the cell explicitly opts in with
            whitespace-normal.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
