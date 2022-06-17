export enum EAuthType {
  LOGIN = '[auth] LOGIN',
  LOGIN_SUCCESS = '[auth] LOGIN_SUCCESS',
  LOGOUT = '[auth] LOGOUT',
  REGISTER = '[auth] REGISTER',
  UPDATE_USER_INFO = '[auth] UPDATE_USER_INFO',
  GET_ACCOUNT_DETAIL = '[auth] GET_ACCOUNT_DETAIL',
  SET_ACCOUNT_DETAIL = '[auth] SET_ACCOUNT_DETAIL',
  UPDATE_PASSWORD = '[auth] UPDATE_PASSWORD',
  CHECK_TOKEN_RESET_PASSWORD = '[auth] CHECK_TOKEN_RESET_PASSWORD',
  RESET_PASSWORD = '[auth] RESET_PASSWORD',
  FORGOT_PASSWORD = '[auth] FORGOT_PASSWORD',
}

export const loginAction = (payload: any, callBack: any) => ({
  type: EAuthType.LOGIN,
  payload,
  callBack,
});

export const loginSuccessAction = (data: any) => ({
  type: EAuthType.LOGIN_SUCCESS,
  payload: data,
});

export const logoutAction = ({ payload }: any) => ({
  type: EAuthType.LOGOUT,
  payload,
});

export const registerAction = (payload: any, callBack: any) => ({
  type: EAuthType.REGISTER,
  payload,
  callBack,
});

export const updateUserInfoAction = (payload: any, callBack?: any) => ({
  type: EAuthType.UPDATE_USER_INFO,
  payload,
  callBack,
});

export const getAccountDetailAction = (payload: any, callBack: any) => ({
  type: EAuthType.GET_ACCOUNT_DETAIL,
  payload,
  callBack,
});

export const setAccountDetailAction = (payload: any, callBack?: any) => ({
  type: EAuthType.SET_ACCOUNT_DETAIL,
  payload,
  callBack,
});

export const updatePasswordAction = (payload: any, callBack?: any) => ({
  type: EAuthType.UPDATE_PASSWORD,
  payload,
  callBack,
});

export const checkTokenResetPasswordAction = (
  payload: any,
  callBack?: any
) => ({
  type: EAuthType.CHECK_TOKEN_RESET_PASSWORD,
  payload,
  callBack,
});

export const resetPasswordAction = (payload: any, callBack?: any) => ({
  type: EAuthType.RESET_PASSWORD,
  payload,
  callBack,
});

export const forgotPasswordAction = (payload: any, callBack?: any) => ({
  type: EAuthType.FORGOT_PASSWORD,
  payload,
  callBack,
});
