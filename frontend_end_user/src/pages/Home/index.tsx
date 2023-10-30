// pages/Home.tsx

import { useEffect } from 'react';

interface HomePageProps {
  getTitleFromRoute: (url: string) => string;
}

const HomePage: React.FC<HomePageProps> = ({ getTitleFromRoute }) => {
  useEffect(() => {
    const title = getTitleFromRoute('/');
    document.title = title;
  }, [getTitleFromRoute]);

  return <div>Home Page</div>;
};

export default HomePage;
