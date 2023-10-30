import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/Home';
import PlantsPage from './pages/Plants';
import ProductDetailPage from './pages/ProductDetail';
import Layout from './components/Layout';
import AccessoriesPage from './pages/Accessories';
import CartsPage from './pages/Carts';
import NotFound from './pages/NotFound';
import './App.css';
export default function App() {
  interface Product {
    id: number;
    name: string;
    quantity: number;
    image: string;
    price: number;
  }

  const products: Product[] = [
    {
      id: 1,
      name: 'Moses in the Cradle',
      quantity: 1,
      image:
        'https://static.wixstatic.com/media/924d39_40ce473dc9ba4339beb293458d627e4a~mv2.jpeg',
      price: 19,
    },
    {
      id: 2,
      name: 'Rugosa',
      quantity: 2,
      image:
        'https://static.wixstatic.com/media/924d39_1a6a30bcb9e24c5fa6c5bc6b2a02b867~mv2.jpeg',
      price: 29,
    },
    {
      id: 3,
      name: 'Frost',
      quantity: 3,
      image:
        'https://static.wixstatic.com/media/924d39_830865d1e0434e6a8f90cd24be193c4e~mv2.jpeg',
      price: 39,
    },
    {
      id: 4,
      name: 'Curtisii',
      quantity: 3,
      image:
        'https://static.wixstatic.com/media/924d39_4a93df31e599434ea4303199de1cd062~mv2.jpeg',
      price: 39,
    },
  ];
  const cartItems: Product[] = [
    products[0],
    products[1],
    products[2],
    products[3],
  ];

  const getTitleFromRoute = (url: string) => {
    if (url === '/') return 'Home Page';
    if (url === '/plants') return 'Plants Page';
    if (url === '/accessories') return 'Accessories Page';
    if (url === '/carts') return 'Carts Page';
    else return 'New Page Title';
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={<HomePage getTitleFromRoute={getTitleFromRoute} />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/plants" element={<PlantsPage />} />
          <Route path="/plants/:id" element={<ProductDetailPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/accessories/:id" element={<ProductDetailPage />} />
          <Route
            path="/carts"
            element={
              <CartsPage
                cartItems={cartItems}
                getTitleFromRoute={getTitleFromRoute}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
