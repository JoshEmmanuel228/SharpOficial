export interface Offer {
  id: number;
  productId: number;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Product {
  id: number;
  name: string;
  price: number;
  style: string;
  size: string;
  color: string;
  brand: string;
  imageUrls: string[];
  offers: Offer[];
  description: string;
}
