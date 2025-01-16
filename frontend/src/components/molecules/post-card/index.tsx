import { Avatar, AvatarFallback } from '@/components/atoms/ui/avatar';
import { Button } from '@/components/atoms/ui/button';
import { Card, CardFooter } from '@/components/atoms/ui/card';
import { Skeleton } from '@/components/atoms/ui/skeleton';
import { Post, PostService, UpdatePost } from '@/features/api/services/post.service';
import { UserService } from '@/features/api/services/user.service';
import { useFetch } from '@/hooks/useFetch';
import { Typography } from '@/utils/typography/Typography';
import { PatchCardDialog } from '../update-post-card';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Toggle } from '@/components/atoms/ui/toggle';
import heart from '@/assets/images/heart.svg';
import messageCircle from '@/assets/images/message-circle.svg';
import { InteractionsService, Like } from '@/features/api/services/interaction.service';
import { useAuth } from '@/features/context/AuthContext';

interface PostCardProps {
  post: Post;
  changeDraftPostsByPublish?: (id: string) => void;
  changeDraftPostsByUpdate?: (id: string, data: UpdatePost) => void;
  likePost: (id: string, isLiked: boolean) => void;
}

export const PostCard = ({
  post,
  changeDraftPostsByPublish,
  changeDraftPostsByUpdate,
  likePost
}: PostCardProps) => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();

  // Расчитываем лайкнут ли текущим пользователем
  const isLiked = post.likes.some((like: Like) => like.userId === userId);

  const { loading, data } = useFetch(UserService.FindById(post.authorId), []);
  // Красивое отображение даты
  const date = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(
    post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt)
  );

  if (loading) {
    return <Skeleton className="w-full h-[400px] mb-4 flex flex-col gap-4 p-4" />;
  }

  const PublishPost = (id: string) => {
    PostService.publishPost(id);
    changeDraftPostsByPublish?.(id);
  };

  // Клик по сердечку
  const handleLikeToggle = async (event: React.MouseEvent) => {
    // Чтобы не срабатывал клик на саму карточку
    event.stopPropagation();

    // Проверяем, лайкнут ли уже
    if (!isLiked) {
      // Вызываем API
      await InteractionsService.like(post.id);
      // Обновляем стейт в родителе
      likePost(post.id, false); // false => добавить лайк
    } else {
      await InteractionsService.unlike(post.id);
      likePost(post.id, true); // true => убрать лайк
    }
  };

  return (
    <Card
      className={`w-full mb-4 flex flex-col gap-4 p-4 ${
        post.status === 'Published' && location.pathname !== `/posts/${params.postId}`
          ? 'hover:cursor-pointer'
          : ''
      }`}
      onClick={() => {
        if (post.status === 'Published') navigate(`/posts/${post.id}`);
      }}>
      <div className="flex gap-2">
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <Typography type="p2">{typeof data === 'string' ? data : JSON.stringify(data)}</Typography>
          <Typography type="p3">{date}</Typography>
        </div>
      </div>

      <Typography type="h2">{post.title}</Typography>
      {post.image != null && (
        <img src={post.image.imageUrl} className="max-h-[400px] rounded-[6px] w-auto object-contain bg-slate-300" />
      )}
    
      <Typography type="p2">{post.content}</Typography>

      {post.status === 'Draft' && (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              PublishPost(post.id);
            }}>
            Опубликовать пост
          </Button>
          <PatchCardDialog
            oldPost={post}
            publishPost={() => PublishPost(post.id)}
            updatePost={changeDraftPostsByUpdate}
          />
        </div>
      )}

      <CardFooter className="flex gap-3 mt-4 mb-0 p-0">
        <Toggle className="flex gap-[2px] bg-slate-50" pressed={isLiked} onClick={handleLikeToggle}>
          <img src={heart} alt="" />
          {post.likes.length}
        </Toggle>

        <Toggle className="flex gap-[2px] bg-slate-50">
          <img src={messageCircle} alt="" />
          {post.comments.length}
        </Toggle>
      </CardFooter>
    </Card>
  );
};
