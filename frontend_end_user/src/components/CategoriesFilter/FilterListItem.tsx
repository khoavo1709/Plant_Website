import { XMarkIcon } from '@heroicons/react/24/outline';

const FilterListItems = () => {
  return (
    <div className="h-8 rounded-lg border border-neutral-800 pl-2 pr-2 space-x-2 flex items-center">
      <p className="text-sm">Chip</p>
      <button>
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
export default FilterListItems;
