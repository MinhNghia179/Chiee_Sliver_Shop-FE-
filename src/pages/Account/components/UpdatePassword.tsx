import { Button, Grid, TextField }  from "@mui/material";
import { useFormik }                from "formik";
import { useDispatch }              from "react-redux";

import { useSelector }              from "setup";
import { updatePasswordAction } from "setup/redux/auth/AuthActions";
import { formSchemaUpdatePassword } from "../FormSchema/FormSchemaAccount";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.auth.user_info);
  
  const initialValues = {
    user_id: userInfo?.id || 0,
    password: "",
    new_password:"",
    confirm_password:''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchemaUpdatePassword,
    onSubmit: (values) => handleSubmit(),
  });

  const setValueFormik = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleSubmit = () => {
    const payload = {
      id:formik.values.user_id,
      password:formik.values.password,
      new_password:formik.values.new_password
    };
    dispatch(updatePasswordAction(payload));
  };

  return (
    <>
      <h4 className="page_title">Cập nhật mật khẩu</h4>

      <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
          <TextField
            required
            id="old_password"
            label="Mật khẩu cũ"
            type="password"
            fullWidth
            value={formik.values.password}
            onChange={event => setValueFormik("password",event.target.value)}
            error={formik.errors?.password && formik.touched?.password ? true : false}
            helperText={formik.touched?.password && formik.errors?.password}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="new_password"
            label="Mật khẩu mới"
            type="password"
            fullWidth
            value={formik.values.new_password}
            onChange={event => setValueFormik("new_password",event.target.value)}
            error={formik.errors?.new_password && formik.touched?.new_password ? true : false}
            helperText={formik.touched?.new_password && formik.errors?.new_password}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="re_enter_password"
            label="Nhập lại mật khẩu"
            type="password"
            fullWidth
            value={formik.values.confirm_password}
            onChange={event => setValueFormik("confirm_password",event.target.value)}
            error={formik.errors?.confirm_password && formik.touched?.confirm_password ? true : false}
            helperText={formik.touched?.confirm_password && formik.errors?.confirm_password}
          />
        </Grid>
      </Grid>
      <div className="mt-4">
        <Button variant="outlined" className="btn_save_info" onClick={formik.submitForm}>
          Lưu
        </Button>
      </div>
    </>
  );
};

export default UpdatePassword;
