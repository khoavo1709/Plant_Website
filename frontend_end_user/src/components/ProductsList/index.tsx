import ProductCard from '../ProductCard';

interface Props {
  products: Product[];
}

const ProductsList = ({ products }: Props) => {
  return (
    <>
      {products.length > 0 ? (
        <div>
          {products.map((p) => (
            <ProductCard key={p.id} />
          ))}
        </div>
      ) : (
        <p> No product found</p>
      )}
    </>
  );
};

export default ProductsList;
