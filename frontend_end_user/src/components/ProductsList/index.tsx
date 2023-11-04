import ProductCard from '../ProductCard';

interface Props {
  products: Product[];
}

const ProductsList = ({ products }: Props) => {
  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 px-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p> No product found</p>
      )}
    </>
  );
};

export default ProductsList;
