import Header from "../../components/Header";
import SalesStatistics from "../../components/SalesStatistics";
import CompareChart from "../../components/CompareChart";
import StatusPieChart from "../../components/StatusPieChart/StatusPieChart";
import ListActivity from "../../components/ListActivity";
import ProductChart from "../../components/ProductChart";
import { useState, useEffect } from "react";

type ProductDashboard = {
  id: number;
  name: string;
  type: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  pivot: {
    purchase_id: number;
    product_id: number;
    quantity: number;
    price: number;
  };
};

type PurchaseDashboard = {
  id: number;
  customer_name: string;
  customer_email: string;
  mobile: string;
  address: string;
  total: number;
  status: string;
  note: string;
  created_at: string;
  updated_at: string;
  products: ProductDashboard[];
};

type PurchasesDashboard = {
  purchases: PurchaseDashboard[];
};
const DashBoard = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState<PurchasesDashboard>(
    {} as PurchasesDashboard
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/purchases/dashboard`,
          {
            headers: {
              Accept: "application/json",
              Authorization: token ? token : "",
            },
          }
        );
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <Header />
      <div className="background-main-page p-4">
        <SalesStatistics data={data.purchases ? data.purchases : []} />
        <div className="grid grid-cols-3 gap-4 p-2">
          <CompareChart data={data.purchases ? data.purchases : []} />
          <StatusPieChart data={data.purchases ? data.purchases : []} />
          <ProductChart data={data.purchases ? data.purchases : []} />
          <ListActivity data={data.purchases ? data.purchases : []} />
        </div>
      </div>
    </main>
  );
};

export default DashBoard;
