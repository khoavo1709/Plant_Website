import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();

  useEffect(() => {
    // :TODO fetch data
    console.log(id);
  });

  return <div>Product detail: {id}</div>;
};

export default ProductDetailPage;
