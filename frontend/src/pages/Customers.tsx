import { RefreshCcw } from "lucide-react";
import { getAllCustomers, type Customer } from "../services/customer.api";
import { useEffect, useState } from "react";
import Header from "../components/Header";

function Customers() {
  const [customers, setCustomer] = useState<Customer[]>([]);

  useEffect(() => {
    getAllCustomers()
      .then((data) => {
        if (!data || data.length < 1) return;
        setCustomer(data);
      })
      .catch((err) => {
        console.error("Failed to fetch customer", err);
      });
  }, []);

  function clickGetAllCustomer() {
    getAllCustomers()
      .then((data) => {
        if (!data || data.length < 1) return;
        setCustomer(data);
      })
      .catch((err) => {
        console.error("Failed to fetch customer", err);
      });
  }

  return (
        <div className="space-y-2">
        <Header>Clientes</Header>
        <div className="space-y-6 p-4">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total de Clientes</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">{customers.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700">Pedidos Pendentes</h2>
          <p className="mt-2 text-3xl font-bold text-red-600">7</p>
        </div>
      </div>
            <div className="flex">
      <button
      className="block w-fit bg-amber-700 hover:bg-amber-800 hover:cursor-pointer text-gray-100 font-semibold py-2 px-4 rounded">Cadastrar
      </button> 
      <button
        onClick={clickGetAllCustomer}
        className="block ml-auto w-fit bg-amber-700 hover:bg-amber-800 text-gray-100 font-bold py-2 px-4 rounded"
      ><RefreshCcw size={20}/>
      </button>
      </div>
    <div className="bg-white shadow rounded-xl overflow-scroll p-6 max-w-full max-h-145">
      <table id="customer-table" className="w-full text-left text-gray-800">
        <thead>
          <tr>
            <th className="border-b p-2">Cliente</th>
            <th className="border-b p-2">Endereço</th>
            <th className="border-b p-2">Bairro</th>
            <th className="border-b p-2">Cidade</th>
            <th className="border-b p-2">UF</th>
            <th className="border-b p-2">CEP</th>
            <th className="border-b p-2">CNPJ/CPF</th>
            <th className="border-b p-2">IE</th>
            <th className="border-b p-2">Fone</th>
            <th className="border-b p-2">Vendedor</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.name.length} className="border-b">
              <td className="p-2">{customer.name}</td>
              <td className="p-2">{customer.address}</td>
              <td className="p-2">{customer.district}</td>
              <td className="p-2">{customer.city}</td>
              <td className="p-2">{customer.state}</td>
              <td className="p-2">{customer.cep}</td>
              <td className="p-2">{customer.cnpj}</td>
              <td className="p-2">{customer.ie}</td>
              <td className="p-2">{customer.phone}</td>
              <td className="p-2">{customer.seller}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
}
export default Customers;
