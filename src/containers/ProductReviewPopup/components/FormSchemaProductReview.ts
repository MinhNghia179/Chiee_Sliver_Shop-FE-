import { MESSAGE_VALIDATE } from "config/message";
import * as Yup from "yup";

export const formSchemaProductReview = Yup.object().shape({
  rate: Yup.number()
    .min(1, "")
    .max(5, "")
    .required(""),
  comment: Yup.string().required("")
});
