import $api from "../instance";

export interface Post {
    id: string;
    title: string;
    content: string;
    idempotencyKey?: string;
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

    static async getPublishedPosts(page: number = 1, limit: number = 10){
        const response = await $api.get(`/posts?page=${page}&limit=${limit}`);
        return response.data;
    }

    static async getAuthorPublishedPosts(page: number = 1, limit: number = 10){
        const response = await $api.get(`/posts/my/published?page=${page}&limit=${limit}`);
        return response.data;
    }

    static async getAuthorDraftPost(page: number = 1, limit: number = 10){
        const response = await $api.get(`/posts/my/draft?page=${page}&limit=${limit}`);
        return response.data;
    }
}