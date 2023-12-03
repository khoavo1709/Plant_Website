import { useAtom } from "jotai";
import { addEditMember } from "../../hooks/headerHooks";
import Button from "../Button/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface AddEditMemberProps {
  getUsers: () => void;
}

const AddEditMember: React.FC<AddEditMemberProps> = ({ getUsers }) => {
  const [isOpenAddMemberPopup, setIsOpenAddEditMemberPopup] =
    useAtom(addEditMember);
  const openAddMemberPopup = () => {
    setIsOpenAddEditMemberPopup(!isOpenAddMemberPopup);
  };

  const { id } = useParams();

  const [user, setUser] = useState({
    id: null,
    name: "",
    full_name: "",
    mobile: "",
    role: "",
    address: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const onSubmit = () => {
    if (!window.confirm("Are you sure you want to add a new user?")) {
      return;
    }
    const url = id
      ? `http://localhost:8000/api/users/${id}`
      : "http://localhost:8000/api/users";

    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
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
      .then((data) => {
        console.log("Data from the server:", data);
        getUsers();
        openAddMemberPopup();
        window.alert("Add user successfully");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
      <div className="text-xl font-bold m-2">Create new member</div>
      <form className="p-4">
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
            <input
              type="text"
              id="role"
              onChange={handleInputChange}
              value={user.role}
              className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
              placeholder="Staff"
              required
            />
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
          <label htmlFor="email" className="mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleInputChange}
            value={user.email}
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
            value={user.password}
            className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password_confirmation"
            className="mb-2 text-sm font-medium"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="password_confirmation"
            onChange={handleInputChange}
            value={user.password_confirmation}
            className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              onChange={handleInputChange}
              value=""
              className="w-4 h-4 border border-gray-300 rounded-xl outline-none"
              required
            />
          </div>
          <label htmlFor="" className="ml-4 text-sm font-medium">
            I agree with the{" "}
            <a href="#" className="text-blue-500 hover:underline">
              terms and conditions
            </a>
            .
          </label>
        </div>
        <div className="flex justify-end items-center gap-4">
          <Button
            text="Save"
            onclickFunc={onSubmit}
            background="bg-cyan-500"
            hoverBackground="hover:bg-cyan-400"
          />
          <Button
            text="Cancel"
            onclickFunc={openAddMemberPopup}
            background="bg-cyan-500"
            hoverBackground="hover:bg-cyan-400"
          />
        </div>
      </form>
    </div>
  );
};

export default AddEditMember;
