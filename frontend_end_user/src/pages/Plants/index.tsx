import ProductsList from '../../components/ProductsList';
import CategoriesFilter from '../../components/CategoriesFilter';
import Paginator from '../../components/Paginator';
import { PlantsReponse } from '../../hooks/useGetPlants';
import { useLoaderData } from 'react-router-dom';
import { objectToCamel } from 'ts-case-convert';

const PlantsPage = () => {
  const { page, limit, total, data } = objectToCamel(
    useLoaderData() as object
  ) as PlantsReponse;

  return (
    <div className="max-w-screen-xl mx-auto">
      <CategoriesFilter type="PLANT" />
      <div className="my-4 sm:mb-8">
        <ProductsList products={data} />
      </div>
      <div className="my-4 mx-4 text-5xl">
        <Paginator total={total} page={page} limit={limit} />
      </div>
    </div>
  );
};

export default PlantsPage;
