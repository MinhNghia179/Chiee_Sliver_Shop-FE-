import { MESSAGE_VALIDATE } from "config/message";
import * as Yup from "yup";

export const formSchemaContact = Yup.object().shape({
  name      : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY),
  email     : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY).email(MESSAGE_VALIDATE.ERROR_EMAIL),
  subject   : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY),
  message   : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY)
});
