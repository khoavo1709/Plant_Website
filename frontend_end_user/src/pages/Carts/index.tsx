import React, { useEffect, useState } from 'react';
import CartTable from '../../components/CartTable';
import { CartItem } from '../../../types/cart-item';

type Cart = {
  cartItems: CartItem[];
};

const Cart = ({}) => {
  const data = localStorage.getItem('cart');

  const parsedData: CartItem[] = data ? JSON.parse(data) : [];
  let cart: Cart = {
    cartItems: parsedData,
  };
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
  });
  
  useEffect(() => {
    const data = localStorage.getItem('cart');
    const parsedData: CartItem[] = data ? JSON.parse(data) : [];
    cart = {
      cartItems: parsedData,
    };
  }, []);

  const totalPrice = cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const storePurchaseData = async () => {
    const purchaseData = {
      customer_name: formData.name,
      customer_email: formData.email,
      mobile: formData.phoneNumber,
      status: 'PENDING',
      total: totalPrice,
      address: formData.address,
      note: 'This is an optional note.',
      products: cart.cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await fetch('http://localhost:8000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });

      if (response.ok) {
        alert('Purchase data sent successfully');
        // Clear cart
        localStorage.removeItem('cart');
        window.location.href = '../carts';
        // You can handle further actions after successful data submission
      } else {
        alert('Failed to send purchase data');
        // Handle error cases
      }
    } catch (error) {
      console.error('Error while sending purchase data:', error);
      // Handle network errors
    }
  };

  const checkOutSubmit = () => {
    if (!cart || cart.cartItems.length === 0) {
      alert('No items in cart');
      return;
    }

    if (confirm('Total price: $' + totalPrice + '\nConfirm checkout?')) {
      console.log('Form submitted:', formData);
      console.log('Cart submitted:', cart);
      storePurchaseData();
    }
  };
  return (
    <div className=" w-full max-w-5xl mx-auto md:grid md:grid-cols-3 md:gap-2 md:justify-center bg-gray-100">
      <div className=" rounded-2xl md:col-span-2 bg-white p-4">
        <div className=" overflow-x-auto">
          {cart ? (
            <CartTable cartItems={cart.cartItems} />
          ) : (
            ''
          )}

          <div className=" items-end float-right pr-2 text-blue-500">
            <a href="../">Continue shopping</a>
          </div>
        </div>
      </div>
      <div className=" rounded-2xl md:col-span-1 bg-white p-4">
        <h1 className="text-xl font-semibold mb-6">Payment Information</h1>
        <form className="w-full">
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
              required
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
              required
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
              required
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
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded outline-green-200"
            />
          </div>
          {/* <p className="text-lg font-semibold mt-4">
            Total Price: ${totalPrice}
          </p> */}
        </form>
        <button
          className="w-full bg-[#319795] my-4 rounded-xl text-white p-2 "
          onClick={checkOutSubmit}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
