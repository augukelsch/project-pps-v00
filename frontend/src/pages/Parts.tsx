import { getAllParts, type Part } from "../services/part.api";
import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import Header from "../components/Header";
import CreatePart from "../components/Forms/CreatePart";

function Parts() {
  const [parts, setParts] = useState<Part[]>([]);
  const [formVisible, setFormVisible] = useState(false);



  useEffect(() => {
    getAllParts()
      .then((data) => {
        if (!data || data.length < 1) return;
        setParts(data);
      })
      .catch((err) => {
        console.error("Failed to fetch parts", err);
      });
  }, []);

  function clickGetAllParts() {
    getAllParts()
      .then((data) => {
        if (!data || data.length < 1) return;
        setParts(data);
      })
      .catch((err) => {
        console.error("Failed to fetch parts", err);
      });
  }

  function displayCreatePartForm() {
    setFormVisible(true)
  }
    function closeCreatePartForm() {
    setFormVisible(false)
  }


  return (

    <div className="space-y-2">
    {formVisible && <CreatePart closeForm={closeCreatePartForm} />}
    <Header>Peças e Produtos</Header>
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total de Peças</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">{parts.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700">Clientes Ativos</h2>
          <p className="mt-2 text-3xl font-bold text-green-600">58</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700">Pedidos Pendentes</h2>
          <p className="mt-2 text-3xl font-bold text-red-600">7</p>
        </div>
      </div>
      <div className="flex">
      <button onClick={displayCreatePartForm}
      className="block w-fit bg-amber-700 hover:bg-amber-800 hover:cursor-po text-gray-100 font-semibold py-2 px-4 rounded">Cadastrar
      </button> 
      <button
        onClick={clickGetAllParts}
        className="block ml-auto w-fit bg-amber-700 hover:bg-amber-800 text-gray-100 font-bold py-2 px-4 rounded"
      ><RefreshCcw size={20}/>
      </button>
      </div>

    <div className="bg-white shadow rounded-xl p-6 max-h-145 overflow-y-scroll">
      <table id="parts-table" className="w-full text-left text-gray-800">
        <thead>
          <tr>
            <th className="border-b p-2">Cod</th>
            <th className="border-b p-2">Descrição</th>
            <th className="border-b p-2">Valor Dist.</th>
            <th className="border-b p-2">Valor Lojista</th>
            <th className="border-b p-2">Custo</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.cod} className="border-b">
              <td className="p-2">{part.cod}</td>
              <td className="p-2">{part.description}</td>
              <td className="p-2">{part.distributionValue}</td>
              <td className="p-2">{part.storeValue}</td>
              <td className="p-2">{part.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
}

export default Parts;
