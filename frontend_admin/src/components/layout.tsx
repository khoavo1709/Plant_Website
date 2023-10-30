import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-full grid grid-cols-5">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
