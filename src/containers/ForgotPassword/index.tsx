import "./forgot-password.style.scss";
import { Box, Button, TextField } from "@mui/material";
import { Modal } from "reactstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { formSchemaForgotPassword } from "./components/FormSchemaAuth";
import { forgotPasswordAction } from "setup/redux/auth/AuthActions";

interface IProps {
  isOpen: boolean;
  onHide: () => void;
}

const ForgotPasswordPopup = (props: IProps) => {
  const { isOpen = false, onHide } = props;
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchemaForgotPassword,
    onSubmit: (values) => handleSubmit(),
  });

  const setValueFormik = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleSubmit = () => {
    const payload = {
      email: formik.values.email,
    };
    dispatch(forgotPasswordAction(payload, ()=> {
      onHide();
    }))
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={onHide}
      centered
      contentClassName="forgot_password"
    >
      <Box sx={{ width: "100%" }} className="content">
        <h4 className="page_title text-center text_uppercase">
          Nhập email của bạn để đặt lại mật khẩu
        </h4>
        <form>
          <TextField
            error={formik.errors?.email && formik.touched?.email ? true : false}
            className="mb-3 w-100"
            id="email"
            label="Email"
            value={formik.values.email}
            onChange={(event) => setValueFormik("email", event.target.value)}
            helperText={formik.touched?.email && formik.errors?.email}
          />
          <Button
            className="btn_send_email px-4"
            variant="contained"
            onClick={() => formik.submitForm()}
          >
            Gửi
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ForgotPasswordPopup;
