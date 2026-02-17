import axios from 'axios';

const api = axios.create({
    baseURL : 'http://chatofnahrain.runasp.net/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;

export const userId = localStorage.getItem('userId');
export const token = localStorage.getItem("token");
export const fullName = localStorage.getItem('fullName');
export const pathWeb = 'http://chatofnahrain.runasp.net/'



