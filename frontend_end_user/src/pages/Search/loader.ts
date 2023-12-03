import { LoaderFunction } from 'react-router-dom';
import { seachProducts } from '../../api/search-products';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get('page');
  const search = url.searchParams.get('search');
  let page = 1;

  if (pageParam) {
    const i = parseInt(pageParam);
    if (i > 0) {
      page = i;
    }
  }

  return seachProducts({ page, search });
};
