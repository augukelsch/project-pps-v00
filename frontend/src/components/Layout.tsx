import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="grid grid-cols-[216px_minmax(0,_1fr)]">
      <Sidebar />
      <main className="flex-1 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}