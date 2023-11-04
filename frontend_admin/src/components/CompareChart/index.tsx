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
import { Order } from "../../../types/order";
import { useEffect, useState } from "react";

const CompareChart = ({ data }: { data: Order[] }) => {
  const linechartdata: { name: string; PLANT: number; ACCESSORY: number }[] =
    [];
  const getMonthYear = (date: Date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}`;
  };

  const aggregatedData = new Map();

  data.forEach((purchase) => {
    if (purchase.status !== "delivered") return;
    const monthYear = getMonthYear(new Date(purchase.purchaseAt));

    if (!aggregatedData.has(monthYear)) {
      aggregatedData.set(monthYear, { PLANT: 0, ACCESSORY: 0 });
    }

    purchase.purchaseProducts.forEach(
      (item: { product: { type: any }; price: number; quantity: number }) => {
        const productType = item.product.type;
        aggregatedData.get(monthYear)[productType] +=
          item.price * item.quantity;
      }
    );
  });

  aggregatedData.forEach((quantities, monthYear) => {
    const [year, month] = monthYear.split("-");
    linechartdata.push({
      name: `Month ${parseInt(month)}`,
      PLANT: quantities.PLANT,
      ACCESSORY: quantities.ACCESSORY,
    });
  });
  return (
    <div className=" col-span-2 p-5 bg-white rounded-xl h-[550px]">
      {" "}
      <p className=" text-xl font-semibold">This year</p>
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
