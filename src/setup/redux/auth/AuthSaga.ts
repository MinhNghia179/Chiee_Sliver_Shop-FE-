import { MESSAGE_ERROR, MESSAGE_SUCCESS } from 'config/message';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getAccountByIdAPI,
  updatePasswordAPI,
  updateUserInfoAPI,
} from 'services/accountApi';
import {
  checkTokenResetPasswordAPI,
  forgotPasswordAPI,
  loginAPI,
  registerAPI,
  resetPassWordAPI,
} from 'services/authApi';
import { setLoadingAction } from 'setup/redux/CommonReducer';
import { toastError, toastSuccess } from 'utils/message';
import { getListFavoriteAction } from '../favorite/FavoriteAction';
import {
  EAuthType,
  loginSuccessAction,
  setAccountDetailAction,
} from './AuthActions';

function* login({ payload, callBack }: any): any {
  try {
    yield put(setLoadingAction(true));
    const res: any = yield call(loginAPI, payload.email, payload.password);
    if (res.user) {
      localStorage.setItem('accessToken', res.access_token || '');
      yield put(loginSuccessAction(res));
      yield put(getListFavoriteAction({ user_id: res?.user?.id || 0 }));
      callBack();
    } else {
      toastError(MESSAGE_ERROR.LOGIN_ERROR);
    }
    yield put(setLoadingAction(false));
  } catch (error: any) {
    yield put(setLoadingAction(false));
  }
}

function* register({ payload, callBack }: any): any {
  try {
    const res: any = yield call(registerAPI, payload);
    callBack(res);
  } catch (error: any) {
    callBack(error.message);
  }
}

function* updateUserInfo({ payload, callBack }: any): any {
  try {
    const res: any = yield call(updateUserInfoAPI, payload);
    if (res.status) {
      toastSuccess(MESSAGE_SUCCESS.UPDATE_USER_INFO);
      yield put(setAccountDetailAction(payload));
    } else {
      toastError(MESSAGE_ERROR.UPDATE_USER_INFO);
    }
  } catch (error: any) {}
}

function* getAccountDetail({ payload, callBack }: any): any {
  try {
    const res: any = yield call(getAccountByIdAPI, payload);
  } catch (error: any) {}
}

function* updatePassword({ payload, callBack }: any): any {
  try {
    const res: any = yield call(updatePasswordAPI, payload);
    if (res.status) {
      toastSuccess(MESSAGE_SUCCESS.UPDATE_PASSWORD);
    } else {
      toastError(res.message);
    }
    if (callBack) callBack(res);
  } catch (error: any) {
    toastError(MESSAGE_ERROR.UPDATE_PASSWORD);
  }
}

function* checkTokenResetPassword({ payload, callBack }: any): any {
  try {
    const res: any = yield call(checkTokenResetPasswordAPI, payload);
    if (callBack) callBack(res);
  } catch (error: any) {}
}

function* resetPassword({ payload, callBack }: any): any {
  try {
    const res: any = yield call(resetPassWordAPI, payload);
    if (res.status) {
      toastSuccess(MESSAGE_SUCCESS.UPDATE_PASSWORD);
    } else {
      toastError(MESSAGE_ERROR.UPDATE_PASSWORD);
    }
    if (callBack) callBack();
  } catch (error: any) {
    toastError(MESSAGE_ERROR.UPDATE_PASSWORD);
  }
}

function* forgotPassword({ payload, callBack }: any): any {
  try {
    const res: any = yield call(forgotPasswordAPI, payload);
    if (res.status) {
      toastSuccess(MESSAGE_SUCCESS.SEND_EMAIL_FORGOT_PASS);
    } else {
      toastError(MESSAGE_ERROR.SEND_EMAIL_FORGOT_PASS);
    }
    if (callBack) callBack();
  } catch (error: any) {
    toastError(MESSAGE_ERROR.SEND_EMAIL_FORGOT_PASS);
  }
}

export default function* authSaga() {
  yield takeLatest(EAuthType.LOGIN, login);
  yield takeLatest(EAuthType.REGISTER, register);
  yield takeLatest(EAuthType.UPDATE_USER_INFO, updateUserInfo);
  yield takeLatest(EAuthType.GET_ACCOUNT_DETAIL, getAccountDetail);
  yield takeLatest(EAuthType.UPDATE_PASSWORD, updatePassword);
  yield takeLatest(
    EAuthType.CHECK_TOKEN_RESET_PASSWORD,
    checkTokenResetPassword
  );
  yield takeLatest(EAuthType.RESET_PASSWORD, resetPassword);
  yield takeLatest(EAuthType.FORGOT_PASSWORD, forgotPassword);
}
