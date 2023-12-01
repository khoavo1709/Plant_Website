import ButtonWithIcon from "../../components/Button/ButtonWithIcon";
import Header from "../../components/Header";
import { TrashIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import "../../App.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserManagement = () => {
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

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch("http://127.0.0.1:8000/api/users", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
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

    fetch(`http://localhost:8000/api/users/${user.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
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
          <ButtonWithIcon
            text="Add member"
            background="bg-cyan-500"
            hoverBackground="hover:bg-cyan-400"
            icon={<PlusIcon className="text-cyan-50 w-5 h-5 stroke-2" />}
          />
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
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="flex px-6 py-4 justify-end text-slate-400">
                    <div className="px-2">
                      <Link to={"/users/" + user.id}>
                        <InformationCircleIcon
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
