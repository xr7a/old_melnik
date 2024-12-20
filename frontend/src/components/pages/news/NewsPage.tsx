import { PostService } from '@/features/api/services/post.service';
import { useAuth } from '@/features/context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { Post } from '../../../features/api/services/post.service';
import { useFetch } from '@/hooks/useFetch';
import { Skeleton } from '@/components/atoms/ui/skeleton';
import { Card } from '@/components/atoms/ui/card';

function NewsPage() {
  const { role } = useAuth();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const newsPage = useRef<HTMLDivElement | null>(null);

  const {
    data: AuthorDraftPosts,
    loading: AuthorDraftPostsLoading,
    error: AuthorDraftPostsError
  } = role === 'Author'
    ? useFetch<Post[]>(PostService.getAuthorDraftPost(page, 3), page)
    : { data: null, loading: false, error: null };

  useEffect(() => {
    if (AuthorDraftPosts && AuthorDraftPosts.length > 0) {
      // Добавляем новые посты к уже загруженным
      setPosts((prevPosts: Post[]) => [...prevPosts, ...AuthorDraftPosts]);
    }
  }, [AuthorDraftPosts]);

  const handleScroll = () => {
    const container = newsPage.current;
    if (
      container &&
      container.scrollHeight - container.scrollTop <= container.clientHeight + 5 &&
      !AuthorDraftPostsLoading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const container = newsPage.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [newsPage.current, AuthorDraftPostsLoading]);

  if (AuthorDraftPostsLoading && posts.length === 0)
    return <Skeleton className="h-[80vh] w-[40%] flex justify-center ml-[32px] mt-[48px]" />;
  
  if (AuthorDraftPostsError)
    return (
      <Card className="w-[40%] flex justify-center ml-[32px] mt-[48px] h-[30%] items-center">
        error
      </Card>
    );

  return (
    <div
      className="h-[90%] w-[40%] overflow-auto ml-[32px] mt-[48px] scrollbar-none"
      ref={newsPage}
    >
      {posts.map((post: Post) => (
        <Card key={post.id} className="w-full h-[400px] mb-4">
          {post.title}
        </Card>
      ))}
      {AuthorDraftPostsLoading && (
        <Skeleton className="h-[400px] w-full flex justify-center mt-[32px]" />
      )}
    </div>
  );
}

export default NewsPage;
