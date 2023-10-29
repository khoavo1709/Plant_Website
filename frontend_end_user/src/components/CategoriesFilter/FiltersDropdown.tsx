import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const FiltersDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((v) => !v);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex items-center p-4 h-12 rounded-lg space-x-2 focus:outline-none"
        onClick={toggle}
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
        <p className="text-sm">Filter</p>
      </button>

      {isOpen && (
        <ul className="absolute left-0 z-10 mt-2 w-56 origin-top-left shadow-lg focus:outline-none bg-white rounded-md ring-1 ring-black ring-opacity-5 py-1">
          <li className="text-sm block px-4 py-2">One</li>
          <li className="text-sm block px-4 py-2">Two</li>
          <li className="text-sm block px-4 py-2">Three</li>
        </ul>
      )}
    </div>
  );
};

export default FiltersDropdown;
