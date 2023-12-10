import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
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

const CompareChart = ({ data }: { data: PurchaseDashboard[] }) => {
  const linechartdata: { name: string; PLANT: number; ACCESSORY: number }[] =
    [];
  const getMonthYear = (date: Date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}`;
  };

  const aggregatedData = new Map();

  data.forEach((purchase) => {
    if (purchase.status !== "COMPLETED") return;
    const monthYear = getMonthYear(new Date(purchase.created_at));

    if (!aggregatedData.has(monthYear)) {
      aggregatedData.set(monthYear, { PLANT: 0, ACCESSORY: 0 });
    }

    purchase.products.forEach((item) => {
      const productType = item.type;
      aggregatedData.get(monthYear)[productType] +=
        item.pivot.price * item.pivot.quantity;
    });
  });

  aggregatedData.forEach((quantities, monthYear) => {
    const [, month] = monthYear.split("-");
    linechartdata.push({
      name: `Month ${parseInt(month)}`,
      PLANT: quantities.PLANT,
      ACCESSORY: quantities.ACCESSORY,
    });
  });
  return (
    <div className=" col-span-2 p-4 pb-10 bg-white rounded-xl h-[550px]">
      {" "}
      <div className="mb-2 text-xl font-bold">This year</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={400}
          height={400}
          data={linechartdata}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="PLANT"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="ACCESSORY"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompareChart;
