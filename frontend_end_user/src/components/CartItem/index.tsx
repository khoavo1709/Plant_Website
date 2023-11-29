import { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import { CartItem } from '../../../types/cart-item';
interface Props {
  item: CartItem;
}

const CartItem = ({ item }: Props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [quantity, setQuantity] = useState(item.quantity);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [item]);
  const adjustQuantity = (amount: number) => {
    if (
      amount === 0 ||
      quantity + amount < 1 ||
      quantity + amount > item.product.quantity
    ) {
      return;
    }
    setQuantity(quantity + amount);
    item.quantity = quantity + amount;
    //after change quantity, update localStorage
    const data = localStorage.getItem('cart');
    const parsedData: CartItem[] = data ? JSON.parse(data) : [];
    const index = parsedData.findIndex(
      (cartitem) => cartitem.product.id == item.product.id
    );
    parsedData[index] = item;
    localStorage.setItem('cart', JSON.stringify(parsedData));
  };

  return (
    <tr className={`py-2 border-b-2 ${isMobile ? 'grid grid-cols-2' : ''}`}>
      <td className="sm:px-6 sm:py-4 row-span-2 flex justify-center">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-20 object-cover rounded"
        />
      </td>

      <td className="sm:px-6 sm:py-4 sm:text-center">{item.product.name}</td>

      <td className="sm:px-6 sm:py-4 sm:text-center">
        {isMobile ? 'Price: ' : ''} ${item.price}
      </td>

      {isMobile ? <td></td> : ''}
      <td className="sm:px-6 sm:py-4  sm:text-center">
        <div
          className={`${
            isMobile ? ' grid grid-cols-3' : 'flex justify-between items-center'
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
                quantity == 1 ? '' : 'hover:bg-green-900/10'
              }`}
              disabled={quantity == 1}
              onClick={() => adjustQuantity(-1)}
            >
              <MinusIcon className="h-5 w-5 stroke-2" />
            </button>
            <p className="text-base font-medium">{quantity}</p>
            <button
              title="Increase quantity"
              className={`rounded-full h-10 w-10 grid place-items-center transition-all ${
                quantity == item.quantity
                  ? ''
                  : 'hover:bg-green-900/10 stroke-neutral-500'
              }`}
              disabled={quantity == item.product.quantity}
              onClick={() => adjustQuantity(1)}
            >
              <PlusIcon className="h-5 w-5 stroke-2" />
            </button>
          </div>
          <div
            className={`${
              isMobile ? ' col-span-1' : ''
            }  sm:mr-2 flex justify-center sm:justify-end items-center`}
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
  );
};

export default CartItem;
