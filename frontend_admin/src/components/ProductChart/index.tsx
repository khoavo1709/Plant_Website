import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
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
const ProductChart = ({ data }: { data: PurchaseDashboard[] }) => {
  const productChartData: { name: string; SOLD: number }[] = [];
  data.forEach((purchase) => {
    purchase.products.forEach((purchaseProduct) => {
      const productName = purchaseProduct.name;

      const existingProductIndex = productChartData.findIndex(
        (product) => product.name === productName
      );

      if (existingProductIndex !== -1) {
        productChartData[existingProductIndex].SOLD += purchaseProduct.pivot.quantity;
      } else {
        productChartData.push({
          name: productName,
          SOLD: purchaseProduct.pivot.quantity,
        });
      }
    });
  });
  return (
    <div className=" col-span-2 p-5 bg-white rounded-xl h-[550px]">
      <div className="mb-2 text-xl font-bold">Product statistics</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={400}
          data={productChartData}
          margin={{
            top: 20,
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
          <Bar dataKey="SOLD" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductChart;
