import client from ".";

export const updateUserInfoAPI = (payload:any) => {
  return client.put("accounts/update-info", payload).then((res) => res.data);
};

export const getAccountByIdAPI = (id:any) => {
  return client.get(`accounts/${id}`).then((res) => res.data);
};

export const updatePasswordAPI = (payload:any) => {
  return client.put(`accounts/update-password`,payload).then((res) => res.data);
};

