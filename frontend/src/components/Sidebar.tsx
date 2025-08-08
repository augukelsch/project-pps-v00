import { ChartColumn, Cog, UserStar } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
    const activeStyle = "rounded-md p-2 hover:bg-gray-800  text-orange-300 flex gap-2"
    const inactiveStyle = "rounded-md p-2 hover:bg-gray-800  hover:text-orange-300 flex gap-2"

  return (
    <div className="min-w-54 h-screen bg-gray-900  text-white ">
      <h2 className="text-xl text-orange-400 pl-8 font-semibold mb-1 p-5 border-b-5 border-b-gray-800 border-r-5 border-r-gray-800">Company Name</h2>
      <nav className="flex flex-col gap-4 p-4 ">
        <NavLink to="/" className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? activeStyle :inactiveStyle }><ChartColumn/>Dashboard</NavLink>
        <NavLink to="/parts" className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? activeStyle :inactiveStyle }><Cog />Peças & Produtos</NavLink>
        <NavLink to="/customers" className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? activeStyle :  inactiveStyle}><UserStar />Clientes</NavLink>
      </nav>
    </div>
  );
}