import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-full flex">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
