import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="grid grid-cols-[216px_minmax(0,_1fr)]">
      <Sidebar />
      <main className="flex-1 bg-linear-to-r from-gray-300 via-gray-100 to-gray-300 dark:bg-linear-to-r dark:from-gray-700 dark:via-gray-500 dark:to-gray-700 min-h-screen ">
        <Outlet />
      </main>
    </div>
  );
}