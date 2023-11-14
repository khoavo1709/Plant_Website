import ProductsList from '../../components/ProductsList';
import CategoriesFilter from '../../components/CategoriesFilter';
import Paginator from '../../components/Paginator';
import { useLoaderData } from 'react-router-dom';
import { objectToCamel } from 'ts-case-convert';
import { getListAccessoriesResponse } from '../../api/get-list-accessories';

const AccessoriesPage = () => {
  const { page, limit, total, data } = objectToCamel(
    useLoaderData() as object
  ) as getListAccessoriesResponse;

  return (
    <div className="max-w-screen-lg mx-auto">
      <CategoriesFilter type="ACCESSORY" />
      <div className="my-4 sm:mb-8">
        <ProductsList products={data} />
      </div>
      <div className="my-4 mx-4 text-5xl">
        <Paginator total={total} page={page} limit={limit} />
      </div>
    </div>
  );
};

export default AccessoriesPage;
