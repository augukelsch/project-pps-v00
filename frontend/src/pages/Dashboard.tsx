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
        <div  className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
          <h2 className="text-lg font-semibold ">Total de Peças</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">{totalParts}</p>
        </div>
        <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
          <h2 className="text-lg font-semibold ">Total de Clientes</h2>
          <p className="mt-2 text-3xl font-bold text-green-600">{totalCustomers}</p>
        </div>
        <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
          <h2 className="text-lg font-semibold ">Pedidos Pendentes</h2>
          <p className="mt-2 text-3xl font-bold text-red-600">7</p>
        </div>
      </div>

    <div className="box-rounded max-h-145 overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold mb-4">Últimas peças adicionadas</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 rounded">
            <tr>
              <th className="py-2 w-50">Data</th>
              <th className="py-2 w-30">Código</th>
              <th className="py-2">Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200 dark:text-white hover:font-bold">
              <td className="py-2">10/01/2025</td>
              <td className="py-2">001</td>
              <td className="py-2">Parafuso M8</td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200 dark:text-white hover:font-bold">
              <td className="py-2">10/01/2025</td>
              <td className="py-2">002</td>
              <td className="py-2">Arruela A2</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
