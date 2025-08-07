import axios from 'axios';

export interface Part {
    cod: string;
    name: string;
    description: string;
    distributionValue: string;
    storeValue: string;
    cost: string;
}

export async function getAllParts():Promise<Part[]> {
    return await axios({
        method: 'get',
        url: 'http://localhost:3000/part'
    })
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
        return "Error on getAllParts";
    });
}

export async function getTotalNumberOfParts():Promise<number> {
    return await axios({
        method: 'get',
        url: 'http://localhost:3000/part'
    })
    .then(function (response) {
        return response.data.length;
    })
    .catch(function (error) {
        console.log(error);
        return "Error on getTotalParts";
    });
}

export async function getPartById() {
    await axios({
        method: 'get',
        url: 'http://localhost:3000/part',
        params: {
            ID: "6893aa8cace63e82e6a577d3"
        }
    })
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return "Error on getPartById"
    })
}

