import { SquareX } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getAllParts, getPartByCod } from '../../services/part.api';
import type { PartOrder } from '../../services/order.api';

function CreateOrderPart({ closeForm }: { closeForm: () => void }) {
  const [orderPart, setOrderPart] = useState<PartOrder[]>([])
  const [formData, setFormData] = useState<PartOrder>({
    part: {
      _id: "",
      cod: "",
      description: "",
      unit: ""
    },
    quantidade: 0,
    statusItem: "",
    precoUnitario: 0
  })


  async function handleSelect(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
  const { name,value } = e.target;

  if (name === "cod" || name === "unit" || name === "description" || name === "_id") {
    setFormData((prev) => ({
      ...prev,
      part: {
        ...prev.part,
        [name]: value, 
      },
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  if (name === "cod") {
    const response = await getPartByCod(value.replace("/", "%2F"));
    const partData = response[0];

    setFormData((prev) => ({
      ...prev,
      part: {
        ...prev.part,
        cod: value,
        unit: partData.unit,
        description: partData.description,
        _id: partData.id,
      },
      precoUnitario: partData.storeValue,
    }));
  }
}

  useEffect(() => {
    getAllParts()
      .then((data) => {
        let response: PartOrder[] = []
        for (let i = 0; i < data.length; i++) {
          let partOrderData: PartOrder = {
            part: {
              _id: data[i].id,
              cod: data[i].cod,
              description: data[i].description,
              unit: data[i].unit
            },
            quantidade: 0,
            statusItem: "OP",
            precoUnitario: 0
          }
          response.push(partOrderData)
        }
        setOrderPart(response)
      })
      .catch((err) => {
        console.error("Failed to fetch part", err);
      });
  }
    , []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem('item', JSON.stringify([formData]))
    closeForm();
    return;
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
            <select
              className="bg-gray-200 dark:bg-gray-600 border-1 p-1 rounded-sm mb-2 dark:disabled:bg-gray-900 dark:disabled:text-gray-700"
              id="cod"
              name="cod"
              value={formData.part.cod}
              onChange={handleSelect}
              required
            >
              <option value="default"></option>
              {orderPart.map((part) => {
                return <option value={part.part.cod}>{part.part.cod} - {part.part.description}</option>
              })}
            </select>

            <div className="block mb-1">
              <label htmlFor="unit">Unidade:</label>
            </div>
            <input
              className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
              id="unit"
              name="unit"
              value={formData.part.unit}
              onChange={handleSelect}
              placeholder="Unidade"
              disabled
            />
            
            <div className="block mb-1">
              <label htmlFor="statusItem">Status:</label>
            </div>
            <select
              className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
              id="statusItem"
              name="statusItem"
              value={formData.statusItem}
              onChange={handleSelect}
            >
              <option value="default"></option>
              <option value="OP">OP</option>
              <option value="ESTOQUE">ESTOQUE</option>
            </select>

            <div className="block mb-1">
              <label htmlFor="precoUnitario">Preço Unitário:</label>
            </div>
            <input
              className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
              id="precoUnitario"
              name="precoUnitario"
              type='number'
              onChange={handleSelect}
              placeholder="0.0"
            />

            <div className="block mb-1">
              <label htmlFor="quantidade">Quantidade:</label>
            </div>
            <input
              className="bg-gray-200 border-1 dark:bg-gray-600 p-1 rounded-sm mb-2"
              id="quantidade"
              name="quantidade"
              type='number'
              onChange={handleSelect}
              placeholder="0"
            />
          </div>

          <button className="button block mx-auto w-fit py-2 px-4" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateOrderPart;
