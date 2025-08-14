import { deletePart, getAllParts, getPartByCod, getTotalNumberOfParts, type Part } from "../services/part.api";
import { useEffect, useState } from "react";
import { RefreshCcw, SquarePen, Trash } from "lucide-react";
import Header from "../components/Header";
import CreatePart from "../components/Forms/CreatePart";
import UpdatePart from "../components/Forms/UpdatePart";

function Parts() {
  const [formVisible, setFormVisible] = useState(false);
  const [totalParts , setTotalParts] = useState(0)
  const [parts, setParts] = useState<Part[]>([]);
  const [editVisible, setEditVisible] = useState(false);
  const [partToEdit, setPartToEdit] = useState<Part | null>(null);

  function displayCreatePartForm() {
    setFormVisible(true)
  }
  function closeCreatePartForm() {
    setFormVisible(false)
    clickGetAllParts()
  }
  function displayEditPartForm(partData: Part) {
    setPartToEdit(partData);
    setEditVisible(true);
  }
  function closeEditPartForm() {
    setEditVisible(false);
    setPartToEdit(null);
    clickGetAllParts();
  }
  function handleEdit(partData: Part) {
    displayEditPartForm(partData);
  }

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
  
  useEffect(() => {
    getTotalNumberOfParts()
      .then((data) => {
        if (!data || data < 1) return;
        setTotalParts(data);
      })
      .catch((err) => {
        console.error("Failed to fetch parts", err);
      });
  }, []);

  function clickGetAllParts() {
    getAllParts()
      .then((data) => {
        if (!data || data.length < 1) return;
        setTotalParts(data.length)
        setParts(data);
      })
      .catch((err) => {
        console.error("Failed to fetch parts", err);
      });
  }

  
  async function handleDelete(cellValue: string) {
    const cell = cellValue;
    const cod = cellValue.replace("/", "%2F")
    const item = await getPartByCod(cod)
    if (confirm(`Tem certeza que deseja deletar o item ${cell}!`) == true) {
      try {
        const response = await deletePart(item[0]._id as string);
        if (response == "Error on deletePart") {
          return alert("Erro! Não foi possível encontrar item com este ID!")
        }
        clickGetAllParts()
        return alert(`Produto ${cell} Deletado com Sucesso!`)
      } catch (err) {
        console.error('Erro ao criar parte:', err);
      }
    } else {
    }
  }
  


  return (

    <div className="space-y-2">
      {formVisible && <CreatePart closeForm={closeCreatePartForm} />}
      {editVisible && partToEdit && (
        <UpdatePart part={partToEdit} closeForm={closeEditPartForm} />
      )}

      <Header>Peças e Produtos</Header>
      <div className="space-y-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
            <h2 className="text-lg font-semibold">Total de Peças</h2>
            <p className="mt-2 text-3xl font-bold text-blue-600">{totalParts}</p>
          </div>
        </div>
        <div className="flex">
          <button onClick={displayCreatePartForm}
            className="button block w-fit py-2 px-4">Cadastrar
          </button>
          <button
            onClick={clickGetAllParts}
            className="button block ml-auto w-fit py-2 px-4"
          ><RefreshCcw size={20} />
          </button>
        </div>

        <div className="flex scrollbar-track-blue-100 box-rounded max-h-145 overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
          <table id="parts-table" className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 rounded">
              <tr>
                <th className="border-b p-2">Cod</th>
                <th className="border-b p-2">Descrição</th>
                <th className="border-b p-2">Valor Dist.</th>
                <th className="border-b p-2">Valor Lojista</th>
                <th className="border-b p-2">Custo</th>
                <th className="border-b p-2"> </th>
              </tr>
            </thead>
            <tbody>
              {parts.map((part) => (
                <tr key={part.cod} className="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200 dark:text-white">
                  <td className="p-1">{part.cod}</td>
                  <td className="p-1">{part.description}</td>
                  <td className="p-1">{part.distributionValue}</td>
                  <td className="p-1">{part.storeValue}</td>
                  <td className="p-1">{part.cost}</td>
                  <td className="flex p-1 w-14" >
                    <button 
                    onClick={() =>
                      handleEdit({
                        cod: part.cod,
                        description: part.description,
                        unit: "UN",
                        distributionValue: part.distributionValue,
                        storeValue: part.storeValue,
                        cost: part.cost,
                      })} 
                      className="bg-green-700 hover:bg-green-900 hover:cursor-pointer text-white w-fit p-1 rounded-md -ml-5 "><SquarePen /></button>
                    <button onClick={() => handleDelete(part.cod)} className="bg-red-700 hover:bg-red-900 hover:cursor-pointer text-white w-fit p-1 rounded-md ml-1 -mr-5 "><Trash /></button>
                  </td>
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
