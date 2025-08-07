import axios from 'axios';

export interface Customer {
    name :String 
    address :String 
    district :String 
    city :String 
    state :String 
    cep :String 
    cnpj :String 
    ie :String 
    phone :String 
    seller :String 
}

export async function getAllCustomers():Promise<Customer[]>{
    return await axios({
        method: 'get',
        url: 'http://localhost:3000/customer'
    })
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return "Error on getAllCustomers"
    })
}

export async function getTotalNumberOfCustomers():Promise<number> {
    return await axios({
        method: 'get',
        url: 'http://localhost:3000/customer'
    })
    .then(function (response) {
        return response.data.length;
    })
    .catch(function (error) {
        console.log(error);
        return "Error on getTotalCustomers";
    });
}

export async function getCustomerById() {
    await axios({
        method: 'get',
        url: 'http://localhost:3000/customer',
        params: {
            ID: "6893aa8cace63e82e6a577d3"
        }
    })
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return "Error on getCustomerById"
    })
}
