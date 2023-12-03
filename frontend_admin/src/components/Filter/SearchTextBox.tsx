export interface Item {
  checkFocus: () => void;
  placeHolder: string;
  changeIcon: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchTextBox = ({
  checkFocus,
  placeHolder,
  changeIcon,
  onChange,
}: Item) => {
  return (
    <div className="flex items-center">
      <div className="relative m-4">
        <input
          onFocus={checkFocus}
          onBlur={checkFocus}
          type="text"
          className="w-full p-2 text-sm border rounded-xl bg-gray-50 outline-none"
          placeholder={placeHolder}
          onChange={onChange}
        />
        <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
          {changeIcon}
        </div>
      </div>
    </div>
  );
};

export default SearchTextBox;
