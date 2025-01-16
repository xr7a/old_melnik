import { PostCard } from '@/components/molecules/post-card';
import { Post, PostService } from '@/features/api/services/post.service';
import { useFetch } from '@/hooks/useFetch';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const PostPage = () => {
  const params = useParams();
  const postId = params.postId;
  console.log(postId);
  if (!postId) {
    return <div>Такого поста не существует</div>;
  }
  const func = () => PostService.getPost(postId);
  const { data, loading, error } = useFetch<Post>(func(), []);
  if (error) {
    return <div></div>;
  }
  if (loading) {
    return <div>fjdklfj</div>;
  }
  return (
    <div className='w-[40%] ml-[1.6%] mt-[2.5%]'>
      <PostCard post={data!} />
    </div>
  );
};
