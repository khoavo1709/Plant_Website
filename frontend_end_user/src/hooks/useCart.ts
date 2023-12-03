import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { CartItem } from '../../types/cart-item';

export const useCart = () => {
  const dataStoredInLocal = localStorage.getItem('cart');
  console.log('dataStoredInLocal', dataStoredInLocal);
  const [cart, setCart] = useAtom(
    atomWithStorage<CartItem[]>(
      'cart',
      dataStoredInLocal ? JSON.parse(dataStoredInLocal) : []
    )
  );

  const updateCart = (cart: CartItem[]) => {
    setCart(cart);
  };

  const removeItem = (productID: number) => {
    if (confirm('Are you sure you want to remove this item?') == false) {
      return;
    }
    setCart(cart.filter((c) => c.product.id !== productID));
  };

  const addItem = (product: Product, quantity: number, price: number) => {
    if (cart.length == 0) {
      setCart([{ product: product, quantity: quantity, price: price }]);
      return;
    }
    const i = cart.findIndex((c) => c.product.id === product.id);
    if (i !== -1) {
      alert('Item already in cart');
      return;
    } else {
      setCart([
        ...cart,
        { product: product, quantity: quantity, price: price },
      ]);
    }
  };

  const decreaseQuantityBy1 = (productID: number) => {
    const i = cart.findIndex((c) => c.product.id === productID);
    if (i !== -1) {
      if (cart[i].quantity == 1) {
        removeItem(productID);
      } else {
        cart[i].quantity -= 1;
        setCart(cart);
      }
    }
  };

  const getItem = (productID: number) => {
    return cart.find((c) => c.product.id === productID);
  };

  return {
    cart,
    updateCart,
    addItem,
    getItem,
    removeItem,
    decreaseQuantityBy1,
  };
};
