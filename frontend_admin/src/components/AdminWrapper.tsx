import { useAtomValue } from "jotai";
import { dataUser } from "../hooks/dataUser";
import { Outlet } from "react-router-dom";

const AdminWrapper = () => {
  const user = useAtomValue(dataUser);
  return <>{user && user.role == "ADMIN" && <Outlet />}</>;
};

export default AdminWrapper;
