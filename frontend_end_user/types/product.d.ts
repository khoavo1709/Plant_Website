interface Product {
  id: number;
  type: 'PLANT' | 'ACCESSORY';
  name: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  careInstructions?: CareInstructions;
}

interface CareInstructions {
  light?: string;
  water?: string;
  humidity?: string;
  fertilizer?: string;
  propagation?: string;
  repotting?: string;
  toxicity?: boolean;
}
