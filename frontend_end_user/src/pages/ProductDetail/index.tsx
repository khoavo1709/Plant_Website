import { useLoaderData } from 'react-router-dom';

const ProductDetailPage = () => {
  const product = useLoaderData();
  // const { id } = useParams();
  // const product = useAtomValue(dataAtom);
  // const resetProduct = useResetAtom(dataAtom);

  return <div>Product detail: {JSON.stringify(product)}</div>;
};

export default ProductDetailPage;
