import CategoriesFilter from '../../components/CategoriesFilter';
import ProductsList from '../../components/ProductsList';

const PlantsPage = () => {
  return (
    <div className="w-full mx-auto">
      <CategoriesFilter />
      <ProductsList />
    </div>
  );
};

export default PlantsPage;
