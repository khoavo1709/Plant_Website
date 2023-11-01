import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import PlantsPage from './pages/Plants';
import ProductDetailPage from './pages/ProductDetail';
import Layout from './components/Layout';
import AccessoriesPage from './pages/Accessories';
import CartsPage from './pages/Carts';
import NotFound from './pages/NotFound';
import './App.css';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/plants" element={<PlantsPage />} />
          <Route path="/plants/:id" element={<ProductDetailPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/accessories/:id" element={<ProductDetailPage />} />
          <Route path="/carts" element={<CartsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
