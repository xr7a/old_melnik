import $api from "../instance";

export interface Post {
    title: string;
    content: string;
}

export class PostService {
    static async create(data: Post){
        const response = await $api.post('/posts', data);
        return response.data;
    }

    static async patch(id: string, data: Post){
        const response = await $api.patch(`/posts/${id}`, data);
        return response.data;
    }

    static async getPublishedPosts(){
        const response = await $api.get('/posts');
        return response.data;
    }
}