export interface Item {
  header: string;
}

const TableHeader = ({ item }: { item: Item }) => {
  const { header } = item;
  return (
    <th scope="col" className="px-6 py-4">
      {header}
    </th>
  );
};

export default TableHeader;
