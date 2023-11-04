import { OrderItem } from "./orderItem";
import { User } from "./user";
interface Order {
  id: string;
  customerName: "Alice Johnson";
  customerMobile: "555-7890";
  customerEmail: "alice@example.com";
  customerAddress: "789 Pine St, Villageton";
  purchaseProducts: OrderItem[];
  total: number;
  status:"pending"  | "processing" | "shipping" | "delivered";
  note?: string;
  purchaseAt: string;
  createdBy: User;
}
