import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export interface Item {
  username: string;
  fullname: string;
  sex: string;
  phonenumber: string;
  address: string;
  position: string;
  iconSize: string;
}

const TableItem = ({ item }: { item: Item }) => {
  const { username, fullname, sex, phonenumber, address, position, iconSize } =
    item;
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {username}
      </th>
      <td className="px-6 py-4">{fullname}</td>
      <td className="px-6 py-4">{sex}</td>
      <td className="px-6 py-4">{phonenumber}</td>
      <td className="px-6 py-4">{address}</td>
      <td className="px-6 py-4">{position}</td>
      <td className="flex px-6 py-4 justify-end">
        <div className="px-2">
          <AiFillEdit
            title="Edit"
            size={iconSize}
            className="hover:text-red-500"
          />
        </div>
        <div className="px-2">
          <AiFillDelete
            title="Delete"
            size={iconSize}
            className="hover:text-red-500"
          />
        </div>
      </td>
    </tr>
  );
};

export default TableItem;
