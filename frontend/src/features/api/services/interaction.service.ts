import $api from "../instance";

export interface Like {
    id: string;
    postId: string;
    userId: string;
}

export interface Comment {
    id: string;
    content: string;
    postId: string;
    userId: string;
}

export class InteractionsService {
    static async like(id: string) {
        const response = await $api.post(`/interactions/${id}/like`);
        return response.data;
    }

    static async unlike(id:string){
        const response = await $api.delete(`/interactions/${id}/like`);
        return response.data;
    }

    static async comment(id: string, content: string){
        const response = await $api.post(`/interactions/${id}/comment`, content);
        return response.data;
    }

    static async uncomment(id: string){
        const response = await $api.delete(`/interactions/${id}/comment`);
        return response.data;
    }
}