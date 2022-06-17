import { Button, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetPasswordAction } from "setup/redux/auth/AuthActions";
import { formSchemaUpdatePassword } from "./FormSchemaAuth";
import InputPassword from "components/InputPassword";
import { ROUTER_NAME } from "config/constants";

interface IProps {
  userId: number;
}

const FormResetPassword = ({ userId }: IProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessPassword, setProcessPassword] = useState<boolean>(false);

  const initialValues = {
    password: "",
    confirm_password: "",
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
      id: userId,
      password: formik.values.password,
    };
    setProcessPassword(true);
    dispatch(resetPasswordAction(payload, ()=> {
      setProcessPassword(false);
      navigate(ROUTER_NAME.HOME);
    }));
  };

  return (
    <div className="form_reset_password">
      <form>
        <h1 className="page_title text-center">Đặt lại mật khẩu mới</h1>
        <div className="my-3">
          <InputPassword
            id="password"
            label="Mật khẩu mới"
            value={formik.values.password}
            errors={formik.errors.password}
            touched={formik.touched.password}
            changeValue={(value) => setValueFormik("password", value)}
          />
        </div>
        <div className="my-3">
          <InputPassword
            id="confirm-password"
            label="Nhập lại mật khẩu"
            value={formik.values.confirm_password}
            errors={formik.errors.confirm_password}
            touched={formik.touched.confirm_password}
            changeValue={(value) => setValueFormik("confirm_password", value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button
            className="btn_submit_form"
            variant="contained"
            onClick={formik.submitForm}
            disabled={isProcessPassword}
          >
            {isProcessPassword ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Gửi"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormResetPassword;
