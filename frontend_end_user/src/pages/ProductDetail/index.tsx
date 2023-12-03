import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { objectToCamel } from 'ts-case-convert';
import { useCart } from '../../hooks/useCart';
import NotFound from '../NotFound';
import AddToCardSuccessToast from '../../components/Toasts/AddToCartSuccessToast';
import useNotifications from '../../hooks/useNotifications';
import AddToCardFailureToast from '../../components/Toasts/AddToCartFailureToast';

const ProductDetailPage = () => {
  const product = objectToCamel(useLoaderData() as object) as Product;
  const [quantity, setQuantity] = useState(1);
  // const price = product.price;
  const { addItem, getItem } = useCart();
  const { addNotification } = useNotifications();

  if (!product) {
    return <NotFound />;
  }

  const adjustQuantity = (amount: number) => {
    if (
      amount === 0 ||
      quantity + amount < 1 ||
      quantity + amount > product.quantity
    ) {
      return;
    }

    setQuantity(quantity + amount);
  };

  const addToCart = () => {
    const item = getItem(product.id);
    if (item && quantity + item.quantity > product.quantity) {
      addNotification(
        () => (
          <AddToCardFailureToast message="Product quantity exceeds available stock" />
        ),
        3000
      );
      return;
    }

    addItem(product.id, quantity);
    addNotification(AddToCardSuccessToast, 3000);
  };

  return (
    <>
      <div className="leading-relaxed max-w-screen-lg mx-auto md:flex">
        <img
          className="w-full h-full object-cover md:w-1/2 md:mx-4 md:my-6 md:rounded-sm md:overflow-hidden md:ring-1 md:ring-black md:ring-opacity-5"
          src={product.image}
          alt={product.name}
        />
        <div className="px-4 py-6 md:w-1/2">
          <h1 className="text-2xl mb-2 leading-none">{product.name}</h1>
          <p className="text-base mb-6 text-neutral-700 leading-normal">
            {product.title}
          </p>

          <h2 className="text-xl font-medium mb-2">Product detail:</h2>
          <p className="text-base text-neutral-700 text-justify">
            {product.description}
          </p>

          {quantity > 0 ? (
            <>
              <div className="flex items-center justify-between flex-wrap gap-2 my-6">
                <h3 className="text-xl font-medium">Price: ${product.price}</h3>
                <div className="flex items-center h-10 gap-2 stroke-2">
                  <button
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
                    className={`rounded-full h-10 w-10 grid place-items-center transition-all ${
                      quantity == product.quantity
                        ? ''
                        : 'hover:bg-green-900/10 stroke-neutral-500'
                    }`}
                    disabled={quantity == product.quantity}
                    onClick={() => adjustQuantity(1)}
                  >
                    <PlusIcon className="h-5 w-5 stroke-2" />
                  </button>
                </div>
              </div>

              <button
                className="rounded-full font-medium text-sm text-green-50 h-10 px-4 mx-auto py-auto block w-full max-w-xl bg-green-900/60 hover:bg-green-900/70 transition-all hover:scale-105"
                onClick={addToCart}
              >
                ADD TO CART
              </button>
            </>
          ) : (
            <>
              <div className="text-rose-800 text-xl font-medium text-center mt-6">
                OUT OF STOCK
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
