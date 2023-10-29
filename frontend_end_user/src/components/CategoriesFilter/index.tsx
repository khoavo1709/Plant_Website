import FiltersDropdown from './FiltersDropdown';
import FiltersList from './FiltersList';

const CategoriesFilter = () => {
  return (
    <div className="flex items-center flex-wrap space-x-1 space-y-2 px-2">
      <p />
      <FiltersDropdown />
      <FiltersList />
    </div>
  );
};

export default CategoriesFilter;
