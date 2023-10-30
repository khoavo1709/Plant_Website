import { atom, useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

const dataAtom = atom(async () => {
  const { id } = useParams();
  // :TODO fetch data
  return id;
});

const Page = () => {
  // const { id } = useParams();
  const data = useAtomValue(dataAtom);

  return <div>Product detail: {JSON.stringify(data)}</div>;
};

const ProductDetailPage = () => {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Page />
    </Suspense>
  );
};

export default ProductDetailPage;
