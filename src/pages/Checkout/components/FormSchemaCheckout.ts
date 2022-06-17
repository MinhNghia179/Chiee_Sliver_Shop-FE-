import { REGEX_PHONE_NUMBER } from "config/constants";
import { MESSAGE_VALIDATE } from "config/message";
import * as Yup from "yup";

export const formSchemaCheckout = Yup.object().shape({
  first_name  : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY),
  last_name   : Yup.string().required(MESSAGE_VALIDATE.INPUT_NOT_EMPTY),
  phone_number: Yup.string().matches(REGEX_PHONE_NUMBER,MESSAGE_VALIDATE.ERROR_PHONE_NUMBER)
});