import { SquareX } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {  editPart, getPartByCod, type Part } from '../../services/part.api';

function UpdatePart({ part, closeForm }: { part: Part, closeForm: () => void }) {
  const [formData, setFormData] = useState(part);

  useEffect(() => {
    setFormData(part);
  }, [part]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = e.target.name as keyof Part;
    let value: any = e.target.value;

    if (["distributionValue", "storeValue", "cost"].includes(fieldName))
      value = Number(value);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cod = formData.cod.replace("/","%2F")

    const item = await getPartByCod(cod)
    try {
      if(item.length<1){
        return alert("Cod do item foi alterado, verifique novamente!")
      }
      const response = await editPart(item[0]._id, formData);
      if (response === "Error on createPart") {
        return alert("Erro! Produto já existe!");
      }
      alert("Produto atualizado com sucesso!");
      closeForm();
    } catch (err) {
      console.error("Erro ao atualizar parte:", err);
    }
  }

  return (
    <div id="form-create-part" className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-200 dark:bg-gray-900 flex max-w-md min-w-110 flex-col gap-1 p-3 rounded-md items-center shadow-2xl shadow-black">
        <button type="button" className="button ml-auto p-1 rounded-sm" onClick={closeForm}>
          <SquareX />
        </button>
        <div className='bg-gray-100 dark:bg-gray-800 rounded-md min-w-80 p-5 dark:text-gray-100 text-gray-900'>

        <div className="grid w-full items-center">
          <div className="block mb-1">
            <label htmlFor="cod">Cod:</label>
          </div>
          <input
            className="bg-gray-200 dark:bg-gray-600 border-1 p-1 rounded-sm mb-2 dark:disabled:bg-gray-900 dark:disabled:text-gray-700"
            id="cod"
            name="cod"
            value={formData.cod}
            onChange={handleChange}
            placeholder="000/000"
            disabled
            required
          />

          <div className="block mb-1">
            <label htmlFor="description">Descrição:</label>
          </div>
          <input
            className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
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

export default UpdatePart;
