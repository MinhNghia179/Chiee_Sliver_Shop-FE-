import { call, put, takeLatest } from "redux-saga/effects";
import { EFavoriteType, setListFavoriteAction } from "./FavoriteAction";
import { addToFavoriteAPI, deleteFavoriteAPI, getListFavoriteAPI } from "services/favoriteApi";

function* getListFavorite({ payload, callBack }: any): any {
  try {
    const res: any = yield call(getListFavoriteAPI,payload);
    if (res.status) {
      yield put(setListFavoriteAction(res.data));
      if (callBack) {
        callBack();
      }
    }
  } catch (error: any) {}
}

function* addToFavoriteFavorite({ payload, callBack }: any): any {
  try {
    const res: any = yield call(addToFavoriteAPI,payload);
    if (res.status) {
      if (callBack) {
        callBack();
      }
    }
  } catch (error: any) {}
}

function* deleteFavoriteFavorite({ payload, callBack }: any): any {
  try {
    const res: any = yield call(deleteFavoriteAPI,payload);
    if (res.status) {
      if (callBack) {
        callBack();
      }
    }
  } catch (error: any) {}
}

export default function* favoriteSaga() {
  yield takeLatest(EFavoriteType.GET_LIST_FAVORITE, getListFavorite);
  yield takeLatest(EFavoriteType.ADD_TO_FAVORITE, addToFavoriteFavorite);
  yield takeLatest(EFavoriteType.DELETE_FAVORITE, deleteFavoriteFavorite);
}
