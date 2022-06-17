import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { MESSAGE_SUCCESS } from 'config/constants';
import { loginAction } from 'setup/redux/auth/AuthActions';
import usePopup from 'setup/redux/usePopup';
import { toastSuccess } from 'utils/message';
import { formSchemaLogin } from './FormSchemaAuth';

interface IProps {
  onClickRegister: () => void;
}

const LoginForm = ({ onClickRegister }: IProps) => {
  const dispatch = useDispatch();
  const { closeAuth, openForgotPassword } = usePopup();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialValues = {
    email: 'ChieeSliver@gmail.com',
    password: '00000000',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchemaLogin,
    onSubmit: (values) => handleSubmit(),
  });

  const setValueFormik = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleSubmit = () => {
    const payload = {
      email: formik.values.email,
      password: formik.values.password,
    };
    dispatch(
      loginAction(payload, (res: any) => {
        toastSuccess(MESSAGE_SUCCESS.LOGIN);
        closeAuth();
      })
    );
  };

  const handleShowPassword = () => setShowPassword((prev: boolean) => !prev);

  const goForgotPassword = () => {
    closeAuth();
    openForgotPassword();
  };

  return (
    <form>
      <TextField
        error={formik.errors?.email && formik.touched?.email ? true : false}
        className="mb-3 w-100"
        id="email"
        label="Email"
        value={formik.values.email}
        onChange={(event) => setValueFormik('email', event.target.value)}
        helperText={formik.touched?.email && formik.errors?.email}
      />
      <FormControl className="w-100" variant="outlined">
        <InputLabel
          error={
            formik.errors?.password && formik.touched?.password ? true : false
          }
          htmlFor="outlined-adornment-password"
        >
          Mật khẩu
        </InputLabel>
        <OutlinedInput
          error={
            formik.errors?.password && formik.touched?.password ? true : false
          }
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={(event) => setValueFormik('password', event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={handleShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Mật khẩu"
        />
        {formik.errors?.password && formik.touched?.password && (
          <FormHelperText error id="accountId-error">
            {formik.errors?.password}
          </FormHelperText>
        )}
      </FormControl>

      <div className="d-flex justify-content-end mt-3">
        <Button className="text-secondary" onClick={goForgotPassword}>
          Quên mật khẩu ?
        </Button>
      </div>
      <div className="d-flex justify-content-center my-4">
        <Button variant="contained" onClick={() => formik.submitForm()}>
          Đăng nhập
        </Button>
        &nbsp;
        <Button variant="outlined" onClick={onClickRegister}>
          Đăng ý
        </Button>
      </div>

      {/* <Divider>
        <span className="text-secondary">Đăng nhập bằng</span>
      </Divider>
      <div className="d-flex justify-content-around mt-4">
        <ButtonGoogleLogin />
        <Divider orientation="vertical" flexItem>
          Hoặc
        </Divider>
        <ButtonFacebookLogin />
      </div> */}
    </form>
  );
};

export default LoginForm;
