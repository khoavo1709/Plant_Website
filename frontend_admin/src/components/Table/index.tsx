import TableItem from "./TableItem";

export interface Item {
  itemsHeader: Array<string>;
  itemsBody: Array<Array<string>>;
}

const Index = ({ item }: { item: Item }) => {
  return (
    <div className="m-4 border p-4 w-fit rounded-2xl shadow-md">
      <table className="bg-white text-sm text-left">
        <thead className="uppercase border-b">
          <tr>
            {item.itemsHeader.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-4">
                {header}
              </th>
            ))}
            <th scope="col" className="px-6 py-4">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {item.itemsBody.map((body, index) => (
            <TableItem item={{ itemsRow: body }} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
