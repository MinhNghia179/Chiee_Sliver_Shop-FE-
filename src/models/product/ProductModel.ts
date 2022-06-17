import { CartModel } from "models/CartModel";
import { ProductReviewModel } from "./ProductReviewModel";

export interface ProductModel {
  id                    : number;
  category_id           : number;
  name                  : string;
  price                 : number;
  promotion_price       : number;
  promotion_time_start  : string;
  promotion_time_end    : string;
  list_image            : string;
  short_description     : string;
  description           : string;
  created_at            : string;
  created_by            : string;
  modified_at           : string;
  modified_by           : string;
  properties            : any;
  status                : boolean;
  product_reviews       : ProductReviewModel[]
}

export interface ListProductModel {
  results         : ProductModel[];
  total           : number;
  currentPage    ?: number;
  totalPage      ?: number;
}

export interface ProductImageModel{
  id    : string;
  url   : string;
}

export interface ProductColorModel {
  id          : string;
  color_name  : string;
  amount      : number;
  sizes       : ProductSizeModel[];
}

export interface ProductSizeModel {
  size_id   : string;
  size_name : string;
  amount    : number;
}

export interface ProductBuyNowModel {
  cart        : CartModel;
  totalMoney  : number; 
}