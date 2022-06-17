import { MESSAGE_VALIDATE } from "config/message";
import * as Yup from "yup";

export const formSchemaUpdatePassword = Yup.object().shape({
  password          : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY).trim(MESSAGE_VALIDATE.NO_SPACE).strict().min(6,MESSAGE_VALIDATE.MIN_6),
  confirm_password  : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY).oneOf([Yup.ref('password'),null],MESSAGE_VALIDATE.PASSWORD_DONT_MATCH),
});