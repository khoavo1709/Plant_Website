import { useAtomValue } from "jotai";
import { isNavOpenAtom } from "../hooks/headerHooks";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const display = useAtomValue(isNavOpenAtom);
  return (
    <div className="min-h-full flex">
      <>{display && <Navbar />}</>
      <Outlet />
    </div>
  );
};

export default Layout;
