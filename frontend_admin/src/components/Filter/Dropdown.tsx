import { useState } from "react";

export interface Item {
  placeHolder: string;
  icon: React.ReactNode;
  selectValue?: (selectedValue: string) => void;
  openDropdown: () => void;
}

const Dropdown = ({ icon, selectValue, openDropdown }: Item) => {
  const [chooseValue, setChooseValue] = useState("ALL");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setChooseValue(value);
    if (selectValue) {
      selectValue(value);
    }
  };

  return (
    <div className="flex items-center">
      <div className="relative m-4" onClick={openDropdown}>
        <select
          className="w-40 p-2 text-sm border rounded-xl bg-gray-50 outline-none appearance-none"
          value={chooseValue}
          onBlur={openDropdown}
          onChange={handleSelectChange}
        >
          <option value="ALL">ALL</option>
          <option value="PLANT">PLANT</option>
          <option value="ACCESSORY">ACCESSORY</option>
        </select>
        <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
