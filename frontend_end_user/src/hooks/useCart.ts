import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const cartAtom = atomWithStorage('cart', [] as cartItem[]);

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const updateCart = (cart: cartItem[]) => {
    setCart(cart);
  };

  const removeItem = (productID: number) => {
    setCart(cart.filter((c) => c.productID !== productID));
  };

  const addItem = (productID: number, quantity: number) => {
    const i = cart.findIndex((c) => c.productID === productID);
    if (i !== -1) {
      cart[i].quantity += quantity;
      setCart(cart);
    } else {
      setCart([...cart, { productID: productID, quantity: quantity }]);
    }

    console.log(JSON.stringify(cart));
  };

  const decreaseQuantityBy1 = (productID: number) => {
    const i = cart.findIndex((c) => c.productID === productID);
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
    return cart.find((c) => c.productID === productID);
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
