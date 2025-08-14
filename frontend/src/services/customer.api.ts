import { api } from './api.main';

export interface Customer {
    name: string;
    address: string;
    district: string;
    city: string;
    state: string;
    cep: string;
    cnpj: string;
    ie: string;
    phone: string;
    seller: string;
}

export interface DateCustomers {
    date: Date;
    name: string;
    seller: string;
}

export async function getAllCustomers(): Promise<Customer[]> {
    return api.get('/customer')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return "Error on getAllCustomers"
        })
}

export async function getTotalNumberOfCustomers(): Promise<number> {
    return api.get('/customer/count')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return "Error on getTotalCustomers";
        });
}

export async function getCustomerById(id:string) {
    return api.get('/customer', { params: { id: id } })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return "Error on getCustomerById"
        })
}
export async function getCustomerByCnpj(cnpj:string) {
    return api.get('/customer/cnpj/'+cnpj)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return "Error on getCustomerByCnpj"
        })
}

export async function createCustomer(data:Customer) {
    return api.post('/customer', data)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return "Error on createCustomer"
    })
    

    
}

export async function updateCustomer(id:string,data:Customer) {
    return api.patch('/customer/'+id, data)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return "Error on updateCustomer"
    })
}



export async function deleteCustomer(id:string) {
    return api.delete('/customer/'+id)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return "Error on deleteCustomer"
    })
    
}


export async function getLastCreatedCustomers():Promise<DateCustomers[][]>{
    return api.get('/customer')
    .then(function (response) {
        const arrayResponse = response.data;
        const orderedArray = [];
        for (let i = 0; i < arrayResponse.length; i++) {
            let date = new Date(arrayResponse[i].createdAt)
            let name = arrayResponse[i].name;
            let seller = arrayResponse[i].seller
            orderedArray.push([date,name,seller])
        }
        let myNewArray = orderedArray.sort((a,b)=> b[0]-a[0]);
        let responseArray = []
        for (let i = 0; i < 5 && i < myNewArray.length; i++) {
            responseArray.push(myNewArray[i])
        }
        return responseArray;
    })
}