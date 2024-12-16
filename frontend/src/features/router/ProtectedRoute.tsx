import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading} = useContext(AuthContext) || {};
  if(isLoading){
    return <div className='flex justify-center text-[24px]'>Загрузка...</div>
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};
