import React, { useEffect, useState } from 'react';

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
  return (
    <tr className=" py-2 border-b-2">
      <td className="flex justify-center lg:p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-20 object-cover rounded"
        />
      </td>
      <td className="text-center">{product.name}</td>
      <td className="text-center">
        <div className="flex items-center justify-center ">
          <div className="bg-slate-100">
            <button className="px-2 py-1 w-7 h-10 text-dark rounded">-</button>
            <span className="mx-2 text-dark">{product.quantity}</span>
            <button className="px-2 py-1 w-7 h-10 text-dark rounded">+</button>
          </div>
        </div>
      </td>
      <td className="text-center">${product.price}</td>
      <td className="text-end">
        <button className="mt-2 px-4 py-2 text-black rounded">x</button>
      </td>
    </tr>
  );
};

export default CartItem;
