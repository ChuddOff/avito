import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-white text-foreground max-w-350 w-full ">
      <div className="mx-auto  py-3 px-8 border-none outline-none">
        <Outlet />
      </div>
    </div>
  );
}
