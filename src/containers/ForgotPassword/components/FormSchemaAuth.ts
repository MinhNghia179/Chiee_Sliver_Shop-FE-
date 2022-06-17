import * as Yup from "yup";

export const formSchemaForgotPassword = Yup.object().shape({
  email: Yup.string()
    .email("Email sai định dạng")
    .min(5, "Email tối thiểu lớn hơn 5 ký tự")
    .required("Email không được để trống"),
});
