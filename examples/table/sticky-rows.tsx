import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

const invoices = [
  ["INV-1001", "Design subscription", "$120.00"],
  ["INV-1002", "API usage", "$84.50"],
  ["INV-1003", "Team seats", "$240.00"],
  ["INV-1004", "Priority support", "$75.00"],
  ["INV-1005", "Storage overage", "$32.40"],
  ["INV-1006", "Design subscription", "$120.00"],
  ["INV-1007", "API usage", "$91.20"],
  ["INV-1008", "Team seats", "$240.00"],
  ["INV-1009", "Priority support", "$75.00"],
  ["INV-1010", "Storage overage", "$28.80"],
];

export default function TableStickyRowsDemo() {
  return (
    <Table viewportClassName="max-h-64">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(([invoice, description, amount]) => (
          <TableRow key={invoice}>
            <TableCell className="font-medium tabular-nums">
              {invoice}
            </TableCell>
            <TableCell>{description}</TableCell>
            <TableCell className="text-right tabular-nums">{amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow sticky="bottom">
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right font-bold tabular-nums">
            $1,106.90
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
