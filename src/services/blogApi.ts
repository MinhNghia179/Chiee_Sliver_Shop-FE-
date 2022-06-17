import client from ".";

export const getListBlogAPI = (payload: any) => {
  const { page = 0, pageSize = 10 } = payload;
  return client.get(`blog?page=${page}&pageSize=${pageSize}&status=1`).then(res => res.data);
};

export const getBlogDetailAPI = (id: any) => {
  return client.get(`blog/${id}`).then(res => res.data);
};

export const getListBlogCommentAPI = (payload: any) => {
  const {blog_id,page = 0, pageSize = 5} = payload;
  return client.get(`blog-comment-by-blog?blog_id=${blog_id}&page=${page}&pageSize=${pageSize}`).then(res => res.data);
};

export const createBlogCommentAPI = (payload: any) => {
  return client.post(`blog-comment`,payload).then(res => res.data);
};

export const updateBlogCommentAPI = (payload: any) => {
  return client.put(`blog-comment`,payload).then(res => res.data);
};

export const deleteBlogCommentAPI = (id: any) => {
  return client.delete(`blog-comment/${id}`).then(res => res.data);
};
