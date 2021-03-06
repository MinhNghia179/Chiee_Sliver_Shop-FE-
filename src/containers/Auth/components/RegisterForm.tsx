import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { ROLES, TABS_MODAL_AUTH } from 'config/constants';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAction } from 'setup/redux/auth/AuthActions';
import usePopup from 'setup/redux/usePopup';
import { toastSuccess } from 'utils/message';
import { formSchemaRegister } from './FormSchemaAuth';
interface IProps {
  onClickLogin: () => void;
}

const RegisterForm = ({ onClickLogin }: IProps) => {
  const { openAuth } = usePopup();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    role_code: ROLES.USER.CODE,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchemaRegister,
    onSubmit: (values) => handleSubmit(),
  });

  const setValueFormik = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleSubmit = () => {
    const payload = {
      ...formik.values,
    };
    dispatch(
      registerAction(payload, (res: any) => {
        toastSuccess(res.message);
        if (res.status) {
          openAuth(TABS_MODAL_AUTH.LOGIN);
          onClickLogin();
        }
      })
    );
  };

  const handleShowPassword = () => setShowPassword((prev: boolean) => !prev);

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            required
            error={formik.errors?.email && formik.touched?.email ? true : false}
            className="mb-3 w-100"
            id="email"
            label="Email"
            value={formik.values.email}
            onChange={(event) => setValueFormik('email', event.target.value)}
            helperText={formik.touched?.email && formik.errors?.email}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className="w-100" variant="outlined">
            <InputLabel
              required
              error={
                formik.errors?.password && formik.touched?.password
                  ? true
                  : false
              }
              htmlFor="outlined-adornment-password"
            >
              M???t kh???u
            </InputLabel>
            <OutlinedInput
              required
              error={
                formik.errors?.password && formik.touched?.password
                  ? true
                  : false
              }
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={(event) =>
                setValueFormik('password', event.target.value)
              }
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
              label="M???t kh???u"
            />
            {formik.errors?.password && formik.touched?.password && (
              <FormHelperText error id="accountId-error">
                {formik.errors?.password}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            error={
              formik.errors?.last_name && formik.touched?.last_name
                ? true
                : false
            }
            className="w-49"
            id="last_name"
            label="H???"
            value={formik.values.last_name}
            onChange={(event) =>
              setValueFormik('last_name', event.target.value)
            }
            helperText={formik.touched?.last_name && formik.errors?.last_name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            error={
              formik.errors?.first_name && formik.touched?.first_name
                ? true
                : false
            }
            className="w-49"
            id="first_name"
            label="T??n"
            value={formik.values.first_name}
            onChange={(event) =>
              setValueFormik('first_name', event.target.value)
            }
            helperText={formik.touched?.first_name && formik.errors?.first_name}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            className="mb-3 w-100"
            id="address"
            label="?????a ch???"
            value={formik.values.address}
            onChange={(event) => setValueFormik('address', event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            error={
              formik.errors?.phone_number && formik.touched?.phone_number
                ? true
                : false
            }
            helperText={
              formik.touched?.phone_number && formik.errors?.phone_number
            }
            className="mb-3 w-100"
            id="address"
            label="S??? ??i???n tho???i"
            value={formik.values.phone_number}
            onChange={(event) =>
              setValueFormik('phone_number', event.target.value)
            }
          />
        </Grid>
      </Grid>
      <div className="d-flex justify-content-center my-4">
        <Button variant="contained" onClick={() => formik.submitForm()}>
          ????ng k??
        </Button>{' '}
        &nbsp;
        <Button variant="outlined" onClick={onClickLogin}>
          ????ng nh???p
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
