import client from '.';

export const getListFavoriteAPI = (payload:any) => {
  const {user_id = 0} = payload;
  return client.get(`favorite?user_id=${user_id}`).then(res => res.data);
}

export const addToFavoriteAPI = (payload:any) => {
  return client.post('favorite',payload).then(res => res.data);
}

export const deleteFavoriteAPI = (payload:any) => {
  return client.delete('favorite',payload).then(res => res.data);
}
