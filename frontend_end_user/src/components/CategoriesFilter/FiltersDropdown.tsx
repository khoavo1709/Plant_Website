import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';

type Props = {
  type: 'PLANT' | 'ACCESSORY';
};

const FiltersDropdown = ({ type }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addCategory, categories } = useCategories(type);

  const toggle = () => {
    setIsOpen((v) => !v);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex items-center px-3 h-8 rounded-lg space-x-2 focus:outline-none"
        onClick={toggle}
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
        <p className="text-xs">Filter</p>
      </button>

      {isOpen && categories.length > 0 && (
        <ul className="absolute left-0 z-10 mt-2 w-56 origin-top-left shadow-lg focus:outline-none bg-white rounded-md ring-1 ring-black ring-opacity-5 py-1">
          {categories.map((c) => (
            <button
              className="text-left text-sm block w-full px-4 py-2 hover:bg-green-900/10"
              key={c.id}
              onClick={() => {
                addCategory(c);
                setIsOpen(false);
              }}
            >
              {c.name}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FiltersDropdown;
