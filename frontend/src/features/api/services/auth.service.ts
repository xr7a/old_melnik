import { Token, useAuth } from '@/features/context/AuthContext';
import axios from 'axios'

export interface RegisterData {
    email: string;
    password: string;
    role: "Reader" | "Author"
}

export interface LoginData {
    email: string;
    password: string;
}


export class AuthService {
    static async register(user: RegisterData) {
        try {
            const response = await axios.post<Token>('http://localhost:3000/auth/register', user);
            return response.data
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error("Failed to register: " + error.message);
            } else {
                throw new Error("Failed to register: unknown error");
            }
        }
    }

    static async login(user: LoginData) {
        try {
            const response = await axios.post<Token>('http://localhost:3000/auth/login', user);
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error("Failed to register: " + error.message);
            } else {
                throw new Error("Failed to register: unknown error");
            }
        }
    }

    static async refreshToken() {
        try {
            const token = localStorage.getItem("refresh");
            if (token) {
                const response = await axios.get<Token>('http://localhost:3000/auth/refresh-token',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("refresh", response.data.refreshToken);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error("Failed to refresh tokens: " + error.message);
            } else {
                throw new Error("Failed to refresh tokens: unknown error");
            }
        }
    }
}
