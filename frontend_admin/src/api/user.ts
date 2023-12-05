import { useState } from "react";

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

  export const getUsers = () => {
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

  export const onDeleteClick = (user: any) => {
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
