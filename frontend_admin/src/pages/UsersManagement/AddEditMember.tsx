import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useAtomValue } from "jotai";
import { isAdd } from "../../hooks/createEdit";

const AddEditMember = () => {
  const navigate = useNavigate();

  const isCreateUser = useAtomValue(isAdd);

  const { id } = useParams();

  const [user, setUser] = useState({
    id: null,
    name: "",
    full_name: "",
    mobile: "",
    role: "EMPLOYEE",
    gender: "MALE",
    address: "",
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  if (id) {
    useEffect(() => {
      fetch(`http://localhost:8000/api/users/${id}`, {
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
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }, []);
  }

  const onSubmit = async (e: any) => {
    if (!window.confirm("Are you sure you want to add/edit a new user?")) {
      return;
    }
    e.preventDefault();
    const url = id
      ? `http://127.0.0.1:8000/api/users/${id}`
      : "http://127.0.0.1:8000/api/users";

    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then(() => {
        navigate("/users");
      })
      .catch((error) => {
        console.log(error);
        console.error("Error adding user:", error);
        window.alert(error);
      });
  };

  return (
    <main>
      <Header />
      <div className="background-main-page p-2">
        <div className="m-5 bg-white p-4 rounded-2xl shadow-lg mb-8">
          <div className="text-xl font-bold px-4 my-4">
            {isCreateUser ? "Create new user" : `Edit user:  ${user.full_name}`}
          </div>
          <form className="p-4" onSubmit={onSubmit}>
            <div className="grid gap-4 mb-6 grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 text-sm font-medium">
                  User name
                </label>
                <input
                  type="text"
                  id="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5"
                  placeholder="abc"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile" className="mb-2 text-sm font-medium">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={user.mobile}
                  onChange={handleInputChange}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                  placeholder="0903702000"
                  pattern="^(\\+84|0)(3[2-9]|5[6-9]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$"
                  required
                />
              </div>
              <div>
                <label htmlFor="full_name" className="mb-2 text-sm font-medium">
                  Full name
                </label>
                <input
                  type="text"
                  id="full_name"
                  onChange={handleInputChange}
                  value={user.full_name}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                  placeholder="Nguyen Van A"
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="mb-2 text-sm font-medium">
                  Position
                </label>
                <select
                  id="role"
                  value={user.role}
                  onChange={handleInputChange}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5"
                  required
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="EMPLOYEE">EMPLOYEE</option>
                </select>
              </div>
              <div>
                <label htmlFor="email" className="mb-2 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                  placeholder="text@gmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="mb-2 text-sm font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  value={user.gender}
                  onChange={handleInputChange}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5"
                  required
                >
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="mb-2 text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                id="address"
                onChange={handleInputChange}
                value={user.address}
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                placeholder="Ward 12, Go Vap District, Ho Chi Minh City, Vietnam"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="mb-2 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={handleInputChange}
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                placeholder="•••••••••"
                required
              />
            </div>
            <div className="flex justify-end items-center gap-4 mt-8">
              <button
                className={`h-10 rounded-full flex items-center px-6 font-medium text-sm text-white hover:bg-cyan-400 bg-cyan-500`}
              >
                Save
              </button>
              <Link to="/users">
                <button
                  className={`h-10 rounded-full flex items-center px-6 font-medium text-sm text-white bg-cyan-500 hover:bg-cyan-400`}
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddEditMember;
