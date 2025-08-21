import { SquareX } from 'lucide-react';
import React, { useState } from 'react';
import { createPart, type Part } from '../../services/part.api';

function CreatePart(props: any) {
  const [formData, setFormData] = useState({
    cod: '',
    description: '',
    unit: 'UN',
    distributionValue: 0,
    storeValue: 0,
    cost: 0,
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
    e.preventDefault();

    const payload: Part = {
      ...formData,
      id: ''
    };

    try {
      const response = await createPart(payload as Part);
      if(response == "Error on createPart"){
        return alert("Erro! Produto já existe!")
      }
      return alert("Produto Cadastrado com Sucesso!")
    } catch (err) {
      console.error('Erro ao criar parte:', err);
    }
  }

  return (
    <div id="form-create-part" className="transition delay-150 duration-1000 ease-in-out fixed inset-0 bg-black/30 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-200 dark:bg-gray-900 flex max-w-md min-w-110 flex-col gap-1 p-3 rounded-md items-center shadow-2xl shadow-black">
        <button type="button" className="button ml-auto p-1 rounded-sm" onClick={props.closeForm}>
          <SquareX />
        </button>
        <div className='bg-gray-100 dark:bg-gray-800 rounded-md min-w-80 p-5 dark:text-gray-100 text-gray-900'>

        <div className="grid w-full items-center">
          <div className="block mb-1">
            <label htmlFor="cod">Cod:</label>
          </div>
          <input
            className="bg-gray-200 dark:bg-gray-600 border-1 rounded-sm mb-2"
            id="cod"
            name="cod"
            value={formData.cod}
            onChange={handleChange}
            placeholder="000/000"
            required
          />

          <div className="block mb-1">
            <label htmlFor="description">Descrição:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 rounded-sm mb-2"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição"
          />
          
          <div className="block mb-1">
            <label htmlFor="unit">Unidade:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="Unidade"
          />

          <div className="block mb-1">
            <label htmlFor="distributionValue">Valor Dist.:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
            id="distributionValue"
            name="distributionValue"
            type='number'
            value={formData.distributionValue}
            onChange={handleChange}
            placeholder="0.0"
          />

          <div className="block mb-1">
            <label htmlFor="storeValue">Valor Lojista:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
            id="storeValue"
            name="storeValue"
            type='number'
            value={formData.storeValue}
            onChange={handleChange}
            placeholder="0.0"
          />

          <div className="block mb-1">
            <label htmlFor="cost">Custo:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
            id="cost"
            name="cost"
            type='number'
            value={formData.cost}
            onChange={handleChange}
            placeholder="0.0"
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

export default CreatePart;
