export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  popupOpened: boolean; 
  productQuantities: Record<number, number>;
}