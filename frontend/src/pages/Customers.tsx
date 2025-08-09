import { RefreshCcw, SquarePen, Trash } from "lucide-react";
import { deleteCustomer, getAllCustomers, getCustomerByCnpj, type Customer } from "../services/customer.api";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CreateCustomer from "../components/Forms/CreateCustomer";
import UpdateCustomer from "../components/Forms/UpdateCustomer";

function Customers() {
  const [formVisible, setFormVisible] = useState(false);
  const [customers, setCustomer] = useState<Customer[]>([]);
  const [editVisible, setEditVisible] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);
  
  
    function displayCreateCustomerForm() {
    setFormVisible(true)
  }
    function closeCreateCustomerForm() {
    clickGetAllCustomer()
    setFormVisible(false)
  }
  function displayEditCustomerForm(customerData: Customer) {
     setCustomerToEdit(customerData);
     setEditVisible(true);
   }
  function closeEditCustomerForm(){
    setEditVisible(false)
    console.log(editVisible)
    setCustomerToEdit(null)
    clickGetAllCustomer()
  }
  function handleEdit(customerData:Customer){
    displayEditCustomerForm(customerData)
  }
  
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

    async function handleDelete(cellValue: string) {
      const cell = cellValue;
      const cod = cellValue.replace("/", "%2F")
      const item = await getCustomerByCnpj(cod)
      if (confirm(`Tem certeza que deseja deletar o cliente ${cell}!`) == true) {
        try {
          const response = await deleteCustomer(item[0]._id as string);
          if (response == "Error on deleteCustomer") {
            return alert("Erro! Não foi possível encontrar cliente com este CNPJ/CPF!")
          }
          clickGetAllCustomer()
          return alert(`Cliente ${cell} Deletado com Sucesso!`)
        } catch (err) {
          console.error('Erro ao deletar Cliente:', err);
        }
      } else {
      }
    }

  return (
        <div className="space-y-2">
        {formVisible && <CreateCustomer closeForm={closeCreateCustomerForm} />}
        {editVisible && customerToEdit && (
        <UpdateCustomer customer={customerToEdit} closeForm={closeEditCustomerForm} />
      )}

        <Header>Clientes</Header>
        <div className="space-y-6 p-4">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
          <h2 className="text-lg font-semibold">Total de Clientes</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">{customers.length}</p>
        </div>
      </div>
            <div className="flex">
      <button
      onClick={displayCreateCustomerForm}
      className="button block w-fit py-2 px-4 rounded">Cadastrar
      </button> 
      <button
        onClick={clickGetAllCustomer}
        className="button block ml-auto w-fit py-2 px-4 rounded"
      ><RefreshCcw size={20}/>
      </button>
      </div>
    <div className="flex box-rounded max-h-145 overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
      <table id="customer-table" className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 rounded">
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
            <th className="border-b p-2"></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.cnpj} className="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200 dark:text-white">
              <td className="p-3">{customer.name}</td>
              <td className="p-3">{customer.address}</td>
              <td className="p-3">{customer.district}</td>
              <td className="p-3">{customer.city}</td>
              <td className="p-3">{customer.state}</td>
              <td className="p-3">{customer.cep}</td>
              <td className="p-3">{customer.cnpj}</td>
              <td className="p-3">{customer.ie}</td>
              <td className="p-3">{customer.phone}</td>
              <td className="p-3">{customer.seller}</td>
              <td className="flex p-3 w-18">
                    <button 
                    onClick={() =>
                      handleEdit({
                        name: customer.name,
                        address: customer.address,
                        district: customer.district,
                        city: customer.city,
                        state: customer.state,
                        cep: customer.cep,
                        cnpj: customer.cnpj,
                        ie: customer.ie,
                        phone: customer.phone,
                        seller: customer.seller,
                      })} 
                      className="bg-green-700 hover:bg-green-900 hover:cursor-pointer text-white w-fit p-1 rounded-md -ml-5 "><SquarePen /></button>
                    <button onClick={() => handleDelete(customer.cnpj)} className="bg-red-700 hover:bg-red-900 hover:cursor-pointer text-white w-fit p-1 rounded-md ml-1 -mr-5 "><Trash /></button>
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
export default Customers;
