import axios from "axios";


const requestAxios = axios.create({
        baseURL: "https://laravel-api-2xg2.onrender.com/api",
        // baseURL: "http://localhost:5500/api"    
        headers: {
         'Content-Type': 'application/json',
          },
        withCredentials: false, // cambia a true si usas cookies
})

requestAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {requestAxios}
