import { call, put, takeLatest } from "redux-saga/effects";

import { setLoadingAction }      from "setup/redux/CommonReducer";
import { 
  EBlogType, 
  setBlogDetailAction, 
  setListBlogAction, 
  setListBlogCommentAction,
  setListNewBlogAction
}                                from "./BlogAction";
import { 
  createBlogCommentAPI,
  deleteBlogCommentAPI,
  getBlogDetailAPI, 
  getListBlogAPI, 
  getListBlogCommentAPI, 
  updateBlogCommentAPI
}                                from "services/blogApi";

function* getListBlog({ payload, callBack }: any): any {
  try {
    yield put(setLoadingAction(true));
    const res: any = yield call(getListBlogAPI, payload);
    if (res.status) {
      yield put(setListBlogAction(res.data));
      if (callBack) callBack();
    }
    yield put(setLoadingAction(false));
  } catch (error: any) {
    yield put(setLoadingAction(false));
  }
}

function* getBlogDetail({ payload, callBack }: any): any {
  try {
    yield put(setLoadingAction(true));
    const res: any = yield call(getBlogDetailAPI, payload);
    if (res.status) {
      yield put(setBlogDetailAction(res.data));
      if (callBack) callBack();
    }
    yield put(setLoadingAction(false));
  } catch (error: any) {
    yield put(setLoadingAction(false));
  }
}

function* getListBlogComment({ payload, callBack }: any): any {
  try {
    const res: any = yield call(getListBlogCommentAPI, payload);
    if(res.status){
      yield put(setListBlogCommentAction(res.data))
    }
    if (callBack) callBack();
  } catch (error: any) {
  }
}

function* createBlogComment({ payload, callBack }: any): any {
  try {
    const res: any = yield call(createBlogCommentAPI, payload);
    if(res.status){
      if (callBack) callBack(res);
    }
  } catch (error: any) {
  }
}

function* updateBlogComment({ payload, callBack }: any): any {
  try {
    const res: any = yield call(updateBlogCommentAPI, payload);
    if(res.status){
      if (callBack) callBack(res);
    }
  } catch (error: any) {
  }
}

function* deleteBlogComment({ payload, callBack }: any): any {
  try {
    const res: any = yield call(deleteBlogCommentAPI, payload);
    if(res.status){
      if (callBack) callBack(res);
    }
  } catch (error: any) {
  }
}

function* getListNewBlog({ payload, callBack }: any): any {
  try {
    const newPayload = {
      page:0,
      pageSize:4
    }
    const res: any = yield call(getListBlogAPI, newPayload);
    if (res.status) {
      yield put(setListNewBlogAction(res.data));
      if (callBack) callBack();
    }
  } catch (error: any) {
  }
}

export default function* authSaga() {
  yield takeLatest(EBlogType.GET_LIST_BLOG, getListBlog);
  yield takeLatest(EBlogType.GET_BLOG_DETAIL, getBlogDetail);
  yield takeLatest(EBlogType.GET_LIST_BLOG_COMMENT, getListBlogComment);
  yield takeLatest(EBlogType.CREATE_BLOG_COMMENT, createBlogComment);
  yield takeLatest(EBlogType.UPDATE_BLOG_COMMENT, updateBlogComment);
  yield takeLatest(EBlogType.DELETE_BLOG_COMMENT, deleteBlogComment);
  yield takeLatest(EBlogType.GET_LIST_NEW_BLOG, getListNewBlog);
}
