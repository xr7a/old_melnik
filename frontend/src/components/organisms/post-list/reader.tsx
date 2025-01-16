import { Card } from '@/components/atoms/ui/card';
import { Skeleton } from '@/components/atoms/ui/skeleton';
import { PostCard } from '@/components/molecules/post-card';
import { Post, PostService } from '@/features/api/services/post.service';
import { useFetch } from '@/hooks/useFetch';
import { useEffect, useRef, useState } from 'react';
import { InfiniteScroll } from '../infinite-scroll';
import { useAuth } from '@/features/context/AuthContext';
import { Like } from '@/features/api/services/interaction.service';

export function PostListReader() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const newsPage = useRef<HTMLDivElement | null>(null);
  const {userId} = useAuth()
  const {
    data: DraftPosts,
    loading: DraftPostsLoading,
    error: DraftPostsError
  } = useFetch<Post[]>(PostService.getPublishedPosts(page, 3), page);

  useEffect(() => {
    if (DraftPosts && DraftPosts.length > 0) {
      // Добавляем новые посты к уже загруженным
      setPosts((prevPosts: Post[]) => [...prevPosts, ...DraftPosts]);
    }
  }, [DraftPosts]);

  const handleScroll = () => {
    const container = newsPage.current;
    if (
      container &&
      container.scrollHeight - container.scrollTop <= container.clientHeight + 5 &&
      !DraftPostsLoading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const LikePost = (id: string, isLiked: boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likes: isLiked
              ? // Убираем лайк
                post.likes.filter((like) => like.userId !== userId)
              : // Добавляем лайк
                [
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


  useEffect(() => {
    const container = newsPage.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [newsPage.current, DraftPostsLoading]);

  if (DraftPostsLoading && posts.length === 0)
    return <Skeleton className="h-[80vh] w-full flex justify-center ml-[32px] mt-[48px]" />;

  if (DraftPostsError)
    return (
      <Card className="w-full flex justify-center ml-[32px] mt-[48px] h-[30%] items-center">
        error
      </Card>
    );

  return (
    <div className="w-full overflow-auto ml-[32px] scrollbar-none" ref={newsPage}>
      <InfiniteScroll
        posts={posts}
        loading={DraftPostsLoading}
        setPage={() => setPage((prevPage: number) => prevPage + 1)}
        likePost={LikePost}
      />
    </div>
  );
}
