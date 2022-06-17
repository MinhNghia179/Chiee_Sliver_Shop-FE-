import client from '.';

export const getListOrderAPI = (payload:any) => {
  const { user_id } = payload;
  return client.get(`order?user_id=${user_id}`).then(res => res.data);
}

export const getListOrderDetailAPI = (id:any) => {
  return client.get(`order/${id}`).then(res => res.data);
}

export const getListOrderCheckStatusAPI = (order_id:any) => {
  return client.get(`order-check-status/${order_id}`).then(res => res.data);
}

export const createOrderStatusAPI = (payload:any) => {
  return client.post('order-check-status',payload).then(res => res.data);
}

export const createOrderAPI = (payload:any) => {
  return client.post('order',payload).then(res => res.data);
}