import axios from 'axios'
import { AuthService } from './services/auth.service';

const $api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    }
})

$api.interceptors.request.use(
    async (config) => {
        try {
            // Получаем токен
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        } catch (error) {
            console.error("Error in request interceptor:", error);
            return Promise.reject(error);
        }
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.warn("Token expired, attempting refresh...");
            try {
                // Обновляем токен
                await AuthService.refreshToken();
                const newAccesToken = localStorage.getItem('token');

                // Обновляем заголовки запроса
                error.config.headers.Authorization = `Bearer ${newAccesToken}`;

                // Повторяем запрос
                return $api.request(error.config);

            } catch (e) {
                localStorage.removeItem('token');
                localStorage.removeItem('refresh');
                window.location.href = '/auth';
            }
        }

        console.error("Response error:", error);
        return Promise.reject(error);
    }
);


export default $api;

