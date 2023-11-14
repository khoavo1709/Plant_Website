import FiltersDropdown from './FiltersDropdown';
import FiltersList from './FiltersList';

type Props = {
  type: 'PLANT' | 'ACCESSORY';
};

const CategoriesFilter = ({ type }: Props) => {
  return (
    <div className="flex items-center flex-wrap space-x-1 space-y-2 px-4">
      <p />
      <FiltersDropdown type={type} />
      <FiltersList />
    </div>
  );
};

export default CategoriesFilter;
