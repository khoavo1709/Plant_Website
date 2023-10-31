import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  category: Category;
  onClick: (category: Category) => void;
}

const FilterListItems = ({ category, onClick }: Props) => {
  return (
    <div className="h-8 rounded-lg border border-neutral-900/60 pl-3 pr-2 gap-2 flex items-center">
      <p className="text-xs">{category.name}</p>
      <button
        className="flex items-center justify-center w-5 h-5  rounded-full hover:bg-green-900/10"
        onClick={() => onClick(category)}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
export default FilterListItems;
