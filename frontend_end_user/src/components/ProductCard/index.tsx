import { Link } from 'react-router-dom';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="relative flex flex-col text-neutral-800 bg-white shadow-md w-full rounded-xl bg-clip-border ring-1 ring-black ring-opacity-5">
      <Link
        to={`/products/${product.id}`}
        className="relative mx-2 mt-2 overflow-hidden text-neutral-700 bg-white aspect-[3/4] rounded-[0.5rem] bg-clip-border"
      >
        <img
          src={product.image}
          className="object-cover w-full h-full transition-all hover:scale-105"
        />
      </Link>
      <div className="p-3">
        <p className="block font-sans text-base antialiased font-medium leading-relaxed">
          {product.name}
        </p>
        <p className="block font-sans text-base antialiased font-medium leading-relaxed">
          ${product.price}
        </p>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-neutral-600">
          {product.title}
        </p>
      </div>
      <div className="flex-1" />
      <div className="px-4 py-3 pt-0">
        <button
          className="block w-full h-10 select-none rounded-full text-center align-middle font-sans text-xs font-bold uppercase text-green-900/80 transition-all hover:bg-green-900/10 hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => console.log('TODO: add item to cart')}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
