import $api from "../instance";

export interface User {
    email: string;
}

export class UserService {
    static async FindById(id: string){
        const response = await $api.get(`/user/${id}`);
        return response.data;
    }
}