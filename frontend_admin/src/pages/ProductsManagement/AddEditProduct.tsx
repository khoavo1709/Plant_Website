import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useAtomValue } from "jotai";
import { isAdd } from "../../hooks/createEdit";
import ListCategories from "../../components/Dropdown/ListCategories";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface Product {
  id: null;
  name: string;
  title: string;
  type: string;
  description: string;
  price: string;
  quantity: string;
  categories: Category[];
  image: string;
}

interface Image {
  image: File | null;
}

interface Category {
  id: number;
  name: string;
}

const AddEditProduct = () => {
  var token = localStorage.getItem("token");
  const navigate = useNavigate();
  const isCreateProduct = useAtomValue(isAdd);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { id } = useParams();
  const [productImage, setProductImage] = useState<Image>({
    image: null,
  });
  const [product, setProduct] = useState<Product>({
    id: null,
    name: "",
    title: "",
    type: "PLANT",
    description: "",
    price: "",
    quantity: "",
    categories: [],
    image: "",
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(
    product.image as string
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setProductImage((prevProductImage) => ({
        ...prevProductImage,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoriesChange = (selectedCategoryIds: number[]) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      categories: categories.filter((category) =>
        selectedCategoryIds.includes(category.id)
      ),
    }));
  };

  useEffect(() => {
    getCategories();
    if (id) {
      fetch(`http://localhost:8000/api/products/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: token ? token : "",
        },
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 401) {
              localStorage.clear();
              navigate("/login");
            }
          }
          return response.json();
        })
        .then((data) => {
          setProduct(data);
          setImagePreviewUrl(data.image);
          console.log(imagePreviewUrl);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, []);

  const getCategories = () => {
    fetch("http://127.0.0.1:8000/api/categories", {
      headers: {
        Accept: "application/json",
        Authorization: token ? token : "",
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
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

  const onSubmit = async (e: any) => {
    if (!window.confirm("Are you sure you want to add/edit a new user?")) {
      return;
    }
    e.preventDefault();

    const url = id
      ? `http://127.0.0.1:8000/api/products/${id}`
      : "http://127.0.0.1:8000/api/products";

    let formData = new FormData();

    formData.append("name", product.name);
    formData.append("title", product.title);
    formData.append("type", product.type);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    if (productImage.image) {
      formData.append("image", productImage.image);
    }
    formData.append(
      "category_ids",
      product.categories.map((category) => category.id).join(",")
    );

    if (url === `http://127.0.0.1:8000/api/products/${id}`) {
      formData.append("_method", "PUT");
    }

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: token ? token : "",
      },
      body: formData,
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
      .then(() => {
        navigate("/products");
        window.alert("Add/Edit product successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
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
            <div className="grid gap-4 mb-4 grid-cols-2">
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
                  placeholder="Product name"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="mb-2 text-sm font-medium">
                  Type
                </label>
                <div
                  className="relative flex items-center"
                  onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                  onBlur={() => setIsOpenDropdown(!isOpenDropdown)}
                >
                  <select
                    id="type"
                    value={product.type}
                    onChange={handleInputChange}
                    className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none appearance-none w-full p-2.5"
                    required
                  >
                    <option value="PLANT">PLANT</option>
                    <option value="ACCESSORY">ACCESSORY</option>
                  </select>
                  <div className="absolute right-2 mt-2">
                    <ChevronDownIcon
                      className={`h-4 w-4 ${
                        isOpenDropdown ? "transform rotate-180" : ""
                      } transition-transform w-4 h-4 text-gray-500`}
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-4 grid-cols-2">
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
                    placeholder="Product price"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-2 text-sm font-medium"
                  >
                    Quantity
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    value={product.quantity}
                    onChange={handleInputChange}
                    className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                    placeholder="Product quantity"
                    required
                  />
                </div>
              </div>
              <ListCategories
                label="Categories"
                options={categories}
                selectedOptions={product.categories.map(
                  (category) => category.id
                )}
                onChange={handleCategoriesChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="mb-2 text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={product.title}
                onChange={handleInputChange}
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                placeholder="Product title"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                rows={5}
                value={product.description}
                onChange={handleInputChange}
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5"
                placeholder="Product description"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imageFile" className="mb-2 text-sm font-medium">
                Upload Image
              </label>
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Image Preview"
                  className="mt-2 w-20 h-auto"
                />
              )}
              <input
                type="file"
                id="imageFile"
                onChange={handleImageUpload}
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5"
              />
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

export default AddEditProduct;
