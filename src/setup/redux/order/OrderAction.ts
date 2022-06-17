export enum EOrderType {
  GET_LIST_ORDER = "[order] GET_LIST_ORDER",
  SET_LIST_ORDER = "[order] SET_LIST_ORDER",
  CREATE_ORDER = "[order] CREATE_ORDER",
  GET_LIST_ORDER_DETAIL = "[order] GET_LIST_ORDER_DETAIL",
  GET_LIST_ORDER_CHECK_STATUS = "[order] GET_LIST_ORDER_CHECK_STATUS",
  CANCEL_ORDER = "[order] CANCEL_ORDER"
}

export const createOrderAction = (payload: any, callBack?: any) => ({
  type: EOrderType.CREATE_ORDER,
  payload,
  callBack,
});

export const getListOrderAction = (payload: any, callBack?: any) => ({
  type: EOrderType.GET_LIST_ORDER,
  payload,
  callBack,
});

export const setListOrderAction = (payload: any, callBack?: any) => ({
  type: EOrderType.SET_LIST_ORDER,
  payload,
  callBack,
});

export const getListOrderDetailAction = (payload: any, callBack?: any) => ({
  type: EOrderType.GET_LIST_ORDER_DETAIL,
  payload,
  callBack,
});

export const getListOrderCheckStatusAction = (payload: any, callBack?: any) => ({
  type: EOrderType.GET_LIST_ORDER_CHECK_STATUS,
  payload,
  callBack,
});

export const cancelOrderStatusAction = (payload: any, callBack?: any) => ({
  type: EOrderType.CANCEL_ORDER,
  payload,
  callBack,
});