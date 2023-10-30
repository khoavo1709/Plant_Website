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
    <div className="grid grid-rows-4 sm:mx-8 bg-gray-100">
      <div className="row-span-2 ">
        <div className="sm:grid grid-cols-4 sm:m-4 mx-4 gap-4  ">
          <div className="rounded-2xl col-span-3 p-8 bg-white mt-4 sm:mt-0 overflow-x-auto">
            <table className="w-full">
              <thead className="text-lg font-medium">
                <tr className=" hidden md:table-row md: border-b-2">
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Products Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>

                  
                  <th scope="col" className="px-6 py-3 text-left">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </tbody>
            </table>
            <div className=" items-end float-right pr-2 text-blue-500">
              <a href="../">Continue shopping</a>
            </div>
          </div>
          <div className=" flex pt-4 justify-center rounded-2xl col-span-1 bg-white mt-4 sm:mt-0 ">
            <div className="">
              <h1 className="text-4xl font-semibold mb-6">Order summary</h1>
              <div className="flex justify-between my-4">
                <p className="text-lg">Total price:</p>
                <p className="text-lg">
                  $
                  {cartItems.reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0
                  )}
                </p>
              </div>
              <p className="text-sm text-gray-500">Shipping fee not included</p>
              <button className="w-full bg-[#319795] my-4 rounded-xl text-white p-2 ">
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-2 mx-4 rounded-2xl mt-4 sm:mt-0 p-8 bg-white">
        <h1 className="text-2xl font-semibold mb-6">Payment Information</h1>
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
            <input
              id="address"
              name="address"
              value={formData.address}
              className="w-full px-3 py-2 border rounded outline-green-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
