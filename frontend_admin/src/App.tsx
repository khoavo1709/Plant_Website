import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/DashBoard";
import UserManagement from "./pages/UsersManagement";
import ProductsManagement from "./pages/ProductsManagement";
import Layout from "./components/layout";
import OrdersManagement from "./pages/OrdersManagement";
import AddEditMember from "./pages/UsersManagement/AddEditMember";
import AddEditProduct from "./pages/ProductsManagement/AddEditProduct";
import AddEditCategory from "./pages/ProductsManagement/AddEditCategory";
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
            path="/users/createUser"
            element={<AddEditMember key="userCreate" />}
          />
          <Route
            path="/users/editUser/:id"
            element={<AddEditMember key="userUpdate" />}
          />
          <Route
            path="/products/createProduct"
            element={<AddEditProduct key="productCreate" />}
          />
          <Route
            path="/products/editProduct/:id"
            element={<AddEditProduct key="productUpdate" />}
          />
          <Route
            path="/products/createCategory"
            element={<AddEditCategory key="categoryCreate" />}
          />
          <Route
            path="/products/editCategory/:id"
            element={<AddEditCategory key="categoryUpdate" />}
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
