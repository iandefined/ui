import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

const items = [
  { description: "Pro Plan Subscription", quantity: 1, price: "$29.00" },
  { description: "Custom Domain Add-on", quantity: 2, price: "$20.00" },
  { description: "Dedicated IP Address", quantity: 1, price: "$15.00" },
];

export default function TableWithFooterDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead className="text-center">Qty</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.description}>
            <TableCell className="font-medium">{item.description}</TableCell>
            <TableCell className="text-center tabular-nums">
              {item.quantity}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {item.price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right font-bold tabular-nums">
            $64.00
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
