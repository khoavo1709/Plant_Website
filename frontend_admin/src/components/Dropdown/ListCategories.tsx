import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface ListCategoriesProps {
  label: string;
  options: Category[];
  selectedOptions: number[];
  onChange: (selectedId: number[]) => void;
}

const ListCategories: React.FC<ListCategoriesProps> = ({
  label,
  options,
  selectedOptions,
  onChange,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleOptionChange = (optionId: number) => {
    const isSelected = selectedOptions.includes(optionId);
    const updatedOptions = isSelected
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId];
    onChange(updatedOptions);
  };

  return (
    <div>
      <label htmlFor="category" className="mb-2 text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-2">
        <div
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
          className="flex items-center bg-gray-50 border border-gray-300 text-sm rounded-xl p-2.5 cursor-pointer"
        >
          <div className="flex-1">
            {selectedOptions.length === 0 ? (
              <div className="text-gray-500">Select options</div>
            ) : (
              <div>
                {selectedOptions.map((selectedId, index) => (
                  <span key={selectedId}>
                    {options.find((option) => option.id === selectedId)?.name}
                    {index < selectedOptions.length - 1 && " - "}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center">
            <ChevronDownIcon
              className={`h-4 w-4 ${
                isOpenDropdown ? "transform rotate-180" : ""
              } transition-transform w-4 h-4 text-gray-500`}
            />
          </div>
        </div>

        {isOpenDropdown && (
          <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md">
            {options.map((option) => (
              <label
                key={option.id}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <input
                  type="checkbox"
                  id={`option-${option.id}`}
                  value={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleOptionChange(option.id)}
                  className="mr-2"
                />
                <span>{option.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCategories;
