import Header from "../../components/Header";
import SalesStatistics from "../../components/SalesStatistics";
import { useGetOrders } from "../../hooks/useGetOrders";
import { Order } from "../../../types/order";
import CompareChart from "../../components/CompareChart";
import StatusPieChart from "../../components/StatusPieChart/StatusPieChart";
import ListActivity from "../../components/ListActivity";
import ProductChart from "../../components/ProductChart";

export interface OrdersResponse {
  page: number;
  limit: number;
  total: number;
  data: Order[];
}
const DashBoard = () => {
  let orderdata: OrdersResponse = { page: 0, limit: 0, total: 0, data: [] };
  if (orderdata.data.length === 0) {
    const orders = useGetOrders();
    if (orders !== null) {
      orderdata.data = orders;
    }
  }
  const data = orderdata.data;
  return (
    <main>
      <Header />
      <div className="background-main-page p-4">
        <SalesStatistics data={data} />
        <div className="grid grid-cols-3 gap-4 p-2">
          <CompareChart data={data} />
          <StatusPieChart data={data} />
          <ProductChart data={data} />
          <ListActivity data={data} />
        </div>
      </div>
    </main>
  );
};

export default DashBoard;
