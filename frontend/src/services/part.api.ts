import { api } from './api.main';

export interface Part {
    cod: string;
    description: string;
    unit:string;
    distributionValue: number;
    storeValue: number;
    cost: number;
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
    return api.get('/part')
    .then(function (response) {
        return response.data.length;
    })
    .catch(function (error) {
        console.log(error);
        return "Error on getTotalParts";
    });
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