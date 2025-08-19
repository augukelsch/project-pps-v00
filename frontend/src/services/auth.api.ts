import { api } from "./api.main"

export interface User{
    _id:string
    username:string
    email:string
    password:string
    createdAt: Date
    updatedAt: Date
    hidden: Boolean
    __v: number
}

export interface LoginData{
    username:string,
    password:string
}


export interface AccessToken {
    access_token: string
}


export async function getAllUsers(): Promise<User[]> {
    return api.get('/auth/users')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return "Error on getAllUsers";
        });
}


export async function postLogin(userData:LoginData): Promise<AccessToken> {
    return api.post('/auth/login', userData)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return "Error on Login";
        });
}