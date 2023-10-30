import React, { useEffect, useState } from 'react';
import CartItem from '../../components/CartItem/CartItem';
export interface Product {
  id: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
}
interface CartProps {
  cartItems: Product[];
  getTitleFromRoute: (url: string) => string;
}

const Cart: React.FC<CartProps> = ({ cartItems, getTitleFromRoute }) => {
  useEffect(() => {
    const title = getTitleFromRoute(window.location.pathname);
    document.title = title;
  }, [getTitleFromRoute]);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  return (
    <div className="container mx-auto mt-10 flex flex-wrap gap-3">
      <div className="w-full lg:w-[65%] lg:pr-6 p-2 border rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-6">My Cart</h1>
        <table className="w-full">
          <tr className=" hidden mb-4 md:table-row">
            <th className="text-lg font-semibold">Image</th>
            <th className="text-lg font-semibold">Products Name</th>
            <th className="text-lg font-semibold">Quantity</th>
            <th className="text-lg font-semibold">Price</th>
            <th className="text-lg font-semibold"></th>
          </tr>
          {cartItems.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </table>
        <div className=" items-end float-right pr-2 text-blue-500">
          <a href="../">Continue shopping</a>
        </div>
        <hr className="my-6" />
      </div>
      <div className="w-full lg:w-[33%] lg:pl-6 text-right lg:pr-6 p-2 border rounded shadow-md lg:sticky lg:top-4">
        <h1 className="text-2xl font-semibold mb-6 text-left">Order summary</h1>

        <p className="text-lg">
          Total price: $
          {cartItems.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          )}
        </p>
        <p className="text-sm text-gray-500">Shipping fee not included</p>
        <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded">
          CHECKOUT
        </button>
      </div>
      <div className="w-full lg:w-[65%] lg:pl-6 p-2 border rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Shipment Infomation</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded outline-green-200 "
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded outline-green-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded outline-green-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              className="w-full px-3 py-2 border rounded outline-green-200"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded float-right "
          >
            Submit
          </button>{' '}
        </form>
      </div>
    </div>
  );
};

export default Cart;
