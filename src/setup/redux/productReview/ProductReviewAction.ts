export enum EProductReviewType {
  GET_LIST            = '[product-review] GET_LIST',
  CREATE_REVIEW       = '[product-review] CREATE_REVIEW',
}

export const createReviewAction = (payload:any,callBack?:any) => ({
  type: EProductReviewType.CREATE_REVIEW,
  payload,callBack
});


