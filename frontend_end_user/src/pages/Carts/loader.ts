import { LoaderFunction } from 'react-router-dom';
import { getProductsByIDs } from '../../api/get-products-by-ids';

export const loader: LoaderFunction = async () => {
  const cart = window.localStorage.getItem('cart');
  const ids = ((cart ? JSON.parse(cart) : []) as CartItem[]).map(
    (item) => item.productID
  );

  return getProductsByIDs({ ids });
};
