import * as Yup from 'yup';

const phoneRegExp = /(0+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

export const formSchemaLogin = Yup.object().shape({
  email: Yup.string()
    .email('Email sai định dạng')
    .min(5, 'Email tối thiểu lớn hơn 5 ký tự')
    .required('Email không được để trống'),
  password: Yup.string()
    .required('Mật khẩu không được để trống')
    .trim('Không được có khoảng trắng')
    .strict()
    .min(6, 'Mật khẩu ít nhất 6 ký tự'),
});

export const formSchemaRegister = Yup.object().shape({
  email: Yup.string()
    .email('Email sai định dạng')
    .min(5, 'Email tối thiểu lớn hơn 5 ký tự')
    .required('Email không được để trống'),
  password: Yup.string()
    .required('Mật khẩu không được để trống')
    .trim('Không được có khoảng trắng')
    .strict()
    .min(6, 'Mật khẩu ít nhất 6 ký tự'),
  phone_number: Yup.string()
    .trim('Không được có khoảng trắng')
    .max(12, 'Số điện thoại chưa đúng định dạng !')
    .matches(phoneRegExp, 'Số điện thoại chưa đúng định dạng!'),
  last_name: Yup.string().required('Họ không được để trống'),
  first_name: Yup.string().required('Tên không được để trống'),
  address: Yup.string(),
});
