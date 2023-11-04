import Header from "../../components/Header";
import Table from "../../components/Table";

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

const OrdersManagement = () => {
  const tableData = {
    itemsHeader: itemsHeader,
    itemsBody: itemsBody,
  };
  return (
    <main>
      <Header />
      <div className="background-main-page">
        <Table item={tableData} />
      </div>
    </main>
  );
};

export default OrdersManagement;
