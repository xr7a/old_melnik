import Navbar from '@/components/organisms/navbar';
import Sidebar from '@/components/organisms/sidebar/Sidebar';
import { useAuth } from '@/features/context/AuthContext';
import { useLocation } from 'react-router-dom';

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  const {email} = useAuth();
  const location = useLocation();
  if (location.pathname === '/auth') {
    return <main>{children}</main>;
  }
  return (
    <div className="flex flex-col justify-between h-dvh ">
      <Navbar email={email} />
      <main className="h-[95%] flex">
        <Sidebar/>
        {children}
      </main>
    </div>
  );
}

export default Layout;
