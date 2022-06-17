import client from ".";

export const getListProductAPI = (payload:any) => {
  const {page = 1,pageSize = 9,status = -1,category_id=-1,query = '',order_by='id DESC'} = payload;
  return client.get(`product?page=${page}&pageSize=${pageSize}&status=${status}&category_id=${category_id}&query=${query}&order_by=${order_by}`).then((res) => res.data);
};

export const getProductDetailAPI = (id:any) => {
  return client.get(`product/${id}`).then((res) => res.data);
};

export const getProductBestSellingAPI = () => {
  return client.get(`product-best-selling`).then((res) => res.data);
};

export const getProductNewAPI = () => {
  return client.get(`product-new`).then((res) => res.data);
};