import { SquareX } from 'lucide-react';
import React from 'react'

function CreatePart(props:any) {

  return (
    <div id='form-create-part' className='fixed inset-0 bg-black/30 flex items-center justify-center'>
    <form className="bg-white flex max-w-md min-w-90 flex-col gap-4 p-10 rounded-md items-center">
      <button className='bg-amber-700 text-white hover:bg-amber-800 w-fit ml-auto p-1 rounded-sm -mr-8 -mt-8' onClick={props.closeForm}> <SquareX /></button>
      <div className='grid w-full items-center'>
        <div className="block mb-1">
          <label htmlFor="cod">Cod:</label>
        </div>
        <input
          className='bg-gray-200 border-1 p-1 rounded-sm mb-2 '
          id="cod"
          name='cod'
          placeholder="000/000"
          required />
        <div className="block mb-1">
          <label htmlFor="name">Descrição:</label>
        </div>
        <input className='bg-gray-200 border-1 p-1 rounded-sm mb-2' id="name" name='name' placeholder="name" />
        <div className="block mb-1">
          <label htmlFor="dist-value">Valor Dist.:</label>
        </div>
        <input className='bg-gray-200 border-1 p-1 rounded-sm mb-2' id="dist-value" name='dist-value' placeholder="0.0" />
                <div className="block mb-1">
          <label htmlFor="dist-value">Valor Lojista.:</label>
        </div>
        <input className='bg-gray-200 border-1 p-1 rounded-sm mb-2' id="dist-value" name='dist-value' placeholder="0.0" />
                <div className="block mb-1">
          <label htmlFor="dist-value">Custo:</label>
        </div>
        <input className='bg-gray-200 border-1 p-1 rounded-sm mb-2' id="dist-value" name='dist-value' placeholder="0.0" />
      </div>
      <button className='block mx-auto w-fit bg-amber-700 hover:bg-amber-800 text-gray-100 font-bold py-2 px-4 rounded' type="submit">Finalizar</button>
    </form>
    </div>
  );
}

export default CreatePart