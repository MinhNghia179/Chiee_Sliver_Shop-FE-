import { ListFavoriteModel } from 'models/FavoriteModel';
import { ListOrderModel } from 'models/order/OrderModel';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { EOrderType } from './OrderAction';

interface IOrderState {
    ListOrder: ListOrderModel;
}
export const initialOrderState: IOrderState = {
    ListOrder:{
      results:[],
      total:0
    }
}


const CartReducer = persistReducer(
    { storage, key: 'order', whitelist: [''] },
    (state: IOrderState = initialOrderState, action: any) => {
        switch (action.type) {
            case EOrderType.SET_LIST_ORDER: {
                return {...state, ListOrder:action.payload}
            }
            default:
                return state
        }
    }
)
export default CartReducer;
