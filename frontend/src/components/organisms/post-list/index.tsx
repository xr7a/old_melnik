import { PostService } from "@/features/api/services/post.service"
import { useState } from "react";

export function PostList() {
    const [offset, setOffset] = useState(0);
    async function fetchData() {
        const {} = await PostService.getPublishedPosts(); 
    }

    return <div></div>
}