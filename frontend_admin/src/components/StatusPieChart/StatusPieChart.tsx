import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Order } from "../../../types/order";

const StatusPieChart = ({ data }: { data: Order[] }) => {
  function getPieChartData(data: Order[]) {
    const pieChartData = [
      { name: "PENDING", value: 0 },
      { name: "SHIPPING", value: 0 },
      { name: "DELIVERY", value: 0 },
      { name: "PROCESSING", value: 0 },
    ];

    data.forEach((purchase) => {
      switch (purchase.status) {
        case "pending":
          pieChartData[0].value += 1;
          break;
        case "shipping":
          pieChartData[1].value += 1;
          break;
        case "delivered":
          pieChartData[2].value += 1;
          break;
        case "processing":
          pieChartData[3].value += 1;
          break;
        default:
          break;
      }
    });

    return pieChartData;
  }
  const piechartdata = getPieChartData(data);

  const COLORS = ["#FFD700", "#0000FF", "#008000", "#FFA500"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent === 0) return null;
    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontWeight={700}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className=" col-span-1 p-5  bg-white rounded-xl h-[550px] ">
      {" "}
      <div className=" text-xl font-bold">Order status</div>
      <div className=" flex justify-center mt-4 ">
        <ResponsiveContainer width="100%" height="100%" minHeight={400}>
          <PieChart width={400} height={400}>
            <Tooltip />
            <Pie
              data={piechartdata}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {piechartdata.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className=" flex justify-center">
        <div className="mt-4 grid grid-cols-2 ">
          {piechartdata.map((entry, index) => (
            <div
              key={index}
              className=" col-span-1 flex justify-start items-center mx-4 text-sm"
            >
              <div
                className="rounded-full w-3 h-3 mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              {entry.name}
              {" : " + entry.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StatusPieChart;
