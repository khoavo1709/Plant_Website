import ButtonWithIcon from "../../components/Button/ButtonWithIcon";
import SearchTextBox from "../../components/Filter/SearchTextBox";
import Header from "../../components/Header";
import Table from "../../components/Table";
import "../../App.css";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import AddNewMember from "../../components/Popup/AddNewMember";
import { addNewMember } from "../../hooks/headerHooks";
import { useAtom } from "jotai";

const itemsBody = [
  [
    "User 1",
    "Nguyen Van A",
    "0900289576",
    "Ward 12, Go Vap District, Ho Chi Minh City, Viet Name",
    "Staff",
  ],
  [
    "User 2",
    "Nguyen Van B",
    "0900289576",
    "Ward 12, Go Vap District, Ho Chi Minh City, Viet Name",
    "Staff",
  ],
  [
    "User 3",
    "Nguyen Van C",
    "0900289576",
    "Ward 12, Go Vap District, Ho Chi Minh City, Viet Name",
    "Staff",
  ],
  [
    "User 4",
    "Nguyen Van D",
    "0900289576",
    "Ward 12, Go Vap District, Ho Chi Minh City, Viet Name",
    "Staff",
  ],
  [
    "User 5",
    "Nguyen Van E",
    "0900289576",
    "Ward 12, Go Vap District, Ho Chi Minh City, Viet Name",
    "Staff",
  ],
  [
    "User 6",
    "Nguyen Van F",
    "0900289576",
    "Ward 12, Go Vap District, Ho Chi Minh City, Viet Name",
    "Staff",
  ],
  [
    "User 7",
    "Nguyen Van G",
    "0900289576",
    "Ward 12, Go Vap District, Ho Chi Minh City, Viet Name",
    "Staff",
  ],
  [
    "User 8",
    "Nguyen Van H",
    "0900289576",
    "Ward 12, Go Vap District, Ho Chi Minh City, Viet Name",
    "Staff",
  ],
  [
    "User 9",
    "Nguyen Van K",
    "0900289576",
    "Ward 12, Go Vap District, Ho Chi Minh City, Viet Name",
    "Staff",
  ],
  [
    "User 10",
    "Nguyen Van T",
    "0900289576",
    "Ward 12, Go Vap District, Ho Chi Minh City, Viet Name",
    "Staff",
  ],
];

const itemsHeader = [
  "User name",
  "Full name",
  "Phone number",
  "Address",
  "Position",
];

const UserManagement = () => {
  const [isFocusUser, checkFocusUser] = useState(false);
  const [isFocusPosition, checkFocusPosition] = useState(false);
  const [isOpenAddMemberPopup] = useAtom(addNewMember);
  const tableData = {
    itemsHeader: itemsHeader,
    itemsBody: itemsBody,
  };
  return (
    <main>
      <Header />
      <div className="background-main-page p-4">
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
            text="Add member"
            background="bg-cyan-500"
            hoverBackground="hover:bg-cyan-400"
            icon={<PlusIcon className="text-cyan-50 w-5 h-5" />}
          />
        </div>
        <Table item={tableData} />
      </div>
      <div className={`${isOpenAddMemberPopup ? "" : "hidden"}`}>
        <AddNewMember />
      </div>
    </main>
  );
};

export default UserManagement;
