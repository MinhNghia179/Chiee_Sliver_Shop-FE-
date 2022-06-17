import { createSelectorHook } from 'react-redux'
import { combineReducers }    from 'redux'
import { all, fork }          from 'redux-saga/effects'

import authSaga                                       from 'setup/redux/auth/AuthSaga'
import authReducer, { initialAuthState as authState } from 'setup/redux/auth/AuthReducer';
import cartSaga                                       from 'setup/redux/cart/CartSaga'
import cartReducer, { initialCartState as cartState } from 'setup/redux/cart/CartReducer';
import productSaga                                    from 'setup/redux/product/ProductSaga';
import productReducer, 
{ initialProductState as productState }               from 'setup/redux/product/ProductReducer';
import blogSaga                                       from 'setup/redux/blog/BlogSaga';
import blogReducer, { initialBlogState as blogState } from 'setup/redux/blog/BlogReducer';
import favoriteSaga                                   from 'setup/redux/favorite/FavoriteSaga';
import favoriteReducer, 
{ initialFavoriteState as favoriteState }             from 'setup/redux/favorite/FavoriteReducer';
import orderSaga                                      from 'setup/redux/order/OrderSaga';
import orderReducer, 
{ initialOrderState as orderState }                   from 'setup/redux/order/OrderReducer';
import productReviewSaga                              from 'setup/redux/productReview/ProductReviewSaga';
import productReviewReducer, 
{ initialProductReviewState as productReviewState }   from 'setup/redux/productReview/ProductReviewReducer';
import CommonReducer, { defaultState as CommonState } from './CommonReducer';

export const rootReducer = combineReducers({
  common        : CommonReducer,
  auth          : authReducer,
  product       : productReducer,
  cart          : cartReducer,
  blog          : blogReducer,
  order         : orderReducer,
  favorite      : favoriteReducer,
  productReview : productReviewReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector = createSelectorHook<{
  auth           : typeof authState;
  common         : typeof CommonState;
  product        : typeof productState;
  cart           : typeof cartState;
  blog           : typeof blogState;
  favorite       : typeof favoriteState;
  order          : typeof orderState;
  productReview  : typeof productReviewState;
}>();

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(productSaga),
    fork(cartSaga),
    fork(blogSaga),
    fork(favoriteSaga),
    fork(orderSaga),
    fork(productReviewSaga),
  ]);
}
