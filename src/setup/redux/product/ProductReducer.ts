import { CartModel } from "models/CartModel";
import { ListProductCategoryModel } from "models/product/ProductCategoryModel";
import { ListProductModel, ProductBuyNowModel, ProductModel } from "models/product/ProductModel";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { EProductType } from "./ProductAction";

interface IProductState {
  ListProductCategory     : ListProductCategoryModel;
  ListProduct             : ListProductModel;
  ListProductBestSelling  : ListProductModel;
  ListProductNew          : ListProductModel;
  ProductDetail?          : ProductModel;
  OrderBy                 : string;
  ProductBuyNow          ?: ProductBuyNowModel;
}
export const initialProductState: IProductState = {
  ListProductCategory: {
    results: [],
    total: 0,
  },
  ListProduct: {
    results: [],
    total: 0,
    currentPage: 0,
    totalPage: 0,
  },
  ListProductBestSelling: {
    results: [],
    total: 0
  },
  ListProductNew: {
    results: [],
    total: 0
  },
  OrderBy:'id DESC'
};

const ProductReducer = persistReducer(
  { storage, key: "product", whitelist: ["ListProductCategory", "ListProduct","ListProductBestSelling","ListProductNew"], blacklist:["ProductBuyNow","ProductDetail"] },
  (state: IProductState = initialProductState, action: any) => {
    switch (action.type) {
      case EProductType.SET_LIST_CATEGORY: {
        return { ...state, ListProductCategory: action.payload };
      }
      case EProductType.SET_LIST_PRODUCT: {
        return { ...state, ListProduct: action.payload };
      }
      case EProductType.SET_PRODUCT_BEST_SELLING: {
        return { ...state, ListProductBestSelling: action.payload };
      }
      case EProductType.SET_PRODUCT_NEW: {
        return { ...state, ListProductNew: action.payload };
      }
      case EProductType.SET_PRODUCT_DETAIL: {
        return { ...state, ProductDetail: action.payload };
      }
      case EProductType.SET_ORDER_BY: {
        return { ...state, OrderBy: action.payload };
      }
      case EProductType.SET_PRODUCT_BUY_NOW: {
        return { ...state, ProductBuyNow: action.payload };
      }
      default:
        return state;
    }
  }
);
export default ProductReducer;
