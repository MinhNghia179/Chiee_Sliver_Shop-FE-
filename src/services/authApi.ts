import client from ".";

export const loginAPI = (email: string, password: string) => {
  return client.post("login", { email, password }).then((res) => res.data);
};

export const registerAPI = (payload:any) => {
  return client.post("register", payload).then((res) => res.data);
};

export const forgotPasswordAPI = (payload: string) => {
  return client.post('forgot-password',payload).then((res) => res.data);
};

export const resetPassWordAPI = (payload: string) => {
  return client.post('reset-password',payload).then((res) => res.data);
};

export const checkTokenResetPasswordAPI = (payload: string) => {
  return client.post('check-token-reset-password',payload).then((res) => res.data);
};
