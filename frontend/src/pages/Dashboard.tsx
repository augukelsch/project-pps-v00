import { useEffect, useState } from "react";
import { getLastCreatedParts, getTotalNumberOfParts, type DatePart } from "../services/part.api";
import { getLastCreatedCustomers, getTotalNumberOfCustomers, type DateCustomers } from "../services/customer.api";
import Header from "../components/Header";
import { getTotalNumberOfOrders, type CounterOrder } from "../services/order.api";

export default function Dashboard() {
  const [totalParts, setTotalParts] = useState(0);
  const [lastParts, setLastParts] = useState<DatePart[]>([]);
  const [lastCustomers, setLastCustomers] = useState<DateCustomers[]>([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState<CounterOrder>()
  0
  useEffect(() => {
    getTotalNumberOfOrders().then((data) => {
      setTotalOrders(data)
      return data;
    }).catch((err) => {
      return err.message;
    })
  }, [])

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
    getLastCreatedParts()
      .then((data) => {
        const formatted = data.map((item: any[]) => ({
          date: new Date(item[0]).toLocaleString("pt-BR"),
          cod: item[1],
          description: item[2]
        })) as unknown as DatePart[];
        setLastParts(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch parts", err);
      });
  }, []);

  useEffect(() => {
    getLastCreatedCustomers()
      .then((data) => {
        console.log(data)
        const formatted = data.map((item: any[]) => ({
          date: new Date(item[0]).toLocaleString("pt-BR"),
          name: item[1],
          seller: item[2]
        })) as unknown as DateCustomers[];
        setLastCustomers(formatted);
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
            <a href="/orders">
              <a href="/orders">
                <h2 className="text-lg font-semibold ">Total de Pedidos</h2>
                <p className="mt-2 text-3xl font-bold text-blue-600">{totalOrders?.total || 0}</p>
              </a>
            </a>
          </div>
          <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
            <a href="/orders">
              <h2 className="text-lg font-semibold ">Pedidos OK</h2>
              <p className="mt-2 text-3xl font-bold text-green-600">{totalOrders?.OK || 0}</p>
            </a>
          </div>
          <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
            <a href="/orders">
              <h2 className="text-lg font-semibold ">Pedidos Pendentes</h2>
              <p className="mt-2 text-3xl font-bold text-yellow-600">{totalOrders?.PENDENTE || 0}</p>
            </a>
          </div>
          <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
            <a href="/orders">
              <h2 className="text-lg font-semibold ">Pedidos Cancelados</h2>
              <p className="mt-2 text-3xl font-bold text-red-600">{totalOrders?.CANCELADO || 0}</p>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
            <a href="/parts">
              <h2 className="text-lg font-semibold ">Total de Peças</h2>
              <p className="mt-2 text-3xl font-bold text-cyan-600">{totalParts || 0}</p>
            </a>
          </div>
          <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
            <a href="/customers">
              <h2 className="text-lg font-semibold ">Total de Clientes</h2>
              <p className="mt-2 text-3xl font-bold text-green-600">{totalCustomers || 0}</p>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="box-rounded max-h-145 shadow-md sm:rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold mb-4">Últimas Peças Cadastradas</h2>
            <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 rounded">
                <tr>
                  <th className="border-b py-2 w-45">Data</th>
                  <th className="border-b py-2 w-30">Código</th>
                  <th className="border-b py-2">Descrição</th>
                </tr>
              </thead>
              <tbody >
                {lastParts.map((part) => (
                  <tr key={part.cod} className="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200 dark:text-white">
                    <td className="p-2">{part.date.toString()}</td>
                    <td className="p-2">{part.cod}</td>
                    <td className="p-2">{part.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="box-rounded max-h-145 shadow-md sm:rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold mb-4">Últimos Clientes Cadastrados</h2>
            <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 rounded">
                <tr>
                  <th className="border-b py-2 w-45">Data</th>
                  <th className="border-b py-2 w-60">Nome</th>
                  <th className="border-b py-2">Vendedor</th>
                </tr>
              </thead>
              <tbody >
                {lastCustomers.map((customer) => (
                  <tr key={customer.name} className="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200 dark:text-white">
                    <td className="p-2">{customer.date.toString()}</td>
                    <td className="p-2">{customer.name}</td>
                    <td className="p-2">{customer.seller}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
