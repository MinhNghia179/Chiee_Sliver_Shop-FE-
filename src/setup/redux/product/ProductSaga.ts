import { call, put, takeLatest } from "redux-saga/effects";
import { setLoadingAction } from "setup/redux/CommonReducer";
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "config/message";
import {
  EProductType,
  setListCategoryAction,
  setListProductAction,
  setProductBestSellingAction,
  setProductDetailAction,
  setProductNewAction,
} from "./ProductAction";
import { productCategoriesAPI } from "services/productCategoryApi";
import {
  getListProductAPI,
  getProductBestSellingAPI,
  getProductDetailAPI,
  getProductNewAPI,
} from "services/productApi";

function* getListProductCategory({ payload, callBack }: any): any {
  try {
    const res: any = yield call(productCategoriesAPI);
    if (res.status) {
      yield put(setListCategoryAction(res.data));

      if (callBack) callBack();
    }
  } catch (error: any) {}
}

function* getListProduct({ payload, callBack }: any): any {
  try {
    const res: any = yield call(getListProductAPI, payload);
    if (res.status) {
      yield put(setListProductAction(res.data));
    }
    if (callBack) callBack();
  } catch (error: any) {}
}

function* getProductDetail({ payload, callBack }: any): any {
  try {
    const res: any = yield call(getProductDetailAPI, payload);
    if (res.status) {
      yield put(setProductDetailAction(res.data));
    }
    if (callBack) callBack();
  } catch (error: any) {}
}

function* getListProductBestSelling({ payload, callBack }: any): any {
  try {
    const res: any = yield call(getProductBestSellingAPI);
    if (res.status) {
      yield put(setProductBestSellingAction(res.data));
    }
    if (callBack) callBack();
  } catch (error: any) {}
}

function* getListProductNew({ payload, callBack }: any): any {
  try {
    const res: any = yield call(getProductNewAPI);
    if (res.status) {
      yield put(setProductNewAction(res.data));
    }
    if (callBack) callBack();
  } catch (error: any) {}
}

export default function* productSaga() {
  yield takeLatest(EProductType.GET_LIST_CATEGORY, getListProductCategory);
  yield takeLatest(EProductType.GET_LIST_PRODUCT, getListProduct);
  yield takeLatest(EProductType.GET_PRODUCT_DETAIL, getProductDetail);
  yield takeLatest(EProductType.GET_PRODUCT_BEST_SELLING, getListProductBestSelling);
  yield takeLatest(EProductType.GET_PRODUCT_NEW, getListProductNew);
}
