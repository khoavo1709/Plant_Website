import { Order } from "../../../types/order";

const ListActivity = ({ data }: { data: Order[] }) => {
  data.sort((a, b) => {
    return new Date(b.purchaseAt).getTime() - new Date(a.purchaseAt).getTime();
  });
  data = data.slice(0, 5);
  return (
    <div className="col-span-1 p-5 bg-white rounded-xl">
      <p className=" text-xl font-semibold">Recent activity</p>

      {data.map((order: Order) => (
        <div key={order.id}>
          {order.status === "pending" && (
            <p className="p-2 m-2 bg-yellow-100 text-sm">
              Customer {order.customerName} just placed an order value $
              {order.total} with ID {order.id}.
            </p>
          )}
          {order.status === "processing" && (
            <p className="p-2 m-2 bg-yellow-100 text-sm">
              Employee {order.createdBy?.name} has just confirmed the order
              value ${order.total} with ID {order.id}.
            </p>
          )}
          {order.status === "shipping" && (
            <p className="p-2 m-2 bg-blue-100 text-sm">
              Order {order.id} value ${order.total} is being shipped.
            </p>
          )}
          {order.status === "delivered" && (
            <p className="p-2 m-2 bg-green-100 text-sm">
              Order {order.id} value ${order.total} has been delivered
              successfully.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListActivity;
