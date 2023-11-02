import { LoaderFunction } from 'react-router-dom';
import { getListPlants as getListAccessories } from '../../api';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get('page');
  const categoriesParam = url.searchParams.get('categories');
  let page = 1;
  let categories: number[] = [];

  if (pageParam) {
    const i = parseInt(pageParam);
    if (i > 0) {
      page = i;
    }
  }

  if (categoriesParam) {
    categories = JSON.parse(categoriesParam);
  }

  return getListAccessories({ page: page, categories: categories });
};
