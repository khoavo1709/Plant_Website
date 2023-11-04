import Product from "./product";

interface OrderItem {
    product: Product; // Assuming you have the Product interface defined
    quantity: number;
    price: number;
  }