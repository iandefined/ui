import { Badge } from "@/registry/base/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

const invoices = [
  {
    invoice: "INV-001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  {
    invoice: "INV-002",
    status: "Pending",
    method: "PayPal",
    amount: "$150.00",
  },
  {
    invoice: "INV-003",
    status: "Unpaid",
    method: "International Bank Transfer",
    amount: "$350.00",
  },
  {
    invoice: "INV-004",
    status: "Paid",
    method: "Credit Card",
    amount: "$450.00",
  },
  {
    invoice: "INV-005",
    status: "Paid",
    method: "PayPal",
    amount: "$550.00",
  },
];

export default function TableResizableDemo() {
  return (
    <Table resizable>
      <TableCaption>Drag the column separators to resize columns.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Invoice</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
          <TableHead className="w-[160px]">Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium tabular-nums">
              {invoice.invoice}
            </TableCell>
            <TableCell>
              <Badge
                depth="surface"
                variant={
                  invoice.status === "Paid"
                    ? "success"
                    : invoice.status === "Pending"
                      ? "warning"
                      : "error"
                }
              >
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right tabular-nums">
              {invoice.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
