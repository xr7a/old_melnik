import { Button } from '@/components/atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/atoms/ui/dialog';
import { Input } from '@/components/atoms/ui/input';
import { Label } from '@/components/atoms/ui/label';
import { CreatePost, Post, PostService } from '@/features/api/services/post.service';
import { DialogClose } from '@radix-ui/react-dialog';
import { useRef, useState } from 'react';

interface CreatePostDialogProps {
  handleCreatePublishedPost: (data: Post) => void;
}

export const CreatePostDialog = ({ handleCreatePublishedPost }: CreatePostDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [post, setPost] = useState<CreatePost>({ title: '', content: '' });
  const handlePublishClick = async () => {
    const response: Post = await PostService.create(post);
    if (image) {
      response.image = await PostService.addPhotoToPost(response.id, image);
    }
    PostService.publishPost(response.id);
    console.log(response);
    handleCreatePublishedPost({ ...response, status: 'Published' });
  };
  const handleDraftClick = async () => {
    const response = await PostService.create(post);
    if (image) {
      await PostService.addPhotoToPost(response.id, image);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full mb-6">Создать пост</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать пост</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="title" className="text-left">
              Заголовок
            </Label>
            <Input
              id="title"
              value={post.title}
              className="col-span-3"
              onChange={(event) => {
                setPost({ title: event.target.value, content: post?.content ?? '' });
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              type="file"
              id="image"
              className="hidden"
              ref={fileInputRef}
              onChange={(event) => setImage(event.target.files?.[0])}
            />
            {image === undefined ? (
              <Button className="w-[45%]" onClick={() => fileInputRef.current?.click()}>
                Добавить картинку
              </Button>
            ) : (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="max-h-[50vh]"
                onClick={() => fileInputRef.current?.click()}
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="content" className="text-left">
              Контент
            </Label>
            <textarea
              id="content"
              value={post.content}
              className="col-span-3 h-[100px] w-full resize-none overflow-hidden rounded border p-2 text-[14px]"
              style={{ minHeight: '40px' }}
              onChange={(event) => {
                setPost({ title: post?.title ?? '', content: event.target.value });
                event.target.style.height = 'auto';
                event.target.style.height = `${event.target.scrollHeight}px`;
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handlePublishClick}>
              Опубликовать пост
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              type="submit"
              onClick={handleDraftClick}
              className="bg-slate-200 text-slate-900 hover:bg-slate-300">
              Сохранить в черновиках
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
