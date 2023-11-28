import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

type ProductInOrder = {
  product_id: number;
  quantity: number;
  price: number;
};

type IProduct = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  pivot: {
    purchase_id: number;
    product_id: number;
    quantity: number;
    price: number;
  };
};

const ViewEditOrder = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    mobile: "",
    address: "",
    total: "",
    status: "",
    note: "",
    products: [] as IProduct[],
  });

  useEffect(() => {
    // Fetch data from the backend API by ID
    fetch(`http://localhost:8000/api/purchases/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Populate formData with the fetched data
        setFormData(data.purchase);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const submitForm = () => {
    const products = formData.products.map((product: IProduct) => {
      return {
        product_id: product.id,
        quantity: product.pivot.quantity,
        price: product.pivot.price,
      };
    });
    const url = `http://localhost:8000/api/purchases/${id}`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        mobile: formData.mobile,
        address: formData.address,
        total: formData.total,
        status: formData.status,
        note: formData.note,
        products: products as ProductInOrder[],
      }),
    };
    alert(
      JSON.stringify({
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        mobile: formData.mobile,
        address: formData.address,
        total: formData.total,
        status: formData.status,
        note: formData.note,
        products: products as ProductInOrder[],
      })
    );

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert("Edit successful: " + JSON.stringify(data));
      })
      .catch((error) => {
        alert("Error editing data: " + error.message);
      });
  };

  const updateProduct = (productId: number, newQuantity: number) => {
    // Update the quantity of a specific product in the order
    const updatedProducts = formData.products.map((product: IProduct) => {
      if (product.id === productId) {
        // Update the product quantity
        return {
          ...product,
          pivot: {
            quantity: newQuantity,
          },
        };
      }
      return product;
    });

    // Update the formData state with the new products array
    setFormData({
      ...formData,
      products: updatedProducts as IProduct[],
    });
  };

  const removeProduct = (productId: number) => {
    // Remove a specific product from the order
    const updatedProducts = formData.products.filter(
      (product) => product.id !== productId
    );

    // Update the formData state with the new products array
    setFormData({
      ...formData,
      products: updatedProducts,
    });
  };
  return (
    <main>
      <Header />
      <h1 className="text-xl font-bold m-2">Edit Order</h1>
      <form className="grid grid-cols-2">
        <div className=" col-span-1">
          <label htmlFor="customerName" className="mb-2 text-sm font-medium">
            Customer Name:
          </label>
          <input
            value={formData.customer_name}
            className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5"
            onChange={(e) =>
              setFormData({ ...formData, customer_name: e.target.value })
            }
            type="text"
            id="customerName"
          />

          <label htmlFor="customerEmail">Customer Email:</label>
          <input
            value={formData.customer_email}
            className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
            onChange={(e) =>
              setFormData({ ...formData, customer_email: e.target.value })
            }
            type="email"
            id="customerEmail"
          />

          <label htmlFor="customerPhone">Customer Phone</label>
          <input
            value={formData.mobile}
            className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            type="text"
            id="customerPhone"
          />

          <label htmlFor="customerAddress">Customer Address</label>
          <input
            value={formData.address}
            className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            type="text"
            id="customerAddress"
          />

          <label htmlFor="status">Status</label>
          <select
            value={formData.status}
            className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            id="status"
          >
            <option value="PENDING">PENDING</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <label htmlFor="note">Note</label>
          <textarea
            value={formData.note}
            className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            id="note"
          />

          <label htmlFor="total">Total</label>
          <input
            value={formData.total}
            className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
            onChange={(e) =>
              setFormData({ ...formData, total: e.target.value })
            }
            type="text"
            id="total"
          />
        </div>
        <div className=" col-span-1 ml-8">
          <h2 className="text-lg font-bold ">Products</h2>
          {formData.products.map((product: IProduct) => (
            <div key={product.id} className="flex items-center border-b-2">
              <img
                className="w-20 h-20 object-cover rounded-xl"
                src={product.image}
                alt={product.name}
              />

              <div className="ml-4 grid grid-flow-col gap-8 place-content-center">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-sm font-medium">
                  {/* Display quantity and price */}
                  {product.pivot.quantity} x ${product.pivot.price}
                </p>
                {/* Input for updating quantity */}
                <input
                  type="number"
                  title="quantity"
                  value={product.pivot.quantity}
                  className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-20 p-2.5 text-center"
                  onChange={(e) =>
                    updateProduct(product.id, parseInt(e.target.value, 10))
                  }
                />
                {/* Button for removing the product */}
                <button
                  title="delete"
                  onClick={() => removeProduct(product.id)}
                  className="m-2 bg-red-100 border border-gray-300 text-sm rounded-xl outline-none"
                >
                  <TrashIcon
                    title="Delete"
                    titleId="delete"
                    className=" w-5 h-5 text-gray-500 hover:text-red-500"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className=" my-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600"
          onClick={submitForm}
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default ViewEditOrder;
