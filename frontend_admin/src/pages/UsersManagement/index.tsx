import Header from "../../components/Header";
import {
  TrashIcon,
  InformationCircleIcon as SolidInformationCircleIcon,
} from "@heroicons/react/24/solid";
import { InformationCircleIcon as OutlineInformationCircleIcon } from "@heroicons/react/24/outline";
import "../../App.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { isAdd } from "../../hooks/createEdit";

const UserManagement = () => {
  var baseUrl = import.meta.env.BACKEND_API_URL || "http://localhost:8000";
  interface User {
    id: number;
    name: string;
    full_name: string;
    gender: string;
    email: string;
    mobile: string;
    address: string;
    role: string;
  }

  const navigate = useNavigate();
  const setUserCreate = useSetAtom(isAdd);
  const [users, setUsers] = useState<User[]>([]);
  const [hoverTooltipUserId, setHoverTooltipUserId] = useState<number | null>();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    const token = localStorage.getItem("token");
    fetch(`${baseUrl}/api/users`, {
      headers: {
        Accept: "application/json",
        Authorization: token ? token : "",
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status == 401) {
            localStorage.clear();
            navigate("/login");
          }
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const onDeleteClick = (user: any) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    const token = localStorage.getItem("token");
    fetch(`${baseUrl}/api/users/${user.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: token ? token : "",
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status == 401) {
            localStorage.clear();
            navigate("/login");
          }
        }
      })
      .then(() => {
        getUsers();
        window.alert("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <main>
      <Header />
      <div className="background-main-page p-2">
        <div className="flex justify-between items-center pt-2 px-5">
          <div className="font-bold text-lg">List Users</div>
          <Link
            to="/users/createUser"
            onClick={() => setUserCreate(true)}
            className="h-10 rounded-full flex items-center gap-2 pl-4 pr-6 font-medium text-sm text-white bg-cyan-500 hover:bg-cyan-400"
          >
            <PlusIcon className="text-cyan-50 w-5 h-5 stroke-2" />
            Add User
          </Link>
        </div>
        <div className="m-5 bg-white p-4 rounded-2xl shadow-md">
          <table className="text-sm text-left w-full">
            <thead className="uppercase border-b">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Full name
                </th>
                <th scope="col" className="px-6 py-4">
                  Gender
                </th>
                <th scope="col" className="px-6 py-4">
                  Email
                </th>
                <th scope="col" className="px-6 py-4">
                  Phone number
                </th>
                <th scope="col" className="px-6 py-4">
                  Address
                </th>
                <th scope="col" className="px-6 py-4">
                  Position
                </th>
                <th scope="col" className="px-6 py-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{user.full_name}</td>
                  <td className="px-6 py-4">{user.gender}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.mobile}</td>
                  {/* <td className="px-6 py-4">{user.address}</td> */}
                  <td className="px-6 py-4">
                    {user.address.length > 40 ? (
                      <span className="flex">
                        {user.address.substring(0, 50)}...
                        <a
                          className="hover:text-cyan-400"
                          onMouseEnter={() => setHoverTooltipUserId(user.id)}
                          onMouseLeave={() => setHoverTooltipUserId(null)}
                        >
                          <OutlineInformationCircleIcon className="h-5" />
                          {hoverTooltipUserId == user.id && (
                            <span className=" bg-white text-black absolute p-2 mt-2 -ml-2 rounded-md shadow-md">
                              {user.address}
                            </span>
                          )}
                        </a>
                      </span>
                    ) : (
                      user.address
                    )}
                  </td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 text-slate-400">
                    <div className="flex items-center justify-end">
                      <div className="px-2">
                        <Link
                          to={"/users/editUser/" + user.id}
                          onClick={() => setUserCreate(false)}
                        >
                          <SolidInformationCircleIcon
                            title="Info"
                            className="hover:text-blue-500 hover:ease-in-out hover:scale-125 h-5"
                          />
                        </Link>
                      </div>
                      <div className="px-2">
                        <TrashIcon
                          title="Delete"
                          onClick={() => onDeleteClick(user)}
                          className="hover:text-red-500 hover:ease-in-out hover:scale-125 h-5"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default UserManagement;
