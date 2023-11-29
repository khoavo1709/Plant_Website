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
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (data) {
      setTotalPrice(
        cart.cartItems.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
      );
    } else {
      console.log('No data found in localStorage');
    }
  }, [cart]);
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
    //show confirm dialog with total price
    //if user click ok, submit form
    //else do nothing

    const totalPrice = cart.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    if (confirm('Total price: $' + totalPrice +'\nConfirm checkout?')) {
      console.log('Form submitted:', formData);
      console.log('Cart submitted:', cart);
      storePurchaseData();
    }
  };
  return (
    <div className=" max-w-screen-xl mx-auto grid grid-rows-4 bg-gray-100">
      <div className="row-span-2 ">
        <div className="md:grid grid-cols-4 sm:m-4 mx-4 gap-4  ">
          <div className="rounded-2xl col-span-4 p-8 bg-white mt-4 sm:mt-0 overflow-x-auto">
            {cart ? (
              <CartTable cartItems={cart.cartItems} />
            ) : (
              <p className="text-xl text-left font-semibold">
                No items in cart
              </p>
            )}

            <div className=" items-end float-right pr-2 text-blue-500">
              <a href="../">Continue shopping</a>
            </div>
            <button
              className="w-full bg-[#319795] my-4 rounded-xl text-white p-2 "
              onClick={checkOutSubmit}
            >
              CHECKOUT
            </button>
          </div>
          {/* <div className=" flex p-2 pt-4 justify-center rounded-2xl col-span-1 bg-white mt-4 md:mt-0 ">
            <div className="">
              <h1 className="text-xl font-semibold mb-6">Order summary</h1>
              <div className="flex justify-between my-4">
                <p className="text-lg">Total price:</p>
                <p className="text-lg">
                  $
                  {cart
                    ? cart.cartItems.reduce((total, item) => {
                        return total + item.price * item.quantity;
                      }, 0)
                    : 0}
                </p>
              </div>
              <p className="text-sm text-gray-500">Shipping fee not included</p>
            </div>
          </div> */}
        </div>
      </div>
      <div className="row-span-2 mx-4 rounded-2xl mt-4 sm:mt-0 p-8 bg-white">
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
