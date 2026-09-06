import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/base/table";

const tasks = [
  { id: "TASK-8782", title: "Add authentication flow", status: "Done" },
  { id: "TASK-7878", title: "Migrate database schema", status: "In Progress" },
  { id: "TASK-7839", title: "Refactor sidebar navigation", status: "Backlog" },
  { id: "TASK-5562", title: "Implement table pagination", status: "In Review" },
];

export default function TableBorderedDemo() {
  return (
    <Table bordered>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Task ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="tabular-nums text-xs font-medium">
              {task.id}
            </TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell className="text-muted-foreground">
              {task.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
