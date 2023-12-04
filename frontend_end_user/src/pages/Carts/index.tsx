import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import { objectToCamel } from 'ts-case-convert';
import { useLoaderData } from 'react-router-dom';
import { getProductsByIDsResponse } from '../../api/get-products-by-ids';
import { useEffect, useState } from 'react';

type Cart = {
  cartItems: CartItem[];
};

const Cart = () => {
  const { data: products } = objectToCamel(
    useLoaderData() as object
  ) as getProductsByIDsResponse;

  const [productsInCart, setProductsInCart] = useState<Product[]>([]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    setProductsInCart(products);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [productsInCart]);

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    note: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getQuantityInCart = (id: number) => {
    const data = localStorage.getItem('cart');
    const parsedData: CartItem[] = data ? JSON.parse(data) : [];
    const index = parsedData.findIndex((cartitem) => cartitem.productID == id);
    return parsedData[index].quantity;
  };

  const adjustQuantity = (amount: number, id: number) => {
    if (amount === 0) {
      return;
    }
    const data = localStorage.getItem('cart');
    const parsedData: CartItem[] = data ? JSON.parse(data) : [];
    const index = parsedData.findIndex((cartitem) => cartitem.productID == id);
    parsedData[index].quantity += amount;
    localStorage.setItem('cart', JSON.stringify(parsedData));
  };

  const deleteItem = (id: number) => {
    const data = localStorage.getItem('cart');
    const parsedData: CartItem[] = data ? JSON.parse(data) : [];
    const index = parsedData.findIndex((cartitem) => cartitem.productID == id);
    parsedData.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(parsedData));
    window.location.reload();
  };
  const storePurchaseData = async () => {
    const purchaseData = {
      customer_name: formData.name,
      customer_email: formData.email,
      mobile: formData.phoneNumber,
      address: formData.address,
      note: 'This is an optional note.',
      products: products.map((item) => ({
        product_id: item.id,
        quantity: getQuantityInCart(item.id),
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
    if (!products || products.length === 0) {
      alert('No items in cart');
      return;
    }
    for (const [key, value] of Object.entries(formData)) {
      if (value === ''&&key!='note' ) {
        alert(`Please fill in ${key}`);
        return;
      }
    }

    if (
      confirm(
        'Total price: $' +
          products
            .reduce(
              (total: number, item: Product) =>
                total + item.price * getQuantityInCart(item.id),
              0
            )
            .toFixed(2) +
          '\nConfirm checkout?'
      )
    ) {
      console.log('Form submitted:', formData);
      console.log('Cart submitted:', products);
      storePurchaseData();
    }
  };
  return (
    <div className=" w-full max-w-5xl mx-auto md:grid md:grid-cols-3 md:gap-2 md:justify-center bg-gray-100">
      <div className=" rounded-2xl md:col-span-2 bg-white p-4">
        <div className=" overflow-x-auto">
          {products.length!=0 ? (
            <table className="w-full">
              <caption className="text-xl text-left font-semibold">
                Have {products.length} item(s) in cart
              </caption>
              <thead className="text-lg font-medium">
                <tr className=" hidden md:table-row md: border-b-2">
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Products Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Unit Price
                  </th>

                  <th scope="col" className="px-6 py-3 text-left">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr 
                    key={item.id}
                    className={`py-2 border-b-2 ${
                      isMobile ? 'grid grid-cols-2' : ''
                    }`}
                  >
                    <td className="sm:px-6 sm:py-4 row-span-2 flex justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded"
                      />
                    </td>

                    <td className="sm:px-6 sm:py-4 sm:text-center">
                      {item.name}
                    </td>

                    <td className="sm:px-6 sm:py-4 sm:text-center">
                      {isMobile ? 'Price: ' : ''} ${item.price}
                    </td>

                    {isMobile ? <td></td> : ''}
                    <td className="sm:px-6 sm:py-4  sm:text-center">
                      <div
                        className={`${
                          isMobile
                            ? ' grid grid-cols-3'
                            : 'flex justify-between items-center'
                        }`}
                      >
                        <div
                          className={`${
                            isMobile ? ' col-span-2' : ''
                          } bg-slate-100 flex sm:justify-end justify-center items-center`}
                        >
                          <button
                            title="Decrease quantity"
                            className={`rounded-full h-10 w-10 grid place-items-center transition-all ${
                              getQuantityInCart(item.id) == 1
                                ? ''
                                : 'hover:bg-green-900/10'
                            }`}
                            disabled={getQuantityInCart(item.id) <= 1}
                            onClick={() => adjustQuantity(-1, item.id)}
                          >
                            <MinusIcon className="h-5 w-5 stroke-2" />
                          </button>
                          <p className="text-base font-medium">
                            {getQuantityInCart(item.id)}
                          </p>
                          <button
                            title="Increase quantity"
                            className={`rounded-full h-10 w-10 grid place-items-center transition-all ${
                              getQuantityInCart(item.id) == item.quantity
                                ? ''
                                : 'hover:bg-green-900/10 stroke-neutral-500'
                            }`}
                            disabled={
                              getQuantityInCart(item.id) == item.quantity
                            }
                            onClick={() => adjustQuantity(1, item.id)}
                          >
                            <PlusIcon className="h-5 w-5 stroke-2" />
                          </button>
                        </div>
                        <div
                          className={`${
                            isMobile ? ' col-span-1' : ''
                          }  sm:mr-2 flex justify-center sm:justify-end items-center`}
                          onClick={() => {
                            deleteItem(item.id);
                          }}
                        >
                          <TrashIcon
                            title="Delete"
                            titleId="delete"
                            className=" w-5 h-5 ml-4 text-gray-500 hover:text-red-500"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items in cart</p>
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
          <div className="mb-4">
            <label
              htmlFor="note"
              className="block text-gray-700 font-bold mb-2"
            >
              Note
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={(event) =>
                setFormData((prevData) => ({
                  ...prevData,
                  note: event.target.value,
                }))
              }
              className="w-full px-3 py-2 border rounded outline-green-200"
            />
          </div>

          <p className="text-lg font-semibold mt-4">
            Total Price: $
            {products
              ? products
                  .reduce(
                    (total: number, item: Product) =>
                      total + item.price * getQuantityInCart(item.id),
                    0
                  )
                  .toFixed(2)
              : 0}
          </p>
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
