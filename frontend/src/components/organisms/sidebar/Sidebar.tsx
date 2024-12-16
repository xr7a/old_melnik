import { Toggle } from '@/components/atoms/ui/toggle';
import { PostService } from '@/features/api/services/post.service';
import { useAuth } from '@/features/context/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { logout, userId, role, email } = useAuth();
  const [value, setValue] = useState('posts');
  return (
    <div className="flex flex-col justify-between mb-[7%] mt-[4%] ml-[17%] w-[10%]">
      <div className="flex flex-col gap-2 w-full">
        <Link onClick={() => {
          const post = {title: "sdfs", content: "sdfs"};
          console.log(post, userId, role, email);
          PostService.create(post);
        }} to="/" className="w-full">
          <Toggle
            className="w-full"
            pressed={value == 'posts'}
            onPressedChange={() => setValue('posts')}>
            Посты
          </Toggle>
        </Link>
        <Link to="/contacts" className="w-full">
          <Toggle
            className="w-full"
            pressed={value == 'contacts'}
            onPressedChange={() => setValue('contacts')}>
            Контакты
          </Toggle>
        </Link>
      </div>
      <Link onClick={() => logout()} to="/auth" className="w-full">
        <Toggle className="w-full">Выйти</Toggle>
      </Link>
    </div>
  );
};

export default Sidebar;