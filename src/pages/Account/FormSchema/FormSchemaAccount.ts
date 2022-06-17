import * as Yup               from "yup";

import { REGEX_PHONE_NUMBER } from "config/constants";
import { MESSAGE_VALIDATE }   from "config/message";

export const formSchemaUpdateAccount = Yup.object().shape({
  first_name  : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY),
  last_name   : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY),
  phone_number: Yup.string().matches(REGEX_PHONE_NUMBER,MESSAGE_VALIDATE.ERROR_PHONE_NUMBER),
  address     : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY),
});

export const formSchemaUpdatePassword = Yup.object().shape({
  password          : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY).trim(MESSAGE_VALIDATE.NO_SPACE).strict().min(6,MESSAGE_VALIDATE.MIN_6),
  new_password      : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY).trim(MESSAGE_VALIDATE.NO_SPACE).strict().min(6,MESSAGE_VALIDATE.MIN_6),
  confirm_password  : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY).oneOf([Yup.ref('new_password'),null],MESSAGE_VALIDATE.PASSWORD_DONT_MATCH),
});