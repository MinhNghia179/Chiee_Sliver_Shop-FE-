export enum EProductType {
  GET_LIST_CATEGORY         = '[product] GET_LIST_CATEGORY',
  SET_LIST_CATEGORY         = '[product] SET_LIST_CATEGORY',
  GET_LIST_PRODUCT          = '[product] GET_LIST_PRODUCT',
  SET_LIST_PRODUCT          = '[product] SET_LIST_PRODUCT',
  GET_PRODUCT_DETAIL        = '[product] GET_PRODUCT_DETAIL',
  SET_PRODUCT_DETAIL        = '[product] SET_PRODUCT_DETAIL',
  GET_PRODUCT_BEST_SELLING  = '[product] GET_PRODUCT_BEST_SELLING',
  SET_PRODUCT_BEST_SELLING  = '[product] SET_PRODUCT_BEST_SELLING',
  GET_PRODUCT_NEW           = '[product] GET_PRODUCT_NEW',
  SET_PRODUCT_NEW           = '[product] SET_PRODUCT_NEW',
  SET_ORDER_BY              = '[product] SET_ORDER_BY',
  SET_PRODUCT_BUY_NOW       = '[product] SET_PRODUCT_BUY_NOW',
}

export const getListCategoryAction = (payload?:any,callBack?:any) => ({
  type: EProductType.GET_LIST_CATEGORY,
  payload,callBack
});

export const setListCategoryAction = (payload:any,callBack?:any) => ({
  type: EProductType.SET_LIST_CATEGORY,
  payload,callBack
});

export const getListProductAction = (payload:any,callBack?:any) => ({
  type: EProductType.GET_LIST_PRODUCT,
  payload,callBack
});

export const setListProductAction = (payload:any,callBack?:any) => ({
  type: EProductType.SET_LIST_PRODUCT,
  payload,callBack
});

export const getProductDetailAction = (payload:any,callBack?:any) => ({
  type: EProductType.GET_PRODUCT_DETAIL,
  payload,callBack
});

export const setProductDetailAction = (payload:any,callBack?:any) => ({
  type: EProductType.SET_PRODUCT_DETAIL,
  payload,callBack
});

export const getProductBestSellingAction = (payload?:any,callBack?:any) => ({
  type: EProductType.GET_PRODUCT_BEST_SELLING,
  payload,callBack
});

export const setProductBestSellingAction = (payload:any,callBack?:any) => ({
  type: EProductType.SET_PRODUCT_BEST_SELLING,
  payload,callBack
});

export const getProductNewAction = (payload?:any,callBack?:any) => ({
  type: EProductType.GET_PRODUCT_NEW,
  payload,callBack
});

export const setProductNewAction = (payload:any,callBack?:any) => ({
  type: EProductType.SET_PRODUCT_NEW,
  payload,callBack
});

export const setOrderByAction = (payload:any,callBack?:any) => ({
  type: EProductType.SET_ORDER_BY,
  payload,callBack
});

export const setProductBuyNowAction = (payload:any,callBack?:any) => ({
  type: EProductType.SET_PRODUCT_BUY_NOW,
  payload,callBack
});
