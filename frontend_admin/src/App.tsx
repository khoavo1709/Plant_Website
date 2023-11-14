import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/DashBoard";
import UserManagement from "./pages/UsersManagement";
import ProductsManagement from "./pages/ProductsManagement";
import Layout from "./components/layout";
import OrdersManagement from "./pages/OrdersManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/products" element={<ProductsManagement />} />
          <Route path="/orders" element={<OrdersManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
