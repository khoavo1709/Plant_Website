import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useAtomValue } from "jotai";
import { isAdd } from "../../hooks/createEdit";

const AddEditMember = () => {
  const navigate = useNavigate();

  const isCreateProduct = useAtomValue(isAdd);

  const { id } = useParams();

  const [product, setProduct] = useState({
    id: null,
    name: "",
    title: "",
    type: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  if (id) {
    useEffect(() => {
      fetch(`http://localhost:8000/api/products/${id}`, {
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
          setProduct(data);
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
      ? `http://127.0.0.1:8000/api/products/${id}`
      : "http://127.0.0.1:8000/api/products";

    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
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
        console.error("Error adding product:", error);
        window.alert(error);
      });
  };

  return (
    <main>
      <Header />
      <div className="background-main-page p-2">
        <div className="m-5 bg-white p-4 rounded-2xl shadow-lg mb-8">
          <div className="text-xl font-bold px-4 my-4">
            {isCreateProduct
              ? "Create new product"
              : `Edit product:  ${product.name}`}
          </div>
          <form className="p-4" onSubmit={onSubmit}>
            <div className="grid gap-4 mb-6 grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 text-sm font-medium">
                  Product name
                </label>
                <input
                  type="text"
                  id="name"
                  value={product.name}
                  onChange={handleInputChange}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5"
                  placeholder="abc"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="mb-2 text-sm font-medium">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  value={product.price}
                  onChange={handleInputChange}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                  placeholder="text@gmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="mb-2 text-sm font-medium">
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  onChange={handleInputChange}
                  value={product.type}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                  placeholder="Nguyen Van A"
                  required
                />
              </div>
              <div>
                <label htmlFor="quantity" className="mb-2 text-sm font-medium">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  value={product.quantity}
                  onChange={handleInputChange}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                  placeholder="text@gmail.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="title" className="mb-2 text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={product.title}
                onChange={handleInputChange}
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                placeholder="0903702000"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                rows={5}
                value={product.description}
                onChange={handleInputChange}
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5"
                placeholder="Enter product description"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="mb-2 text-sm font-medium">
                Image
              </label>
              <input
                type="text"
                id="image"
                onChange={handleInputChange}
                value={product.image}
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                placeholder="Ward 12, Go Vap District, Ho Chi Minh City, Vietnam"
                required
              />
            </div>
            {/* <div className="mb-4">
              <label htmlFor="imageFile" className="mb-2 text-sm font-medium">
                Upload Image
              </label>
              <input
                type="file"
                id="imageFile"
                value={product.image}
                // onChange={handleImageUpload}
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5"
                required
              />
            </div> */}
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
