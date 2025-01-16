
import { useAuth } from '@/features/context/AuthContext';
import { PostListAuthor } from '@/components/organisms/post-list/author';
import { PostListReader } from '@/components/organisms/post-list/reader';

function NewsPage() {
  const { role } = useAuth();
  return <div className='w-[40%] ml-[1.6%] mt-[2.5%]'>
    {role == "Author" ? <PostListAuthor/> : <PostListReader/>} 
  </div>
}

export default NewsPage;
