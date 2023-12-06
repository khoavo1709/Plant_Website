import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";


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

  const caculateTotal = () => {
    let total = 0;
    formData.products.forEach((product: IProduct) => {
      total += product.pivot.quantity * product.pivot.price;
    });
    return total;
  };

  const submitForm = () => {
    if (!window.confirm("Are you sure you want to edit this order?")) {
      return;
    }
    fetch(`http://localhost:8000/api/purchases/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        mobile: formData.mobile,
        address: formData.address,
        status: formData.status,
        note: formData.note,
        total: caculateTotal(),
        products: formData.products.map((product: IProduct) => {
          return {
            product_id: product.id,
            quantity: product.pivot.quantity,
          };
        }),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Order updated successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error updating order");
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
            price: product.pivot.price,
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
      <div className="background-main-page p-2">
        <div className="m-5 bg-white p-4 rounded-2xl shadow-lg">
          <h1 className="text-xl font-bold m-2">Edit Order</h1>
          <form className="grid grid-cols-2">
            <div className=" col-span-1">
              <label
                htmlFor="customerName"
                className="mb-2 text-sm font-medium"
              >
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
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                id="note"
              />

              <label htmlFor="total">Total</label>
              <input
                value={"$" + caculateTotal()}
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                
                type="text"
                id="total"
                readOnly
              />
            </div>

            <div className=" col-span-1 m-8">
              <table className="text-sm text-left ">
                <thead className="uppercase border-b">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Unit Price
                    </th>

                    <th scope="col" className="px-6 py-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.products.map((product: IProduct) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">
                        <img
                          className="w-20 h-20"
                          src={product.image}
                          alt={product.name}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          className="w-20 h-10 text-center border"
                          type="number"
                          value={product.pivot.quantity}
                          onChange={(e) =>
                            updateProduct(product.id, parseInt(e.target.value))
                          }
                        />
                      </td>
                      <td className="px-6 py-4">${product.pivot.price}</td>

                      <td className="flex px-6 py-4 justify-end text-slate-400">
                        <div className="px-2">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className=" my-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600"
              onClick={submitForm}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ViewEditOrder;
