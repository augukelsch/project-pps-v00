import { Ban, CirclePlus } from "lucide-react"
import Header from "../components/Header"
import { getLastCreatedOrders, type OrderNumDateCustomer, type PartOrder } from "../services/order.api"
import { useEffect, useState } from "react"
import { getAllCustomers, type Customer } from "../services/customer.api";
import CreateOrderPart from "../components/Forms/CreateOrderPart";

function CreateOrders() {
  const [lastOrders, setLastOrders] = useState<OrderNumDateCustomer[]>([]);
  const [partList, setPartList] = useState<PartOrder[]>([])
  const [formVisible, setFormVisible] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([])
  const [formData, setFormData] = useState({
    numeroPedido: "",
    customerId: "",
    prazoEntrega: Date.now(),
    status: "",
    observacoes: "",
    parts: [
      {
        part: "",
        quantidade: null,
        unidade: "",
        statusItem: "",
        precoUnitario: null
      }
    ],
    hidden: false
  });

   function closeCreatePartForm() {
    setFormVisible(false)
    const data = localStorage.getItem('item')
    if(data){
      const result = JSON.parse(data);
      if(result[0].part){
        if(result[0].part.cod != ''){
          let output = [];
          if(partList.length > 0){
            for (let i = 0; i < partList.length; i++) {
              output.push(partList[i])
            }
          }
          output.push(result[0])
          setPartList(output)
          localStorage.setItem('item','')
        }
      }
    }
  }

  function handleCreateOrder() {
    return console.log("Gerar")
  }

  function handleDelete(): void {
    throw new Error("Function not implemented.")
  }

    useEffect(() => {
      getAllCustomers()
        .then((data) => {
          setCustomers(data);
        })
        .catch((err) => {
          console.error("Failed to fetch customer", err);
        });
    }
    , []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const fieldName = e.target.name as keyof typeof formData;
    const fieldValue = e.target.value;

    console.log('Campo alterado:', fieldName, '→', fieldValue);

    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  }

  useEffect(() => {
    getLastCreatedOrders()
      .then((data) => {
        const formatted = data.map((item: any[]) => ({
          createdAt: new Date(item[0]).toLocaleString("pt-BR"),
          numeroPedido: item[1],
          customerName: item[2]
        })) as unknown as OrderNumDateCustomer[];
        setLastOrders(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch parts", err);
      });
  }, []);


  function handleAddPart(e: React.FormEvent) {
    setFormVisible(true)
    e.preventDefault();
    return
  }

  return (
    <div>
      {formVisible && <CreateOrderPart closeForm={closeCreatePartForm} />}
      <Header>Gerar Pedido</Header>
      <div className="space-y-6 p-4">


        <div className="grid grid-cols-1 gap-6">
          <form onSubmit={handleCreateOrder} className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
            <div className="box-rounded bg-gray-800">
              <div> 
                <h2 className="text-xl mb-3">Dados do Pedido</h2>
              </div>

              <div className="grid grid-cols-2 gap-x-4">

                <div className="grid space-y-1">
                  <label
                    className="font-light"
                    htmlFor="numeroPedido">
                    Número Pedido:
                  </label>
                  <input
                    className="bg-gray-200 dark:bg-gray-600 border-1 p-1 rounded-sm mb-2"
                    id="numeroPedido"
                    name="numeroPedido"
                    value={formData.numeroPedido}
                    onChange={handleChange}
                    placeholder="000000"
                  />
                </div>
                <div className="grid space-y-1">
                  <label
                    className="font-light"
                    htmlFor="customerId">
                    Cliente:
                  </label>
                  <select 
                    className="bg-gray-200 dark:bg-gray-600 border-1 p-1 rounded-sm mb-2"
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
                    >
                      {customers.map((customer)=>{
                        return <option value={customer._id}>{customer.name}</option>
                      })}
                  </select>
                </div>
                <div className="grid space-y-1">
                  <label
                    className="font-light"
                    htmlFor="prazoEntrega">
                    Prazo de Entrega:
                  </label>
                  <input
                    type="date"
                    className="bg-gray-200 dark:bg-gray-600 border-1 p-1 rounded-sm mb-2"
                    id="prazoEntrega"
                    name="prazoEntrega"
                    value={formData.prazoEntrega}
                    onChange={handleChange}
                    
                  />
                </div>
                <div className="grid space-y-1">
                  <label
                    className="font-light"
                    htmlFor="status">
                    Status:
                  </label>
                  <select
                    className="bg-gray-200 dark:bg-gray-600 border-1 p-1 rounded-sm mb-2"
                    id="status"
                    name="status"
                    value={formData.status}
                  >
                      <option value="pendente">PENDENTE</option>
                      <option value="ok">OK</option>
                      <option value="cancelado">CANCELADO</option>
                  </select>
                </div>


              </div>
              <div className="grid space-y-1">
                <label
                  className="font-light"
                  htmlFor="observacoes">
                  Observações:
                </label>
                <textarea
                  className="bg-gray-200 dark:bg-gray-600 border-1 p-1 rounded-sm mb-2 min-h-20 max-h-50 text-sm"
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  placeholder="Obs."
                />
              </div>
              
              <div className="border-t-2 mt-3 border-gray-600">
                <div className="mt-4 flex gap-2 items-center justify-between">
                  <h2>Lista de Peças:</h2>
                  <div className="flex justify-end gap-2 items-center ">
                  <h2>Adicionar Peça:</h2>
                  <button onClick={handleAddPart} className="button block w-fit py-2 px-4 rounded"><CirclePlus /></button>
                  </div>
                </div>
                  <table className="w-full text-sm mt-2 text-left rtl:text-right text-gray-800 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 rounded">
                      <tr>
                        <th className="border-b py-2">Descrição</th>
                        <th className="border-b py-2">Quantidade</th>
                        <th className="border-b py-2">Unidade</th>
                        <th className="border-b py-2">Status</th>
                        <th className="border-b py-2">Preço</th>
                      </tr>
                    </thead>
                    <tbody >
                      {partList.map((part) => (
                        <tr key={part.part._id} className="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200 dark:text-white">
                          <td className="p-2">{`${part.part.cod} - ${part.part.description}`}</td>
                          <td className="p-2">{part.quantidade}</td>
                          <td className="p-2">{part.part.unit}</td>
                          <td className="p-2">{part.statusItem}</td>
                          <td className="p-2">{part.precoUnitario}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </div>

            </div>
            <div className="flex justify-end gap-3 mt-5 mr-5">
              <button onClick={handleCreateOrder} className="button block w-fit py-2 px-4 rounded">Salvar Pedido</button>
              <button onClick={handleDelete} className="flex items-center justify-center gap-2 bg-red-700 hover:bg-red-900 hover:cursor-pointer text-white w-fit p-2 rounded-md ml-1 -mr-5 "><Ban />Cancelar</button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
            <h2 className="items-center text-center">Últimos pedidos Gerados</h2>
            <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 rounded">
                <tr>
                  <th className="border-b py-2 w-45">Data</th>
                  <th className="border-b py-2 w-45">Número pedido</th>
                  <th className="border-b py-2">Cliente</th>
                </tr>
              </thead>
              <tbody >
                {lastOrders.map((order) => (
                  <tr key={order.numeroPedido} className="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200 dark:text-white">
                    <td className="p-2">{order.createdAt}</td>
                    <td className="p-2">{order.numeroPedido}</td>
                    <td className="p-2">{order.customerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateOrders