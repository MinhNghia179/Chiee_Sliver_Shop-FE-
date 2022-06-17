import { Button, TextField }              from "@mui/material";
import { useFormik }                      from "formik";

import { formSchemaContact }              from "./FormSchemaContact";
import { DataContactDefault }             from "../DataDefault/DataContactDefault";
import { sendContactAPI }                 from "services/contactApi";
import { toastError, toastSuccess }       from "utils/message";
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "config/constants";

const FormContact = () => {
  const initialValues = {
    ...DataContactDefault
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchemaContact,
    onSubmit: (values) => handleSubmit(),
  });

  const setValueFormik = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleSubmit = async () => {
    const payload = {
      ...formik.values
    };
    
    try{
      const res:any = await sendContactAPI(payload);
      if(res.status){
        toastSuccess(MESSAGE_SUCCESS.SEND_CONTACT);
      }else{
        toastError(MESSAGE_ERROR.SEND_CONTACT);
      }
    }catch(error){
      toastError(MESSAGE_ERROR.SEND_CONTACT);
    }

    formik.resetForm({
      values: { ...DataContactDefault},
    })
  };

  return (
    <>
      <div>
        <TextField
          id="fullName"
          label="Họ tên"
          variant="outlined"
          required
          className="w-100 mb-3"
          value={formik.values.name}
          onChange={(event) => setValueFormik("name", event.target.value)}
          helperText={formik.touched?.name && formik.errors?.name}
          error={formik.errors?.name && formik.touched?.name ? true : false}
        />
      </div>
      <div>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          required
          className="w-100 mb-3"
          value={formik.values.email}
          onChange={(event) => setValueFormik("email", event.target.value)}
          helperText={formik.touched?.email && formik.errors?.email}
          error={formik.errors?.email && formik.touched?.email ? true : false}
        />
      </div>
      <div>
        <TextField
          id="subject"
          label="Tiêu đề"
          variant="outlined"
          required
          className="w-100 mb-3"
          value={formik.values.subject}
          onChange={(event) => setValueFormik("subject", event.target.value)}
          helperText={formik.touched?.subject && formik.errors?.subject}
          error={formik.errors?.subject && formik.touched?.subject ? true : false}
        />
      </div>
      <div>
        <TextField
          id="message"
          label="Lời nhắn"
          variant="outlined"
          required
          className="w-100 mb-3"
          multiline
          minRows={5}
          value={formik.values.message}
          onChange={(event) => setValueFormik("message", event.target.value)}
          helperText={formik.touched?.message && formik.errors?.message}
          error={formik.errors?.message && formik.touched?.message ? true : false}
        />
      </div>
      <Button variant="contained" className="bg_color_main" onClick={formik.submitForm}>Gửi liên hệ</Button>
    </>
  );
};

export default FormContact;
