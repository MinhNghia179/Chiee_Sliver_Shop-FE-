import { ListFavoriteModel } from 'models/FavoriteModel';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { EFavoriteType } from './FavoriteAction';

interface IFavoriteState {
    ListFavorite: ListFavoriteModel;
}
export const initialFavoriteState: IFavoriteState = {
    ListFavorite:{
      results:[],
      total:0
    }
}


const CartReducer = persistReducer(
    { storage, key: 'cart', whitelist: [''] },
    (state: IFavoriteState = initialFavoriteState, action: any) => {
        switch (action.type) {
            case EFavoriteType.SET_LIST_FAVORITE: {
                return {...state, ListFavorite:action.payload}
            }
            default:
                return state
        }
    }
)
export default CartReducer;
