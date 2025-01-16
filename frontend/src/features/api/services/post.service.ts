import $api from "../instance";
import { Like, Comment } from "./interaction.service";

export interface Post {
    id: string;
    status: string;
    title: string;
    content: string;
    idempotencyKey?: string;
    createdAt: Date;
    authorId: string;
    image: Image | null;
    likes: Like[];
    comments: Comment[];
}

export interface Image {
    id: string;
    imageUrl: string;
}

export interface UpdatePost {
    title?: string;
    content?: string;
    image?: Image;
}

export interface CreatePost {
    title: string;
    content: string;
}

export class PostService {
    static async create(data: CreatePost) {
        const response = await $api.post('/posts', data);
        return response.data;
    }

    static async update(id: string, data: UpdatePost) {
        const response = await $api.put(`/posts/${id}`, data);
        return response.data;
    }

    static async addPhotoToPost(id: string, img: File){
        const formData = new FormData();
        formData.append('file', img, img.name);
        console.log([...formData.entries()]);
        const response = await $api.post(`/posts/${id}/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });
        return response.data;
    }

    static async deletePhotoFromPost(id: string){
        const response = await $api.delete(`/posts/${id}/images`);
        return response.data;
    }

    static async getPost(id:string){
        const response = await $api.get(`/posts/${id}`);
        return response.data;
    }

    static async publishPost(id: string){
        await $api.post(`/posts/${id}/publish`);
    }

    static async getPublishedPosts(page: number = 1, limit: number = 10) {
        const response = await $api.get(`/posts?page=${page}&limit=${limit}`);
        return response.data;
    }

    static async getAuthorPublishedPosts(page: number = 1, limit: number = 10) {
        const response = await $api.get(`/posts/my/published?page=${page}&limit=${limit}`);
        return response.data;
    }

    static async getAuthorDraftPost(page: number = 1, limit: number = 10) {
        const response = await $api.get(`/posts/my/draft?page=${page}&limit=${limit}`);
        return response.data;
    }
}