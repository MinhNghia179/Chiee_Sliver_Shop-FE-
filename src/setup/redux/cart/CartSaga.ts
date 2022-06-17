import { call, put, takeLatest } from "redux-saga/effects";
import { ECartType, setListCartAction } from "./CartAction";
import { addToCartAPI, deleteCartItemAPI, getListCartAPI, updateCartItemAPI } from "services/cartApi";

function* getListCart({ payload, callBack }: any): any {
  try {
    const res: any = yield call(getListCartAPI, payload);
    if (res.status) {
      yield put(setListCartAction(res.data));
      if (callBack) {
        callBack();
      }
    }
  } catch (error: any) {}
}

function* addToCart({ payload, callBack }: any): any {
  try {
    const res: any = yield call(addToCartAPI, payload);
    if (res) {
      if (callBack) {
        callBack(res);
      }
    }
  } catch (error: any) {}
}

function* updateCartItem({ payload, callBack }: any): any {
  try {
    const res: any = yield call(updateCartItemAPI, payload);
    if (res) {
      if (callBack) {
        callBack(res);
      }
    }
  } catch (error: any) {}
}

function* deleteCartItem({ payload, callBack }: any): any {
  try {
    const res: any = yield call(deleteCartItemAPI, payload);
    if (res) {
      if (callBack) {
        callBack(res);
      }
    }
  } catch (error: any) {}
}

export default function* cartSaga() {
  yield takeLatest(ECartType.GET_LIST_CART, getListCart);
  yield takeLatest(ECartType.ADD_TO_CART, addToCart);
  yield takeLatest(ECartType.UPDATE_CART_ITEM, updateCartItem);
  yield takeLatest(ECartType.DELETE_CART_ITEM, deleteCartItem);
}
