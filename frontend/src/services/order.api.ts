import { api } from './api.main';

export interface Order {
    _id : string;
    numeroPedido : string;
    customerId : {
        _id : string;
        name : string;
        address : string;
        district : string;
        city : string;
        state : string;
        cep : string;
        cnpj : string;
        ie : string;
        phone : string;
    }
    createdAt : string;
    prazoEntrega : string;
    status : string;
    valorTotal : string;
    observacoes : string;
    parts : PartOrder[]
}

export interface PartOrder {
    part : {
        _id : string;
        cod : string;
        description : string;
        unit : string
    },
    quantidade : number
    statusItem : string;
    precoUnitario : number
}
export interface CounterOrder {
    total : string;
    OK : string;
    PENDENTE : string;
    CANCELADO : string;
}

export interface OrderNumDateCustomer {
    createdAt: string
    numeroPedido: string
    customerName: string
}



export async function getAllOrders(): Promise<Order[]> {
    return api.get('/order')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return "Error on getAllOrders";
        });
}

export async function getTotalNumberOfOrders(): Promise<CounterOrder> {
    return api.get('/order/count')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return "Error on getTotalOrders";
        });
}

export async function getLastCreatedOrders(): Promise<OrderNumDateCustomer[][]> {
    return api.get('/order')
        .then(function (response) {
            const arrayResponse = response.data;
            const orderedArray = [];
            for (let i = 0; i < arrayResponse.length; i++) {
                let date = new Date(arrayResponse[i].createdAt)
                let pedido = arrayResponse[i].numeroPedido;
                let customerName = arrayResponse[i].customerId.name
                orderedArray.push([date, pedido, customerName])
            }
            let myNewArray = orderedArray.sort((a, b) => b[0] - a[0]);
            let responseArray = []
            for (let i = 0; i < 5 && i < myNewArray.length; i++) {
                responseArray.push(myNewArray[i])
            }
            return responseArray;
        })
}

export async function getOrderById(id: string) {
    return api.get('/order/' + id)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return "Error on getOrderById"
        })
}

export async function getOrderByNum(numeroPedido: string) {
    return api.get('/order/numeroPedido/' + numeroPedido)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return "Error on getOrderByNum"
        })
}

export async function createOrder(data: Order) {
    return api.post('/order', data)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return "Error on createOrder"
        })

}

export async function deleteOrder(id: string) {
    return api.delete('/order/' + id)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return "Error on deleteOrder"
        })

}

export async function editOrder(id: string, data: Order) {
    return api.patch('/order/' + id, data)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return "Error on createOrder"
        })

}