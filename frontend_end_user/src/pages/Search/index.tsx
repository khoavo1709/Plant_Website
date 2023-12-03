import ProductsList from '../../components/ProductsList';
import Paginator from '../../components/Paginator';
import { useLoaderData } from 'react-router-dom';
import { objectToCamel } from 'ts-case-convert';
import { SearchProductsResponse } from '../../api/search-products';

const SearchPage = () => {
  const { page, limit, total, data } = objectToCamel(
    useLoaderData() as object
  ) as SearchProductsResponse;

  return (
    <div className="max-w-screen-lg mx-auto w-full">
      <div className="my-4 sm:mb-8">
        <ProductsList products={data} />
      </div>
      <div className="my-4 mx-4 text-5xl">
        <Paginator total={total} page={page} limit={limit} />
      </div>
    </div>
  );
};

export default SearchPage;
