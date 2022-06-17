import { ProductModel } from "./product/ProductModel";

export interface FavoriteModel {
  user_id: number;
  product_id: number;
}

export interface ListFavoriteModel {
  results: ProductModel[];
  total: number;
}
