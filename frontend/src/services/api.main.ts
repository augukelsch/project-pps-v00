import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: 'Bearer ' + getBearerToken()
  }
});

function getBearerToken() {
  return localStorage.getItem('access_token')
}