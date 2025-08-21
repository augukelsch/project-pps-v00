import { api } from './api.main';

export interface Part {
    id:string
    cod: string;
    description: string;
    unit:string;
    distributionValue: number;
    storeValue: number;
    cost: number;
}

export interface DatePart {
    date: Date;
    cod: string;
    description: string;
}

export async function getAllParts():Promise<Part[]> {
    return api.get('/part')
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
        return "Error on getAllParts";
    });
}

export async function getTotalNumberOfParts():Promise<number> {
    return api.get('/part/count')
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
        return "Error on getTotalParts";
    });
}

export async function getLastCreatedParts():Promise<DatePart[][]>{
    return api.get('/part')
    .then(function (response) {
        const arrayResponse = response.data;
        const orderedArray = [];
        for (let i = 0; i < arrayResponse.length; i++) {
            let date = new Date(arrayResponse[i].createdAt)
            let cod = arrayResponse[i].cod;
            let desc = arrayResponse[i].description
            orderedArray.push([date,cod,desc])
        }
        let myNewArray = orderedArray.sort((a,b)=> b[0]-a[0]);
        let responseArray = []
        for (let i = 0; i < 5 && i < myNewArray.length; i++) {
            responseArray.push(myNewArray[i])
        }
        return responseArray;
    })
}

export async function getPartById(id:string) {
    return api.get('/part/'+id)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return "Error on getPartById"
    })
}

export async function getPartByCod(cod:string) {
    return api.get('/part/cod/'+cod)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return "Error on getPartByCod"
    })
}

export async function createPart(data:Part) {
    return api.post('/part', data)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return "Error on createPart"
    })

}

export async function deletePart(id:string) {
    return api.delete('/part/'+id)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return "Error on deletePart"
    })
    
}

export async function editPart(id:string,data:Part) {
    return api.patch('/part/'+id, data)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return "Error on createPart"
    })
    
}