import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blocks/$block")({
  component: BlockLayoutRoute,
});

function BlockLayoutRoute() {
  return <Outlet />;
}
