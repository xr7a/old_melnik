import { Skeleton } from '@/components/atoms/ui/skeleton';
import { PostCard } from '@/components/molecules/post-card';
import { Post, UpdatePost } from '@/features/api/services/post.service';
import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  posts: Post[];
  loading: boolean;
  setPage: () => void;
  changeDraftPostsByPublish?: (id: string) => void;
  changeDraftPostsByUpdate?: (id: string, data: UpdatePost) => void;
  likePost: (id: string, isLiked: boolean) => void;
}

export const InfiniteScroll = ({
  posts,
  loading,
  setPage,
  changeDraftPostsByPublish,
  changeDraftPostsByUpdate,
  likePost
}: InfiniteScrollProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const container = ref.current;
    if (
      container &&
      container.scrollHeight - container.scrollTop <= container.clientHeight + 1 &&
      !loading
    ) {
      setPage();
    }
  };

  useEffect(() => {
    const container = ref.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [ref, loading]);

  return (
    <div className="h-[70vh] w-full overflow-auto scrollbar-none" ref={ref}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          changeDraftPostsByPublish={changeDraftPostsByPublish}
          changeDraftPostsByUpdate={changeDraftPostsByUpdate}
          likePost={likePost}
        />
      ))}
      {loading && <Skeleton className="h-[400px] w-full flex justify-center mt-[32px]" />}
    </div>
  );
};
