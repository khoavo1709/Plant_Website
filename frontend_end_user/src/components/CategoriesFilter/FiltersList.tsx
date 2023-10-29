import { useCategories } from '../../hooks/useCategories';
import FilterListItems from './FilterListItem';

const FiltersList = () => {
  const { filteredCategories, removeCategory } = useCategories();

  return (
    <>
      {filteredCategories.length > 0 &&
        filteredCategories.map((c) => (
          <FilterListItems key={c.id} category={c} onClick={removeCategory} />
        ))}
    </>
  );
};

export default FiltersList;
