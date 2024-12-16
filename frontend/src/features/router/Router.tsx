import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './Routes';
import { ProtectedRoute } from './ProtectedRoute';
import Layout from '@/components/pages/layout/layout';

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {publicRoutes.map((route, index) => {
            return <Route key={index} path={route.path} element={route.element} />;
          })}
          <Route element={<ProtectedRoute />}>
            {privateRoutes.map((route, index) => {
              return <Route key={index} path={route.path} element={route.element} />;
            })}
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
