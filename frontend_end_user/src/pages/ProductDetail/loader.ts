import { LoaderFunction } from 'react-router-dom';
import { getProductDetail } from '../../api';

interface Params {
  id: number;
}

export const loader: LoaderFunction = async ({ params }) => {
  const typedParams = params as unknown as Params;

  return await getProductDetail(typedParams.id);
};
