import { useAtomValue, useSetAtom } from "jotai";
import { isNavOpenAtom } from "../hooks/headerHooks";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User } from "../../types/user";
import { dataUser } from "../hooks/dataUser";

const Layout = () => {
  const display = useAtomValue(isNavOpenAtom);
  const navigate = useNavigate();
  const setUser = useSetAtom(dataUser);

  useEffect(() => {
    const fetchUserInfo = () => {
      const token = localStorage.getItem("token");
      fetch("http://127.0.0.1:8000/api/users/me", {
        method: "GET",
        headers: { Authorization: token ? token : "" },
      })
        .then((response) => {
          if (!response.ok) {
            navigate("/login");
          }
          return response.json();
        })
        .then((user: User) => {
          console.log(user);
          setUser(user);
        })
        .catch((error) => {
          console.error(error);
          navigate("/login");
        });
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-full flex">
      <>{display && <Navbar />}</>
      <Outlet />
    </div>
  );
};

export default Layout;
