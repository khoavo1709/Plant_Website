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
import { Order } from "../../../types/order";
const ProductChart = ({ data }: { data: Order[] }) => {
  const productChartData: { name: string; SOLD: number }[] = [];
  data.forEach((purchase) => {
    purchase.purchaseProducts.forEach((purchaseProduct) => {
      const productName = purchaseProduct.product.name;

      const existingProductIndex = productChartData.findIndex(
        (product) => product.name === productName
      );

      if (existingProductIndex !== -1) {
        productChartData[existingProductIndex].SOLD += purchaseProduct.quantity;
      } else {
        productChartData.push({
          name: productName,
          SOLD: purchaseProduct.quantity,
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
