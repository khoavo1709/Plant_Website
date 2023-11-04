import { Order } from "../../../types/order";

const SalesStatistics = ({ data }: { data: Order[] }) => {
  let totalCompletedOrders = 0;
  let totalProductsSold = 0;
  let totalOrderCompleteValue = 0;
  let totalOrderValue = 0;

  data.forEach((purchase) => {
    const purchaseDate = new Date(purchase.purchaseAt);
    const currentDate = new Date();
    if (
      purchaseDate.getMonth() === currentDate.getMonth() &&
      purchaseDate.getFullYear() === currentDate.getFullYear()
    ) {
      if (purchase.status == "delivered") totalCompletedOrders += 1;
      purchase.purchaseProducts.forEach(
        (item: {
          product: { type: unknown };
          price: number;
          quantity: number;
        }) => {
          totalProductsSold += item.quantity;
          if (purchase.status == "delivered")
            totalOrderCompleteValue += item.price * item.quantity;
          totalOrderValue += item.price * item.quantity;
        }
      );
    }
  });
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="p-5 bg-white rounded-xl m-2">
        <div className="flex justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
        </div>
        <div className="ml-2 w-full flex-1">
          <div>
            <div className="mt-3 text-2xl font-bold leading-8">
              {totalCompletedOrders}
            </div>

            <div className="mt-1 text-sm text-gray-600">
              Number of orders completed this month
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 bg-white rounded-xl m-2">
        <div className="flex justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>{" "}
        </div>
        <div className="ml-2 w-full flex-1">
          <div>
            <div className="mt-3 text-2xl font-bold leading-8">
              {totalProductsSold}
            </div>

            <div className="mt-1 text-sm text-gray-600">
              Number of products sold this month
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 bg-white rounded-xl m-2">
        <div className="flex justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-2 w-full flex-1">
          <div>
            <div className="mt-3 text-2xl font-bold leading-8">
              ${totalOrderCompleteValue.toFixed(2)}
            </div>

            <div className="mt-1 text-sm text-gray-600">
              Total value of orders completed this month
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 bg-white rounded-xl m-2">
        <div className="flex justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
        </div>
        <div className="ml-2 w-full flex-1">
          <div>
            <div className="mt-3 text-2xl font-bold leading-8">
              ${totalOrderValue.toFixed(2)}
            </div>

            <div className="mt-1 text-sm text-gray-600">
              Total order value this month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesStatistics;
