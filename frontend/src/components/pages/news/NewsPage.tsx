import { PostService } from '@/features/api/services/post.service';
import { useAuth } from '@/features/context/AuthContext';
import { useEffect, useState } from 'react';
import { Post } from '../../../features/api/services/post.service';
import { useFetch } from '@/hooks/useFetch';
import { Skeleton } from '@/components/atoms/ui/skeleton';
import { Card } from '@/components/atoms/ui/card';
import { ScrollArea } from '@radix-ui/react-scroll-area';

function NewsPage() {
  const { role } = useAuth();
  const [publishedPosts, setPublishedPosts] = useState<Post[]>([]);
  const {
    data: AuthorPublishedPosts,
    loading: AuthorPublishedPostsLoading,
    error: AuthorPublishedPostsError
  } = role === 'Author'
    ? useFetch<Post[]>(PostService.getAuthorPublishedPosts())
    : { data: null, loading: false, error: null };
  const {
    data: AuthorDraftPosts,
    loading: AuthorDraftPostsLoading,
    error: AuthorDraftPostsError
  } = role === 'Author'
    ? useFetch<Post[]>(PostService.getAuthorDraftPost())
    : { data: null, loading: false, error: null };
  if (AuthorDraftPostsLoading)
    return <Skeleton className="h-[80vh] w-[40%] flex justify-center ml-[32px] mt-[48px]" />;
  if (AuthorDraftPostsError)
    return (
      <Card className="w-[40%] flex justify-center ml-[32px] mt-[48px] h-[30%] items-center">
        error
      </Card>
    );

  return (
    <ScrollArea className="w-[40%] h-[600px] flex flex-col items-center ml-[32px] mt-[48px]">
      {AuthorDraftPosts?.map((posts) => {
        return (
          <Card key={posts.id} className="w-full h-[400px]">
            {posts.title}
          </Card>
        );
      })}
    </ScrollArea>
  );
}

export default NewsPage;
