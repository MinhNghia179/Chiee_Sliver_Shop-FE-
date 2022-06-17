import { call, put, takeLatest } from "redux-saga/effects";

import { EProductReviewType } from "./ProductReviewAction";
import { productCategoriesAPI } from "services/productCategoryApi";
import { createReviewAPI } from "services/productReviewApi";

function* createReview({ payload, callBack }: any): any {
  try {
    const res: any = yield call(createReviewAPI,payload);
    if (res.status) {
      if (callBack) callBack();
    }
  } catch (error: any) {}
}

export default function* productReviewSaga() {
  yield takeLatest(EProductReviewType.CREATE_REVIEW, createReview);
}
