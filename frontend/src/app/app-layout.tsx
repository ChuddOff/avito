import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground w-full ">
      <div className="mx-auto max-w-350 py-3 px-8">
        <Outlet />
      </div>
    </div>
  );
}
