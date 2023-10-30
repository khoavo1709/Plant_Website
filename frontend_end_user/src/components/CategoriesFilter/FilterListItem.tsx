import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  category: Category;
  onClick: (category: Category) => void;
}

const FilterListItems = ({ category, onClick }: Props) => {
  return (
    <div className="h-8 rounded-lg border border-neutral-900/60 pl-2 pr-2 space-x-2 flex items-center">
      <p className="text-sm">{category.name}</p>
      <button onClick={() => onClick(category)}>
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
export default FilterListItems;
