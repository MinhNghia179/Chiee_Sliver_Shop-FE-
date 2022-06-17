import { persistReducer }       from "redux-persist";
import storage                  from "redux-persist/lib/storage";

import { EProductReviewType }   from "./ProductReviewAction";

interface IProductReviewState {}

export const initialProductReviewState: IProductReviewState = {};

const ProductReviewReducer = persistReducer(
  { storage, key: "product-review", whitelist: [], blacklist:[]},
  (state: IProductReviewState = initialProductReviewState, action: any) => {
    switch (action.type) {
      default:
        return state;
    }
  }
);
export default ProductReviewReducer;
