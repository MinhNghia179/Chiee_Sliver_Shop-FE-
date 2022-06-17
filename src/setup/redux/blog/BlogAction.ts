export enum EBlogType {
  GET_LIST_BLOG         = '[blog] GET_LIST_BLOG',
  SET_LIST_BLOG         = '[blog] SET_LIST_BLOG',
  GET_LIST_NEW_BLOG     = '[blog] GET_LIST_NEW_BLOG',
  SET_LIST_NEW_BLOG     = '[blog] SET_LIST_NEW_BLOG',
  GET_BLOG_DETAIL       = '[blog] GET_BLOG_DETAIL',
  SET_BLOG_DETAIL       = '[blog] SET_BLOG_DETAIL',
  GET_LIST_BLOG_COMMENT = '[blog] GET_LIST_BLOG_COMMENT',
  SET_LIST_BLOG_COMMENT = '[blog] SET_LIST_BLOG_COMMENT',
  CREATE_BLOG_COMMENT   = '[blog] CREATE_BLOG_COMMENT',
  UPDATE_BLOG_COMMENT   = '[blog] UPDATE_BLOG_COMMENT',
  DELETE_BLOG_COMMENT   = '[blog] DELETE_BLOG_COMMENT',
}

export const getListBlogAction = (payload:any,callBack?:any) => ({
  type: EBlogType.GET_LIST_BLOG,
  payload,callBack
});

export const setListBlogAction = (payload:any,callBack?:any) => ({
  type: EBlogType.SET_LIST_BLOG,
  payload,callBack
});

export const getListNewBlogAction = (payload?:any,callBack?:any) => ({
  type: EBlogType.GET_LIST_NEW_BLOG,
  payload,callBack
});

export const setListNewBlogAction = (payload:any,callBack?:any) => ({
  type: EBlogType.SET_LIST_NEW_BLOG,
  payload,callBack
});

export const getBlogDetailAction = (payload:any,callBack?:any) => ({
  type: EBlogType.GET_BLOG_DETAIL,
  payload,callBack
});

export const setBlogDetailAction = (payload:any,callBack?:any) => ({
  type: EBlogType.SET_BLOG_DETAIL,
  payload,callBack
});

export const getListBlogCommentAction = (payload:any,callBack?:any) => ({
  type: EBlogType.GET_LIST_BLOG_COMMENT,
  payload,callBack
});

export const setListBlogCommentAction = (payload:any,callBack?:any) => ({
  type: EBlogType.SET_LIST_BLOG_COMMENT,
  payload,callBack
});

export const createBlogCommentAction = (payload:any,callBack?:any) => ({
  type: EBlogType.CREATE_BLOG_COMMENT,
  payload,callBack
});

export const updateBlogCommentAction = (payload:any,callBack?:any) => ({
  type: EBlogType.UPDATE_BLOG_COMMENT,
  payload,callBack
});

export const deleteBlogCommentAction = (payload:any,callBack?:any) => ({
  type: EBlogType.DELETE_BLOG_COMMENT,
  payload,callBack
});