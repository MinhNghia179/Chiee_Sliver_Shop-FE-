import { Button, Rating, TextField }  from "@mui/material";
import { useFormik }                  from "formik";
import { useDispatch }                from "react-redux";

import { isEmptyObject }              from "utils";
import { toastError }                 from "utils/message";
import { formSchemaProductReview }    from "./FormSchemaProductReview";
import { MESSAGE_ERROR }              from "config/constants";
import { useSelector }                from "setup";
import usePopup                       from "setup/redux/usePopup";
import { createReviewAction }         from "setup/redux/productReview/ProductReviewAction";
import { OrderDetailModel }           from "models/order/OrderDetailModel";

interface IProps{
  orderDetailItem:OrderDetailModel;
}

const ReviewForm = ({orderDetailItem}:IProps) => {
  const { openAuth, closeProductReview } = usePopup();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.auth.user_info);

  const initialValues = {
    rate:0,
    comment:''
  };

  const formik = useFormik({
    initialValues,
    validationSchema:formSchemaProductReview,
    onSubmit: (values) => handleSubmit(values)
  });

  const setValueFormik = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleSubmit = (values:any) => {
    const payload = {
      user_id           : userInfo?.id || 0,
      product_id        : orderDetailItem.product_id,
      order_detail_id   : orderDetailItem.id,
      rate              : formik.values.rate,
      comment           : formik.values.comment
    }
    dispatch(createReviewAction(payload, () => {
      closeProductReview();
    }))
  };

  const handleSendReview = () => {
    if(!isEmptyObject(formik.errors)){
      toastError(MESSAGE_ERROR.SEND_PRODUCT_REVIEW);
      return;
    }
    if(userInfo){
      formik.submitForm();
    }else{
      openAuth();
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center my-3">
        <Rating
          name="hover-feedback"
          value={formik.values.rate}
          onChange={(event, newValue) => {
            setValueFormik("rate",newValue)
          }}
          size="large"
        />
      </div>
      <TextField
        id="review_content"
        label="Nội dung đánh giá"
        variant="outlined"
        multiline
        rows={3}
        fullWidth
        value={formik.values.comment}
        onChange={(event) => setValueFormik("comment",event.target.value)}
      />
      <div className="mt-3 d-flex justify-content-end">
        <Button
          variant="contained"
          className="btn_main"
          onClick={handleSendReview}
        >
          Gửi
        </Button>
      </div>
    </>
  );
};

export default ReviewForm;
