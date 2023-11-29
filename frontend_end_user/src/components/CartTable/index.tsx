import CartItem from '../CartItem';
import { CartItem as ICartItem } from '../../../types/cart-item';
import { useEffect } from 'react';

interface Props {
  cartItems: ICartItem[];
}

const CartTable = ({ cartItems }: Props) => {
  useEffect(() => {
  }, [cartItems]);
  return (
    <>
      {cartItems?.length > 0 ? (
        <table className="w-full">
          <caption className="text-xl text-left font-semibold">
            Have {cartItems.length} item(s) in cart
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
            {cartItems.map((item) => (
              <CartItem item={item}/>
            ))}
          </tbody>
        </table>
      ) : (
        <p> No product found</p>
      )}
    </>
  );
};

export default CartTable;
