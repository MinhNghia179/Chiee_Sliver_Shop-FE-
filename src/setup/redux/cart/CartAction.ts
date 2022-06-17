export enum ECartType {
  ADD_TO_CART           = "[cart] ADD_TO_CART",
  UPDATE_CART_ITEM      = "[cart] UPDATE_CART_ITEM",
  DELETE_CART_ITEM      = "[cart] DELETE_CART_ITEM",
  GET_LIST_CART         = "[cart] GET_LIST_CART",
  SET_LIST_CART         = "[cart] SET_LIST_CART",
  SET_LIST_IDS_CHECKED  = "[cart] SET_LIST_IDS_CHECKED",
  SET_TOTAL_MONEY       = "[cart] SET_TOTAL_MONEY",
  CLEAR                 = "[cart] CLEAR",
}

export const addToCartAction = (payload: any, callBack: any) => ({
  type: ECartType.ADD_TO_CART,
  payload,
  callBack,
});

export const updateCartItemAction = (payload: any, callBack: any) => ({
  type: ECartType.UPDATE_CART_ITEM,
  payload,
  callBack,
});

export const deleteCartAction = (payload: any, callBack: any) => ({
  type: ECartType.DELETE_CART_ITEM,
  payload,
  callBack,
});

export const getListCartAction = (payload: any, callBack?: any) => ({
  type: ECartType.GET_LIST_CART,
  payload,
  callBack,
});

export const setListCartAction = (payload: any, callBack?: any) => ({
  type: ECartType.SET_LIST_CART,
  payload,
  callBack,
});

export const setIdsCheckedAction = (payload: any, callBack?: any) => ({
  type: ECartType.SET_LIST_IDS_CHECKED,
  payload,
  callBack,
});

export const setTotalMoneyAction = (payload: any, callBack?: any) => ({
  type: ECartType.SET_TOTAL_MONEY,
  payload,
  callBack,
});

export const clearCartAction = (payload?: any, callBack?: any) => ({
  type: ECartType.CLEAR,
  payload, callBack,
});