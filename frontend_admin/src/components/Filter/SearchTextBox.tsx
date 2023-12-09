export interface Item {
  placeHolder: string;
  icon: React.ReactNode;
  getValue?: (value: string) => void;
}

const SearchTextBox = ({ placeHolder, icon, getValue }: Item) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (getValue) {
      getValue(value);
    }
  };

  return (
    <div className="flex items-center">
      <div className="relative m-4">
        <input
          type="text"
          className="w-full p-2 text-sm border rounded-xl bg-gray-50 outline-none"
          placeholder={placeHolder}
          onChange={handleInputChange}
        />
        <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SearchTextBox;
