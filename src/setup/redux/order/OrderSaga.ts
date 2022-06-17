import { call, put, takeLatest } from "redux-saga/effects";
import { EOrderType, setListOrderAction } from "./OrderAction";
import { addToFavoriteAPI, deleteFavoriteAPI, getListFavoriteAPI } from "services/favoriteApi";
import { createOrderAPI, createOrderStatusAPI, getListOrderAPI, getListOrderCheckStatusAPI, getListOrderDetailAPI } from "services/orderApi";
import { toastError, toastSuccess } from "utils/message";
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "config/message";

function* getListOrder({ payload, callBack }: any): any {
  try {
    const res: any = yield call(getListOrderAPI,payload);
    if (res.status) {
      yield put(setListOrderAction(res.data));
      if (callBack) {
        callBack();
      }
    }
  } catch (error: any) {}
}

function* getListOrderDetail({ payload, callBack }: any): any {
  try {
    const res: any = yield call(getListOrderDetailAPI,payload);
    if (res.status) {
      if (callBack) {
        callBack(res.data);
      }
    }
  } catch (error: any) {}
}

function* getListOrderCheckStatus({ payload, callBack }: any): any {
  try {
    const res: any = yield call(getListOrderCheckStatusAPI,payload);
    if (res.status) {
      if (callBack) {
        callBack(res.data);
      }
    }
  } catch (error: any) {}
}

function* createOrder({ payload, callBack }: any): any {
  try {
    const res: any = yield call(createOrderAPI,payload);
    if (res.status) {
      // yield put(setListFavoriteAction(res.data));
      if (callBack) {
        callBack();
      }
    }
  } catch (error: any) {
    toastError(error.message);
  }
}

function* cancelOrder({ payload, callBack }: any): any {
  try {
    const res: any = yield call(createOrderStatusAPI,payload);
    if (res.status) {
      toastSuccess(MESSAGE_SUCCESS.CANCEL_ORDER)
      if (callBack) {
        callBack();
      }
    }else{
      toastError(MESSAGE_ERROR.CANCEL_ORDER);
    }
  } catch (error: any) {
    toastError(error.message);
  }
}

export default function* favoriteSaga() {
  yield takeLatest(EOrderType.GET_LIST_ORDER, getListOrder);
  yield takeLatest(EOrderType.CREATE_ORDER, createOrder);
  yield takeLatest(EOrderType.GET_LIST_ORDER_DETAIL, getListOrderDetail);
  yield takeLatest(EOrderType.GET_LIST_ORDER_CHECK_STATUS, getListOrderCheckStatus);
  yield takeLatest(EOrderType.CANCEL_ORDER, cancelOrder);
}
