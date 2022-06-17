import { Avatar, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { AVATAR_DEFAULT, ROLES } from 'config/constants';
import { uploadFileAPI } from 'services/uploadFileApi';
import { useSelector } from 'setup';
import { updateUserInfoAction } from 'setup/redux/auth/AuthActions';
import { getBase64Image } from 'utils';
import { formSchemaUpdateAccount } from '../FormSchema/FormSchemaAccount';

const AccountInfo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user_info);

  const initialValues = {
    id: userInfo?.id || 0,
    first_name: userInfo?.first_name || '',
    last_name: userInfo?.last_name || '',
    address: userInfo?.address,
    phone_number: userInfo?.phone_number,
    avatar: userInfo?.avatar,
    role_code: ROLES.USER.CODE,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchemaUpdateAccount,
    onSubmit: (values) => handleSubmit(),
  });

  const setValueFormik = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleSubmit = () => {
    dispatch(updateUserInfoAction(formik.values));
  };

  const handleChangeInput = (event: any) => {
    let name = event.target.id.toString();
    setValueFormik(`${name}`, event.target.value);
  };

  const handleChangeAvatar = async (event: any) => {
    try {
      const image: any = await getBase64Image(event);
      const payload = {
        base64: image.base64,
        file_name: image.file_name,
      };
      uploadFileAPI(payload).then((data) => {
        setValueFormik('avatar', data.url);
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <h4 className="page_title">Thông tin tài khoản</h4>

      <Grid container spacing={2}>
        <Grid container item spacing={2} xs={12} md={9}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="last_name"
              label="Họ"
              fullWidth
              value={formik.values.last_name}
              onChange={handleChangeInput}
              error={
                formik.errors?.last_name && formik.touched?.last_name
                  ? true
                  : false
              }
              helperText={formik.touched?.last_name && formik.errors?.last_name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="first_name"
              label="Tên"
              fullWidth
              value={formik.values.first_name}
              onChange={handleChangeInput}
              error={
                formik.errors?.first_name && formik.touched?.first_name
                  ? true
                  : false
              }
              helperText={
                formik.touched?.first_name && formik.errors?.first_name
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="email"
              label="Email"
              fullWidth
              defaultValue={userInfo?.email || ''}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="phone_number"
              label="Số điện thoại"
              fullWidth
              value={formik.values.phone_number}
              onChange={handleChangeInput}
              error={
                formik.errors?.phone_number && formik.touched?.phone_number
                  ? true
                  : false
              }
              helperText={
                formik.touched?.phone_number && formik.errors?.phone_number
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="address"
              label="Địa chỉ"
              fullWidth
              value={formik.values.address}
              onChange={handleChangeInput}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Avatar
              alt="Remy Sharp"
              src={formik.values.avatar || AVATAR_DEFAULT}
              sx={{ width: 85, height: 85, objectFit: 'cover' }}
            />
            <input
              hidden
              type="file"
              id="upload_avatar"
              accept="image/*"
              onChange={handleChangeAvatar}
            />
            <label htmlFor="upload_avatar" className="btn_choose_file">
              Chọn ảnh
            </label>
          </div>
        </Grid>
      </Grid>
      <div className="mt-4">
        <Button
          variant="outlined"
          className="btn_save_info"
          onClick={formik.submitForm}
        >
          Lưu
        </Button>
      </div>
    </>
  );
};

export default AccountInfo;
