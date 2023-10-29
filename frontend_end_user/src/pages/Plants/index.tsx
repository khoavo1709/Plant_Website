import ProductsList from '../../components/ProductsList';
import CategoriesFilter from '../../components/CategoriesFilter';
import Paginator from '../../components/Paginator';
import usePagination from '../../hooks/usePagination';
import { useGetPlants } from '../../hooks/useGetPlants';

const PlantsPage = () => {
  const { page, limit, total, data } = useGetPlants();
  const setPage = usePagination(limit, total);

  return (
    <div>
      <CategoriesFilter />
      <ProductsList products={data} />
      <Paginator total={total} page={page} limit={limit} setPage={setPage} />
    </div>
  );
};

export default PlantsPage;
