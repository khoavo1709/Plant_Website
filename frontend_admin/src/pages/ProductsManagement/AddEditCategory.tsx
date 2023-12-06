import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useAtomValue } from "jotai";
import { isAdd } from "../../hooks/createEdit";

const AddEditMember = () => {
  var token = localStorage.getItem("token");

  const navigate = useNavigate();

  const isCreateCategory = useAtomValue(isAdd);

  const { id } = useParams();

  const [category, setCategory] = useState({
    id: null,
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [id]: value,
    }));
  };

  if (id) {
    useEffect(() => {
      fetch(`http://localhost:8000/api/categories/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: token ? token : "",
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
          setCategory(data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }, []);
  }

  const onSubmit = async (e: any) => {
    if (!window.confirm("Are you sure you want to add/edit a new category?")) {
      return;
    }
    e.preventDefault();
    const url = id
      ? `http://127.0.0.1:8000/api/categories/${id}`
      : "http://127.0.0.1:8000/api/categories";

    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
      body: JSON.stringify(category),
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
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
        console.error("Error adding category:", error);
        window.alert(error);
      });
  };

  return (
    <main>
      <Header />
      <div className="background-main-page p-2">
        <div className="m-5 bg-white p-4 rounded-2xl shadow-lg mb-8">
          <div className="text-xl font-bold px-4 my-4">
            {isCreateCategory
              ? "Create new category"
              : `Edit category:  ${category.name}`}
          </div>
          <form className="p-4" onSubmit={onSubmit}>
            <div className="grid gap-4 mb-6 grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 text-sm font-medium">
                  Category name
                </label>
                <input
                  type="text"
                  id="name"
                  value={category.name}
                  onChange={handleInputChange}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                  placeholder="0903702000"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end items-center gap-4 mt-8">
              <button
                className={`h-10 rounded-full flex items-center px-6 font-medium text-sm text-white hover:bg-cyan-400 bg-cyan-500`}
              >
                Save
              </button>
              <Link to="/products">
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
