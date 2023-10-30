import ProductsList from '../../components/ProductsList';
import CategoriesFilter from '../../components/CategoriesFilter';
import Paginator from '../../components/Paginator';
import usePagination from '../../hooks/usePagination';
import { useGetPlants } from '../../hooks/useGetPlants';

const PlantsPage = () => {
  const { page, limit, total, data } = useGetPlants();
  const setPage = usePagination(limit, total);

  return (
    <div className="max-w-screen-xl mx-auto">
      <CategoriesFilter />
      <div className="my-4 sm:mb-8">
        <ProductsList products={data} />
      </div>
      <div className="my-4 mx-4">
        <Paginator total={total} page={page} limit={limit} setPage={setPage} />
      </div>
    </div>
  );
};

export default PlantsPage;
