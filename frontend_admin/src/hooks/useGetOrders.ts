import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Order } from "../../types/order";
export interface OrdersResponse {
  data: Order[];
}


export const useGetOrders = () => {
  const [ordersResponse, setOrderResponse] = useState(null);
  const [params] = useSearchParams();

  useEffect(() => {
    const fetchOrders = async () => {
      const pageParam = params.get("page");
      let page = 1;

      if (pageParam) {
        const i = parseInt(pageParam);
        if (i > 0) {
          page = i;
        }
      }
      const jsonFile = "/mocks/orders.json";
      try {
        const response = await fetch(jsonFile);
        
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setOrderResponse(json);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [params, setOrderResponse]);

  return ordersResponse;
};
