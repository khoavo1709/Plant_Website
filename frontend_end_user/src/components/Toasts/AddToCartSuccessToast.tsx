import { Link } from 'react-router-dom';

const AddToCardSuccessToast = () => {
  return (
    <div className="flex items-center justify-center h-12 w-full max-w-max bg-white divide-x rtl:divide-x-reverse divide-green-900/20 rounded-lg shadow-lg outline outline-green-900/10 outline-1">
      <p className="text-sm font-normal mx-4">New item added to cart</p>
      <Link to="/carts">
        <button className="block w-full h-10 px-4 select-none rounded-full text-center align-middle font-sans font-medium text-sm text-green-900/80 transition-all hover:scale-105 focus:scale-105">
          View your cart
        </button>
      </Link>
    </div>
  );
};

export default AddToCardSuccessToast;
