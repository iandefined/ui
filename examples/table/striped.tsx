import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

const metrics = [
  { metric: "Page Views", count: "124,892", change: "+12.3%" },
  { metric: "Unique Visitors", count: "48,201", change: "+8.1%" },
  { metric: "Bounce Rate", count: "32.4%", change: "-2.4%" },
  { metric: "Average Session", count: "3m 42s", change: "+14.0%" },
  { metric: "Conversions", count: "1,429", change: "+5.6%" },
];

export default function TableStripedDemo() {
  return (
    <Table striped>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead className="text-right">Count</TableHead>
          <TableHead className="text-right">Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metrics.map((item) => (
          <TableRow key={item.metric}>
            <TableCell className="font-medium">{item.metric}</TableCell>
            <TableCell className="text-right tabular-nums">
              {item.count}
            </TableCell>
            <TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">
              {item.change}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
