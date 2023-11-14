interface Product {
  id: number;
  type: "PLANT" | "ACCESSORY";
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}
export default Product;
