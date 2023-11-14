import { TrashIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

export interface TableRowItem {
  itemsRow: Array<string>;
}

const TableRow = ({ item }: { item: TableRowItem }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      {item.itemsRow.map((row, index) => (
        <td key={index} className="px-6 py-4">
          {row}
        </td>
      ))}
      <td className="flex px-6 py-4 justify-end text-slate-400">
        <div className="px-2">
          <InformationCircleIcon
            title="Info"
            className="hover:text-blue-500 hover:ease-in-out hover:scale-125 h-5"
          />
        </div>
        <div className="px-2">
          <TrashIcon
            title="Delete"
            className="hover:text-red-500 hover:ease-in-out hover:scale-125 h-5"
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
