import { Product } from './product';
interface CartItems {
  product: Product;
  quantity: number;
  unitPrice: number;
}

interface Cart {
  cartItems: CartItems[];
  totalPrice: number;
}
