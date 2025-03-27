export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  reviews?: review[];
  images: string[];
  availabilityStatus?: string;
  minimumOrderQuantity?: number;
  sku?: string;
  returnPolicy?: string;
  warrantyInformation?: string;
  meta?: any;
}

export interface review {
  rating: number;
  comment: string;
  date?: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}
