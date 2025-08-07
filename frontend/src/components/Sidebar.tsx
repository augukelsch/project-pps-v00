import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/parts" className="hover:underline">Peças & Produtos</Link>
        <Link to="/customers" className="hover:underline">Clientes</Link>
      </nav>
    </div>
  );
}