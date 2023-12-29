import { Link, useNavigate } from "react-router-dom";
import SearchTextBox from "../../components/Filter/SearchTextBox";
import Header from "../../components/Header";
import { TrashIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { isAdd } from "../../hooks/createEdit";
import Dropdown from "../../components/Filter/Dropdown";

const ProductsManagement = () => {
  var token = localStorage.getItem("token");
  const navigate = useNavigate();
  interface Product {
    id: number;
    name: string;
    title: string;
    type: string;
    description: string;
    price: number;
    quantity: string;
    image: string;
    created_at: Date;
    updated_at: Date;
  }
  interface Category {
    id: number;
    name: string;
  }

  const setProductCreate = useSetAtom(isAdd);
  const setCategoryCreate = useSetAtom(isAdd);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  useEffect(() => {
    getProducts("", "");
    getCategories();
  }, []);

  const getProducts = (name: string, type: string) => {
    const url =
      type === "ALL"
        ? `http://127.0.0.1:8000/api/products?searchProductName=${name}`
        : `http://127.0.0.1:8000/api/products?${
            name ? `&searchProductName=${name}` : ""
          }${type ? `type=${type}` : ""}`;

    setProductName(name);
    setSelectedType(type);
    fetch(url, {
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
        setProducts(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const onDeleteProductClick = (product: any) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    fetch(`http://localhost:8000/api/products/${product.id}`, {
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
        getProducts("", "");
        window.alert("Product deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const getCategories = () => {
    fetch("http://127.0.0.1:8000/api/categories", {
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
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const onDeleteCategoryClick = (category: any) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    fetch(`http://localhost:8000/api/categories/${category.id}`, {
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
          if (response.status == 500) {
            throw new Error("");
          }
        }
      })
      .then(() => {
        getCategories();
        window.alert("Category deleted successfully");
      })
      .catch((error) => {
        window.alert("Can not delete category");
        console.error("Error deleting category:", error);
      });
  };

  return (
    <main>
      <Header />
      <div className="background-main-page p-2 min-h-screen">
        <div className="pr-4 pl-1">
          <div className="flex items-center pt-2 px-5">
            <div className="font-bold text-lg">List Products</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <SearchTextBox
                placeHolder="Product name"
                getValue={(value) => getProducts(value, selectedType)}
                icon={<MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />}
              />
              <Dropdown
                placeHolder="Product Type"
                openDropdown={() => setIsOpenDropdown(!isOpenDropdown)}
                selectValue={(value) => getProducts(productName, value)}
                icon={
                  <ChevronDownIcon
                    className={`h-4 w-4 ${
                      isOpenDropdown ? "transform rotate-180" : ""
                    } transition-transform w-4 h-4 text-gray-500`}
                  />
                }
              />
            </div>
            <Link
              to="/products/createProduct"
              onClick={() => setProductCreate(true)}
              className="h-10 rounded-full flex items-center gap-2 pl-4 pr-6 font-medium text-sm text-white bg-cyan-500 hover:bg-cyan-400"
            >
              <PlusIcon className="text-cyan-50 w-5 h-5 stroke-2" />
              Add Product
            </Link>
          </div>
        </div>
        <div className="m-5 bg-white p-4 rounded-2xl shadow-md">
          <table className="text-sm text-left w-full">
            <thead className="uppercase border-b">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Product name
                </th>
                <th scope="col" className="px-6 py-4">
                  Title
                </th>
                <th scope="col" className="px-6 py-4">
                  Type
                </th>
                <th scope="col" className="px-6 py-4">
                  Price
                </th>
                <th scope="col" className="px-6 py-4">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-4">
                  Product image
                </th>
                <th scope="col" className="px-6 py-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.title}</td>
                  <td className="px-6 py-4">{product.type}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">
                    <img src={product.image} alt="" className="h-20 w-20" />
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    <div className="flex justify-end">
                      <div className="px-2">
                        <Link to={"/products/editProduct/" + product.id}>
                          <InformationCircleIcon
                            title="Info"
                            onClick={() => setProductCreate(false)}
                            className="hover:text-blue-500 hover:ease-in-out hover:scale-125 h-5"
                          />
                        </Link>
                      </div>
                      <div className="px-2">
                        <TrashIcon
                          title="Delete"
                          onClick={() => onDeleteProductClick(product)}
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
        <div className="pr-4 pl-1">
          <div className="flex items-center pt-2 px-5">
            <div className="font-bold text-lg">List Categories</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              {/* <SearchTextBox
                placeHolder="User name"
                icon={<MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />}
              /> */}
            </div>
            <Link
              to="/products/createCategory"
              onClick={() => setProductCreate(true)}
              className="h-10 rounded-full flex items-center gap-2 pl-4 pr-6 font-medium text-sm text-white bg-cyan-500 hover:bg-cyan-400"
            >
              <PlusIcon className="text-cyan-50 w-5 h-5 stroke-2" />
              Add Category
            </Link>
          </div>{" "}
        </div>
        <div className="m-5 bg-white p-4 rounded-2xl shadow-md">
          <table className="text-sm text-left w-full">
            <thead className="uppercase border-b">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Category name
                </th>
                <th scope="col" className="px-6 py-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{category.name}</td>
                  <td className="px-6 py-4 text-slate-400">
                    <div className="flex justify-end">
                      <div className="px-2">
                        <Link to={"/products/editCategory/" + category.id}>
                          <InformationCircleIcon
                            title="Info"
                            onClick={() => setCategoryCreate(false)}
                            className="hover:text-blue-500 hover:ease-in-out hover:scale-125 h-5"
                          />
                        </Link>
                      </div>
                      <div className="px-2">
                        <TrashIcon
                          title="Delete"
                          onClick={() => onDeleteCategoryClick(category)}
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

export default ProductsManagement;
