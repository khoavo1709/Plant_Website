import TableHeader from "./TableHeader";
import TableItem from "./TableItem";

const itemsBody = [
  {
    username: "abc",
    fullname: "abc",
    sex: "abc",
    phonenumber: "abc",
    address: "abc",
    position: "abc",
    iconSize: "1.2rem",
  },
  {
    username: "abc",
    fullname: "abc",
    sex: "abc",
    phonenumber: "abc",
    address: "abc",
    position: "abc",
    iconSize: "1.2rem",
  },
  {
    username: "abc",
    fullname: "abc",
    sex: "abc",
    phonenumber: "abc",
    address: "abc",
    position: "abc",
    iconSize: "1.2rem",
  },
];

const itemsHeader = [
  {
    header: "User name",
  },
  {
    header: "Full name",
  },
  {
    header: "Sex",
  },
  {
    header: "Phone number",
  },
  {
    header: "Address",
  },
  {
    header: "Position",
  },
];

const TableItemsContainer = () => (
  <>
    {itemsBody.map((item, index) => (
      <TableItem item={item} key={index} />
    ))}
  </>
);

const TableItemsHeader = () => (
  <>
    {itemsHeader.map((item, index) => (
      <TableHeader item={item} key={index} />
    ))}
  </>
);

const Index = () => {
  return (
    <div className="mt-2 m-20 relative row-span-5 overflow-x-auto shadow-md sm:rounded-xl">
      <table className="w-full text-sm text-left">
        <thead className="uppercase bg-cyan-100">
          <tr>
            <TableItemsHeader />
            <th scope="col" className="px-6 py-4">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <TableItemsContainer />
        </tbody>
      </table>
    </div>
  );
};

export default Index;
