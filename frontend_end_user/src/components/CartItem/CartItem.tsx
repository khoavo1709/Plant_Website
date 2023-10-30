import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
interface Product {
  id: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
}

interface CartItemProps {
  product: Product;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <tr className={`py-2 border-b-2 ${isMobile ? 'grid grid-cols-2' : ''}`}>
      <td className="sm:px-6 sm:py-4 row-span-2 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-20 object-cover rounded"
        />
      </td>

      <td className="sm:px-6 sm:py-4 sm:text-center">{product.name}</td>

      <td className="sm:px-6 sm:py-4 sm:text-center">
        {isMobile ? 'Price: ' : ''} ${product.price}
      </td>

      {isMobile ? <td></td> : ''}
      <td className="sm:px-6 sm:py-4  sm:text-center">
        <div className={`${isMobile ? ' grid grid-cols-3' : 'flex justify-between items-center'}`}>
          <div
            className={`${
              isMobile ? ' col-span-2' : ''
            } bg-slate-100 flex sm:justify-end justify-center items-center`}
          >
            <button className="px-2 py-1 w-7 h-10 text-dark rounded">-</button>
            <span className="mx-2 text-dark">{product.quantity}</span>
            <button className="px-2 py-1 w-7 h-10 text-dark rounded">+</button>
          </div>
          <div
            className={`${
              isMobile ? ' col-span-1' : ''
            }  sm:mr-2 flex justify-center sm:justify-end items-center`}
          >
            <AiFillDelete
              title="Delete"
              size="1.2rem"
              className="hover:text-red-500"
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
