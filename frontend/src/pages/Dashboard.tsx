import { useEffect, useState } from "react";
import { getTotalNumberOfParts } from "../services/part.api";
import { getTotalNumberOfCustomers } from "../services/customer.api";
import Header from "../components/Header";

export default function Dashboard() {
    const [totalParts, setTotalParts] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);

    useEffect(() => {
    getTotalNumberOfParts()
        .then((data) => {
        if (!data) return;
        setTotalParts(data)
        })
        .catch((err) => {
        console.error("Failed to fetch parts", err);
        });
    }, []);


    
    useEffect(() => {
    getTotalNumberOfCustomers()
        .then((data) => {
        if (!data) return;
        setTotalCustomers(data);
        })
        .catch((err) => {
        console.error("Failed to fetch customer", err);
        });
    }, []);

  return (
    <div className="space-y-2">
    <Header>Dashboard</Header>
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total de Peças</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">{totalParts}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total de Clientes</h2>
          <p className="mt-2 text-3xl font-bold text-green-600">{totalCustomers}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700">Pedidos Pendentes</h2>
          <p className="mt-2 text-3xl font-bold text-red-600">7</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Últimas peças adicionadas</h2>
        <table className="w-full text-left">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="py-2">Código</th>
              <th className="py-2">Nome</th>
              <th className="py-2">Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">001</td>
              <td className="py-2">Parafuso M8</td>
              <td className="py-2">Usado em motores</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">002</td>
              <td className="py-2">Arruela A2</td>
              <td className="py-2">Alta resistência</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
