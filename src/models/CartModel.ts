import { ProductModel } from "./product/ProductModel";

export interface CartModel {
  id:number;
  user_id: number;
  product_id: number;
  amount: number;
  properties:any;
  product: ProductModel;
}
export interface ListCartModel {
  results: CartModel[];
  total: number;
}
