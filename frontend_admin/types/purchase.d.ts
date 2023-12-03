import { OrderItem } from "./orderItem";
import { User } from "./user";
interface Purchase {
  id: string;
  customer_name: string;
  mobile: string;
  customer_email: string;
  address: string;
  products: OrderItem[];
  total: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "COMPLETED" | "CANCELLED";
  note?: string;
  created_at: Date;
}
