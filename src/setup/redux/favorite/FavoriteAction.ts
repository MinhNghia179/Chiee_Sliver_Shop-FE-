export enum EFavoriteType {
  GET_LIST_FAVORITE = "[favorite] GET_LIST_FAVORITE",
  SET_LIST_FAVORITE = "[favorite] SET_LIST_FAVORITE",
  ADD_TO_FAVORITE = "[favorite] ADD_TO_FAVORITE",
  DELETE_FAVORITE = "[favorite] DELETE_FAVORITE",
}

export const getListFavoriteAction = (payload: any, callBack?: any) => ({
  type: EFavoriteType.GET_LIST_FAVORITE,
  payload,
  callBack,
});

export const setListFavoriteAction = (payload: any, callBack?: any) => ({
  type: EFavoriteType.SET_LIST_FAVORITE,
  payload,
  callBack,
});

export const addToFavoriteAction = (payload: any, callBack?: any) => ({
  type: EFavoriteType.ADD_TO_FAVORITE,
  payload,
  callBack,
});

export const deleteFavoriteAction = (payload: any, callBack?: any) => ({
  type: EFavoriteType.DELETE_FAVORITE,
  payload,
  callBack,
});

