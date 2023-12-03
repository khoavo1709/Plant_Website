import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import HomePage from './pages/Home';
import PlantsPage from './pages/Plants';
import ProductDetailPage from './pages/ProductDetail';
import Layout from './components/Layout';
import AccessoriesPage from './pages/Accessories';
import CartsPage from './pages/Carts';
import NotFound from './pages/NotFound';
import './App.css';
import { loader as productDetailLoader } from './pages/ProductDetail/loader';
import { loader as plantsLoader } from './pages/Plants/loader';
import { loader as accessoriesLoader } from './pages/Accessories/loader';
import { loader as cartLoader } from './pages/Carts/loader';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/plants" element={<PlantsPage />} loader={plantsLoader} />
      <Route
        path="/products/:id"
        element={<ProductDetailPage />}
        loader={productDetailLoader}
      />
      <Route
        path="/accessories"
        element={<AccessoriesPage />}
        loader={accessoriesLoader}
      />
      <Route path="/accessories/:id" element={<ProductDetailPage />} />
      <Route path="/carts" element={<CartsPage />} loader={cartLoader} />
    </Route>
  )
);
export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
