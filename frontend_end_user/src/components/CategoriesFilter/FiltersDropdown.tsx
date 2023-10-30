import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { categoriesAtom, useCategories } from '../../hooks/useCategories';
import { useAtomValue } from 'jotai';

const FiltersDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useAtomValue(categoriesAtom);
  const { addCategory } = useCategories();

  const toggle = () => {
    setIsOpen((v) => !v);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex items-center px-3 h-8 rounded-lg space-x-2 focus:outline-none font-medium"
        onClick={toggle}
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
        <p className="text-sm">Filter</p>
      </button>

      {isOpen && categories.length > 0 && (
        <ul className="absolute left-0 z-10 mt-2 w-56 origin-top-left shadow-lg focus:outline-none bg-white rounded-md ring-1 ring-black ring-opacity-5 py-1">
          {categories.map((c) => (
            <li
              className="text-sm block px-4 py-2 hover:bg-neutral-100"
              key={c.id}
              onClick={() => {
                addCategory(c);
                setIsOpen(false);
              }}
            >
              <button>{c.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FiltersDropdown;
