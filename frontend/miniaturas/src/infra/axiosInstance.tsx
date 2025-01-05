import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`
        } 
        return config;
    }, (error => {
        return Promise.reject(error);
    })
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 401) {
            console.log("Redirecionar usuário para tela de login");
        }
    }
);

export default axiosInstance;