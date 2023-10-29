import { Suspense } from 'react';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Layout;
