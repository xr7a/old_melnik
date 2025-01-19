import { Card } from '@/components/atoms/ui/card';
import { Skeleton } from '@/components/atoms/ui/skeleton';
import { Post, PostService } from '@/features/api/services/post.service';
import { useFetch } from '@/hooks/useFetch';
import { useEffect, useRef, useState } from 'react';
import { InfiniteScroll } from '../infinite-scroll';
import { useAuth } from '@/features/context/AuthContext';

export function PostListReader() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { userId } = useAuth();

  // Получение опубликованных постов
  const { data, loading, error } = useFetch<Post[]>(PostService.getPublishedPosts(page, 3), [page]);

  // Обновление списка постов при загрузке новых данных
  useEffect(() => {
    if (data && data.length > 0) {
      setPosts((prevPosts) => {
        const existingIds = new Set(prevPosts.map((post) => post.id));
        const newPosts = data.filter((post) => !existingIds.has(post.id));
        return [...prevPosts, ...newPosts];
      });
    }
  }, [data]);

  // Обработчик скролла для подгрузки новых постов
  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container &&
      container.scrollHeight - container.scrollTop <= container.clientHeight + 5 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Добавление и удаление обработчика скролла
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [loading]);

  // Лайк/анлайк поста
  const likePost = (id: string, isLiked: boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likes: isLiked
              ? post.likes.filter((like) => like.userId !== userId)
              : [
                  ...post.likes,
                  {
                    id: crypto.randomUUID(),
                    userId,
                    postId: post.id
                  }
                ]
          };
        }
        return post;
      })
    );
  };

  if (loading && posts.length === 0) {
    return <Skeleton className="h-[80vh] w-full flex justify-center ml-[32px] mt-[48px]" />;
  }

  if (error) {
    return (
      <Card className="w-full flex justify-center ml-[32px] mt-[48px] h-[30%] items-center">
        Ошибка загрузки
      </Card>
    );
  }

  return (
    <div className="w-full h-[87vh] ml-[32px] scrollbar-none overflow-y-auto" ref={containerRef}>
      <InfiniteScroll
        posts={posts}
        loading={loading}
        setPage={() => setPage((prev) => prev + 1)}
        likePost={likePost}
      />
    </div>
  );
}
