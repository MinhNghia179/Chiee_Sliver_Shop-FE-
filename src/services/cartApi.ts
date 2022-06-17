import client from ".";

export const getListCartAPI = (payload:any) => {
  const {user_id = 0} = payload;
  return client.get(`cart?user_id=${user_id}`).then((res) => res.data);
};

export const addToCartAPI = (payload:any) => {
  return client.post('cart',payload).then((res) => res.data);
};

export const updateCartItemAPI = (payload:any) => {
  return client.put('cart',payload).then((res) => res.data);
};

export const deleteCartItemAPI = (payload:any) => {
  return client.delete('cart',payload).then((res) => res.data);
};