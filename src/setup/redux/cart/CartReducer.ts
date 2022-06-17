import { ListCartModel } from "models/CartModel";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ECartType } from "./CartAction";

interface ICartState {
  ListCart: ListCartModel;
  IdsChecked:number[];
  TotalMoney:number;
}
export const initialCartState: ICartState = {
  ListCart: {
    results: [],
    total: 0,
  },
  IdsChecked:[],
  TotalMoney:0
};

const CartReducer = persistReducer(
  { storage, key: "cart", whitelist: [""] },
  (state: ICartState = initialCartState, action: any) => {
    switch (action.type) {
      case ECartType.SET_LIST_CART: {
        return { ...state, ListCart: action.payload };
      }
      case ECartType.SET_LIST_IDS_CHECKED: {
        return { ...state, IdsChecked: action.payload };
      }
      case ECartType.SET_TOTAL_MONEY: {
        return { ...state, TotalMoney: action.payload };
      }
      case ECartType.CLEAR: {
        return { 
          ListCart: {
            results: [],
            total: 0,
          },
          IdsChecked:[],
          TotalMoney:0
        };
      }
      default:
        return state;
    }
  }
);
export default CartReducer;
