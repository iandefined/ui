import { Calendar } from "@/registry/base/calendar";

export default function CalendarDemo() {
  return <Calendar defaultValue={[new Date(2026, 8, 15)]} />;
}
