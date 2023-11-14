import React, { useState } from 'react';
import CartTable from '../../components/CartTable';
import { Cart, CartItems } from '../../../types/cart';

const cartItems: CartItems[] = [
  {
    product: {
      id: 1,
      type: 'PLANT',
      name: 'Monstera Deliciosa',
      description: 'A large, tropical plant with distinctive leaves.',
      price: 49.99,
      image:
        'https://imgs.search.brave.com/Vl-dYuhNCupoRhhGC1PT90FksMxsjxHdD_lmtn08SBk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9wZWFj/ZS1saWx5LXBsYW50/LWluLWEtYnJpZ2h0/LWhvbWUtcm95YWx0/eS1mcmVlLWltYWdl/LTE2NTkwMjU0NTUu/anBnP2Nyb3A9MC42/Njh4dzoxLjAweGg7/MC4wMTcweHcsMCZy/ZXNpemU9OTgwOio',
      quantity: 10,
      careInstructions: {
        light: 'Bright, indirect light',
        water: 'Water when the top inch of soil is dry',
        humidity: 'High humidity is preferred',
      },
    },
    quantity: 1,
    unitPrice: 49.99,
  },
  {
    product: {
      id: 2,
      type: 'PLANT',
      name: 'Snake Plant',
      description:
        'A low-maintenance plant that is tolerant of low light and infrequent watering.',
      price: 19.99,
      image:
        'https://imgs.search.brave.com/Vl-dYuhNCupoRhhGC1PT90FksMxsjxHdD_lmtn08SBk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9wZWFj/ZS1saWx5LXBsYW50/LWluLWEtYnJpZ2h0/LWhvbWUtcm95YWx0/eS1mcmVlLWltYWdl/LTE2NTkwMjU0NTUu/anBnP2Nyb3A9MC42/Njh4dzoxLjAweGg7/MC4wMTcweHcsMCZy/ZXNpemU9OTgwOio',
      quantity: 15,
      careInstructions: {
        light: 'Low to medium light',
        water: 'Water when the soil is completely dry',
        humidity: 'Any humidity level',
      },
    },
    quantity: 1,
    unitPrice: 49.99,
  },
  {
    product: {
      id: 3,
      type: 'PLANT',
      name: 'Pothos',
      description:
        'A fast-growing and easy-to-care-for plant that is perfect for beginners.',
      price: 14.99,
      image:
        'https://imgs.search.brave.com/Vl-dYuhNCupoRhhGC1PT90FksMxsjxHdD_lmtn08SBk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9wZWFj/ZS1saWx5LXBsYW50/LWluLWEtYnJpZ2h0/LWhvbWUtcm95YWx0/eS1mcmVlLWltYWdl/LTE2NTkwMjU0NTUu/anBnP2Nyb3A9MC42/Njh4dzoxLjAweGg7/MC4wMTcweHcsMCZy/ZXNpemU9OTgwOio',
      quantity: 20,
      careInstructions: {
        light: 'Bright, indirect light',
        water: 'Water when the top inch of soil is dry',
        humidity: 'Any humidity level',
      },
    },
    quantity: 1,
    unitPrice: 49.99,
  },
];
const cart: Cart = {
  cartItems: cartItems,
  totalPrice: cartItems
    .map((item) => item.unitPrice * item.quantity)
    .reduce((a, b) => a + b, 0),
};
localStorage.setItem('cart', JSON.stringify(cart));
const Cart = ({}) => {
  const data = localStorage.getItem('cart');
  const [cart, setCart] = useState<Cart>({
    cartItems: [],
    totalPrice: 0,
  });
  if (data && cart.cartItems.length == 0) {
    setCart(JSON.parse(data));
  } else if (!data) {
    console.log('No data found in localStorage');
  }
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
  });
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const updatedCart = {
      ...cart,
      cartItems: cart.cartItems.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      }),
    };
    setCart(updatedCart);
  };
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
  const checkOutSubmit = () => {
    console.log('Form submitted:', formData);
    console.log('Cart submitted:', cart);
  };
  return (
    <div className=" max-w-screen-xl mx-auto grid grid-rows-4 bg-gray-100">
      <div className="row-span-2 ">
        <div className="md:grid grid-cols-4 sm:m-4 mx-4 gap-4  ">
          <div className="rounded-2xl col-span-3 p-8 bg-white mt-4 sm:mt-0 overflow-x-auto">
            {cart ? (
              <CartTable
                cartItems={cart.cartItems}
                onQuantityChange={handleQuantityChange}
              />
            ) : (
              <p className="text-xl text-left font-semibold">
                No items in cart
              </p>
            )}

            <div className=" items-end float-right pr-2 text-blue-500">
              <a href="../">Continue shopping</a>
            </div>
          </div>
          <div className=" flex p-2 pt-4 justify-center rounded-2xl col-span-1 bg-white mt-4 md:mt-0 ">
            <div className="">
              <h1 className="text-xl font-semibold mb-6">Order summary</h1>
              <div className="flex justify-between my-4">
                <p className="text-lg">Total price:</p>
                <p className="text-lg">${cart.totalPrice}</p>
              </div>
              <p className="text-sm text-gray-500">Shipping fee not included</p>
              <button
                className="w-full bg-[#319795] my-4 rounded-xl text-white p-2 "
                onClick={checkOutSubmit}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-2 mx-4 rounded-2xl mt-4 sm:mt-0 p-8 bg-white">
        <h1 className="text-xl font-semibold mb-6">Payment Information</h1>
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
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded outline-green-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
