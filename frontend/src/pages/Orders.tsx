import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { CircleCheck, CircleEllipsis, CircleX, RefreshCcw, SquarePen, Trash } from 'lucide-react'
import { getAllOrders, getTotalNumberOfOrders, type Order, type PartOrder, type CounterOrder } from '../services/order.api';

function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalOrders, setTotalOrders] = useState<CounterOrder>()
0
    useEffect(() => {
      getAllOrders().then((data)=>{
        setOrders(data)
            return data;
        }).catch((err)=>{
            return err.message;
        })
    },[])
    useEffect(() => {
      getTotalNumberOfOrders().then((data)=>{
        setTotalOrders(data)
            return data;
        }).catch((err)=>{
            return err.message;
        })
    },[])

    function clickGetAllOrders() {
        getAllOrders().then((data)=>{
            return data;
        }).catch((err)=>{
            return err.message
        })
    }
    

    function jumpToCreateOrder(e:any){
        e.preventDefault();
        return window.location.pathname = '/orders/create'
    }

    function handleEdit(){
        throw new Error('Function not implemented.')
    }

    function handleDelete(){
        throw new Error('Function not implemented.')
    }

    return (
        <div className="space-y-2">
            <Header>Pedidos</Header>
            <div className="space-y-6 p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
                        <h2 className="text-lg font-semibold">Total de Pedidos</h2>
                        <p className="mt-2 text-3xl font-bold text-blue-600">{totalOrders?.total || 0}</p>
                    </div>
                    <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
                        <h2 className="text-lg font-semibold">OK</h2>
                        <p className="mt-2 text-3xl font-bold text-green-600">{totalOrders?.OK || 0}</p>
                    </div>
                    <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
                        <h2 className="text-lg font-semibold">Pendentes</h2>
                        <p className="mt-2 text-3xl font-bold text-yellow-600">{totalOrders?.PENDENTE || 0}</p>
                    </div>
                    <div className="box-rounded shadow-2xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
                        <h2 className="text-lg font-semibold">Cancelados</h2>
                        <p className="mt-2 text-3xl font-bold text-red-600">{totalOrders?.CANCELADO || 0}</p>
                    </div>
                </div>
                <div className="flex">
                    <button
                        onClick={jumpToCreateOrder}
                        className="button block w-fit py-2 px-4 rounded cursor-pointer">Gerar Pedido
                    </button>
                    <button
                        onClick={clickGetAllOrders}
                        className="button block ml-auto w-fit py-2 px-4 rounded"
                    ><RefreshCcw size={20} />
                    </button>
                </div>
                <div className="flex box-rounded max-h-145 overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ">
                    <table id="customer-table" className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 rounded">
                            <tr>
                                <th className="border-b p-2">Nº Pedido</th>
                                <th className="border-b p-2">Total de Items</th>
                                <th className="border-b p-2">Items   -  (Cod / Descrição / Qtd)</th>
                                <th className="border-b p-2">Valor do Pedido</th>
                                <th className="border-b p-2">Status</th>
                                <th className="border-b p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.numeroPedido} className="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200 dark:text-white  align-top">
                                    <td className="p-3">{order.numeroPedido}</td>
                                    <td className="p-3">{order.parts.length}
                                    </td>
                                    <td>
                                        {order.parts.map((part:PartOrder)=>
                                            <tr key={part.part.cod}>
                                                <td className="p-3">{part.part.cod}</td>
                                                <td className="p-3">{part.part.description}</td>
                                                <td className="p-3">{part.quantidade}</td>
                                            </tr>
                                            
                                        )}
                                    </td>
                                    <td className="p-3">{"R$ "+order.valorTotal}</td>
                                    <td className="p-3">{order.status == "OK" ? <CircleCheck className='text-green-600'/> : order.status == "CANCELADO" ? <CircleX className='text-red-600'/>:<CircleEllipsis className='text-yellow-600'/>}</td>
                                    <td className="flex p-2 w-18">
                                        <button
                                            onClick={() =>
                                                handleEdit()}
                                            className="bg-green-700 hover:bg-green-900 hover:cursor-pointer text-white w-fit p-1 rounded-md -ml-5 "><SquarePen /></button>
                                        <button onClick={() => handleDelete()} className="bg-red-700 hover:bg-red-900 hover:cursor-pointer text-white w-fit p-1 rounded-md ml-1 -mr-5 "><Trash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders