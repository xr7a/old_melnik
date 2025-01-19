import { Card } from '@/components/atoms/ui/card';
import { Skeleton } from '@/components/atoms/ui/skeleton';
import { Post, PostService, UpdatePost } from '@/features/api/services/post.service';
import { useEffect, useState } from 'react';
import { InfiniteScroll } from '../infinite-scroll';
import { Toggle } from '@/components/atoms/ui/toggle';
import { CreatePostDialog } from '@/components/molecules/create-post-card';
import { useAuth } from '@/features/context/AuthContext';
import { useFetch } from '@/hooks/useFetch';

export function PostListAuthor() {
  const [postType, setPostType] = useState('published');
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const { userId } = useAuth();

  const changeDraftPostsByPublish = (id: string) => {
    if (postType === 'myDraft') {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const LikePost = (id: string, isLiked: boolean) => {
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

  const changeDraftPostsByUpdate = (id: string, data: UpdatePost) => {
    if (postType === 'myDraft') {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? {
                ...post,
                title: data.title || post.title,
                content: data.content || post.content,
                image: data.image
                  ? {
                      id: data.image.id,
                      imageUrl: data.image.imageUrl
                    }
                  : null
              }
            : post
        )
      );
    }
  };

  const getPostsByType = () => {
    switch (postType) {
      case 'published':
        return () => PostService.getPublishedPosts(page, 4);
      case 'myPublished':
        return () => PostService.getAuthorPublishedPosts(page, 4);
      case 'myDraft':
        return () => PostService.getAuthorDraftPost(page, 4);
      default:
        return () => Promise.resolve([]);
    }
  };

  const postFunc = getPostsByType();
  const { data, loading, error } = useFetch<Post[]>(postFunc(), [page, postType]);

  useEffect(() => {
    if (data && data.length > 0) {
      setPosts((prevPosts) => {
        const existingIds = new Set(prevPosts.map((post) => post.id));
        const newPosts = data.filter((post) => !existingIds.has(post.id));
        return [...prevPosts, ...newPosts];
      });
    }
  }, [data]);

  const handleChangeType = (type: string) => {
    if (type !== postType) {
      setPosts([]);
      setPostType(type);
      setPage(1);
    }
  };

  const handleCreatePublishedPost = (newPost: Post) => {
    newPost.comments = [];
    newPost.likes = [];
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  if (loading && posts.length === 0) {
    return <Skeleton className="h-[80vh] w-full flex justify-center" />;
  }

  if (error) {
    return <Card className="w-full flex justify-center h-[30%] items-center">Ошибка</Card>;
  }

  return (
    <div className="h-[80vh]">
      <Card className="flex flex-0 w-[40%] mb-[32px]">
        <Toggle
          className="w-full"
          pressed={postType === 'published'}
          onPressedChange={() => handleChangeType('published')}>
          Посты
        </Toggle>
        <Toggle
          className="w-full"
          pressed={postType === 'myPublished'}
          onPressedChange={() => handleChangeType('myPublished')}>
          Мои Посты
        </Toggle>
        <Toggle
          className="w-full"
          pressed={postType === 'myDraft'}
          onPressedChange={() => handleChangeType('myDraft')}>
          Черновики
        </Toggle>
      </Card>

      {postType === 'myPublished' && (
        <CreatePostDialog handleCreatePublishedPost={handleCreatePublishedPost} />
      )}

      <InfiniteScroll
        posts={posts}
        loading={loading}
        setPage={() => setPage((prevPage) => prevPage + 1)}
        changeDraftPostsByPublish={changeDraftPostsByPublish}
        changeDraftPostsByUpdate={changeDraftPostsByUpdate}
        likePost={LikePost}
      />
    </div>
  );
}
