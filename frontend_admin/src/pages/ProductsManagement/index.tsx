import ButtonWithIcon from "../../components/Button/ButtonWithIcon";
import SearchTextBox from "../../components/Filter/SearchTextBox";
import Header from "../../components/Header";
import Table from "../../components/Table";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const itemsBody = [
  ["aasd", "baf", "aasfa", "bafs", "aasfd", "basf"],
  ["aasd", "baf", "aasfa", "bafs", "aasfd", "basf"],
  ["aasd", "baf", "aasfa", "bafs", "aasfd", "basf"],
];

const itemsHeader = [
  "User name",
  "Full name",
  "Sex",
  "Phone number",
  "Address",
  "Position",
];

const itemsCategory = [
  ["aasd", "baf", "aasfa", "bafs"],
  ["aasd", "baf", "aasfa", "bafs"],
  ["aasd", "baf", "aasfa", "bafs"],
];

const itemsHeaderCategory = ["User name", "Full name", "Sex", "Phone number"];

const ProductsManagement = () => {
  const [isFocusUser, checkFocusUser] = useState(false);
  const [isFocusPosition, checkFocusPosition] = useState(false);
  const tableData1 = {
    itemsHeader: itemsHeader,
    itemsBody: itemsBody,
  };
  const tableData2 = {
    itemsHeader: itemsHeaderCategory,
    itemsBody: itemsCategory,
  };
  return (
    <main>
      <Header />
      <div className="background-main-page p-2 min-h-screen">
        <div className="flex justify-between items-center">
          <div className="flex">
            <SearchTextBox
              checkFocus={() => checkFocusUser(!isFocusUser)}
              placeHolder="User name"
              changeIcon={
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
              }
            />
            <SearchTextBox
              checkFocus={() => checkFocusPosition(!isFocusPosition)}
              placeHolder="Position"
              changeIcon={
                isFocusPosition ? (
                  <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                )
              }
            />
          </div>
          <ButtonWithIcon
            text="Add product"
            background="bg-cyan-500"
            hoverBackground="hover:bg-cyan-400"
            icon={<PlusIcon className="text-cyan-50 w-5 h-5" />}
          />
        </div>
        <Table item={tableData1} />
        <Table item={tableData2} />
      </div>
    </main>
  );
};

export default ProductsManagement;
