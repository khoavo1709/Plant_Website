import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/DashBoard";
import UserManagement from "./pages/UsersManagement";
import ProductsManagement from "./pages/ProductsManagement";
import Layout from "./components/layout";
import OrdersManagement from "./pages/OrdersManagement";
import AddNewMember from "./pages/UsersManagement/AddNewMember";
import ViewEditOrder from "./pages/OrdersManagement/ViewEditOrder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users/new"
            element={<AddNewMember key="userCreate" />}
          />
          <Route
            path="/users/:id"
            element={<AddNewMember key="userUpdate" />}
          />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/products" element={<ProductsManagement />} />
          <Route path="/orders" element={<OrdersManagement />} />
          <Route path="/orders/:id" element={<ViewEditOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
