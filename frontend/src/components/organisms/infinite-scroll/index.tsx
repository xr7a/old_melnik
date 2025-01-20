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
  const observer = useRef<IntersectionObserver | null>();
  useEffect(() => {
    var callback = function (entries: { isIntersecting: any; }[], observer: any) {
      if(entries[0].isIntersecting){
        setPage()
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(ref.current!);
  }, []);

  return (
    <div className="w-full flex-1 overflow-y-auto scrollbar-none h-full">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          changeDraftPostsByPublish={changeDraftPostsByPublish}
          changeDraftPostsByUpdate={changeDraftPostsByUpdate}
          likePost={likePost}
        />
      ))}
      <div className="h-5 w-1" ref={ref}></div>
      {loading && <Skeleton className="h-[400px] w-full flex justify-center mt-[32px]" />}
    </div>
  );
};
