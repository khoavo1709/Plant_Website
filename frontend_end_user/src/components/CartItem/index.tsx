import { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { CartItems } from '../../../types/cart';
interface Props {
  item: CartItems;
  onQuantityChange: (productId: number, newQuantity: number) => void;
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
  }, []);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
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
        {isMobile ? 'Price: ' : ''} ${item.unitPrice}
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
              className="px-2 py-1 w-7 h-10 text-dark rounded"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="mx-2 text-dark">{quantity}</span>
            <button
              className="px-2 py-1 w-7 h-10 text-dark rounded"
              onClick={handleIncrease}
            >
              +
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
