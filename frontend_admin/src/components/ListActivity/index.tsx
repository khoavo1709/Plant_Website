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
const ListActivity = ({ data }: { data: PurchaseDashboard[] }) => {
  data.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  data = data.slice(0, 5);
  return (
    <div className="col-span-1 p-5 bg-white rounded-xl">
      <div className="mb-4 text-xl font-bold">Recent activity</div>

      {data.map((order: PurchaseDashboard) => (
        <div key={order.id}>
          {order.status === "PENDING" && (
            <p className="p-2 m-2 bg-yellow-100 text-sm">
              Customer {order.customer_name} just placed an order value $
              {order.total} with ID {order.id}.
            </p>
          )}
          {order.status === "PROCESSING" && (
            <p className="p-2 m-2 bg-[#fcadfc] text-sm">
              An order value ${order.total} with ID {order.id} just confirmed.
            </p>
          )}
          {order.status === "SHIPPED" && (
            <p className="p-2 m-2 bg-blue-100 text-sm">
              Order {order.id} value ${order.total} is being shipped.
            </p>
          )}
          {order.status === "COMPLETED" && (
            <p className="p-2 m-2 bg-green-100 text-sm">
              Order {order.id} value ${order.total} has been completed.
              successfully.
            </p>
          )}
          {order.status === "CANCELLED" && (
            <p className="p-2 m-2 bg-red-100 text-sm">
              Order {order.id} value ${order.total} has been cancelled.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListActivity;
