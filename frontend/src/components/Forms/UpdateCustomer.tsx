import { SquareX } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getCustomerByCnpj, updateCustomer, type Customer } from '../../services/customer.api';

function UpdateCustomer({ customer, closeForm }: { customer: Customer, closeForm: () => void }) {
  
    useEffect(() => {
      setFormData(customer);
    }, [customer]);
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    district: "",
    city: "",
    state: "",
    cep: "",
    cnpj: "",
    ie: "",
    phone: "",
    seller: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = e.target.name as keyof typeof formData;
    const fieldValue = e.target.value;

    console.log('Campo alterado:', fieldName, '→', fieldValue);

    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const CNPJ = customer.cnpj.replace('/','%2F')
    const customerToChange = await getCustomerByCnpj(CNPJ);
    const payload: Customer = {
      ...formData,
    };

    try {
      const response = await updateCustomer(customerToChange[0]._id,payload as Customer);
      if(response == "Error on updateCustomer"){
        return alert("Erro! Cliente já existe!")
      }
      alert("Cliente Alterado com Sucesso!")
      closeForm()
    } catch (err) {
      console.error('Erro ao alterar Customer:', err);
    }
  }

  return (
    <div id="form-update-customer" className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-200 dark:bg-gray-900 flex max-w-md min-w-110 flex-col gap-1 p-3 rounded-md items-center shadow-2xl shadow-black">
        <button type="button" className="button ml-auto p-1 rounded-sm" onClick={closeForm}>
          <SquareX />
        </button>
        <div className='bg-gray-100 dark:bg-gray-800 rounded-md min-w-80 p-5 dark:text-gray-100 text-gray-900'>

        <div className="grid w-full items-center">
          <div className="block mb-1">
            <label htmlFor="name">Cliente:</label>
          </div>
          <input
            className="bg-gray-200 dark:bg-gray-600 border-1 p-1 rounded-sm mb-2"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
          />

          <div className="block mb-1">
            <label htmlFor="address">Endereço:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Rua Exemplo, 42"
          />
          
          <div className="block mb-1">
            <label htmlFor="district">Bairro:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Bairro"
          />

          <div className="block mb-1">
            <label htmlFor="city">Cidade:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
            id="city"
            name="city"
            type='string'
            value={formData.city}
            onChange={handleChange}
            placeholder="Cidade"
          />

          <div className="block mb-1">
            <label htmlFor="state">UF:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
            id="state"
            name="state"
            type='string'
            value={formData.state}
            onChange={handleChange}
            placeholder="AM"
          />
          <div className="block mb-1">
            <label htmlFor="cep">CEP:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
            id="cep"
            name="cep"
            type='string'
            value={formData.cep}
            onChange={handleChange}
            placeholder="93000-000"
          />
         <div className="block mb-1">
            <label htmlFor="cnpj">CNPJ/CPF:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2 dark:disabled:bg-gray-900 dark:disabled:text-gray-700"
            id="cnpj"
            name="cnpj"
            type='string'
            value={formData.cnpj}
            onChange={handleChange}
            placeholder="00.000.000/0001-00"
            required
            disabled
          />
                    <div className="block mb-1">
            <label htmlFor="ie">IE:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2 dark:disabled:bg-gray-900 dark:disabled:text-gray-700"
            id="ie"
            name="ie"
            type='string'
            value={formData.ie}
            onChange={handleChange}
            placeholder="000000000000"
            required
            disabled
          />
                    <div className="block mb-1">
            <label htmlFor="phone">Fone:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
            id="phone"
            name="phone"
            type='string'
            value={formData.phone}
            onChange={handleChange}
            placeholder="(51)0000-0000"
          />
                              <div className="block mb-1">
            <label htmlFor="seller">Vendedor:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
            id="seller"
            name="seller"
            type='string'
            value={formData.seller}
            onChange={handleChange}
            placeholder="Nome"
          />
        </div>


        <button className="button block mx-auto w-fit py-2 px-4" type="submit">
          Finalizar
        </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCustomer;
