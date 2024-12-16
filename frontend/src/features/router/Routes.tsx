import AuthPage from "@/components/pages/auth/AuthPage";
import NewsPage from "@/components/pages/news/NewsPage";
import { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
    {
        path: "/auth",
        element: <AuthPage/>
    }
]

export const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <NewsPage/>
    },
    {
        path: '/posts/postId',
        element: "123"
    }
]