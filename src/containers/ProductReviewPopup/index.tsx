import "./product-review-popup.style.scss";
import { Box }              from "@mui/material";
import { Modal }            from "reactstrap";

import ReviewProduct        from "./components/ReviewProduct";
import usePopup             from "setup/redux/usePopup";
import { OrderDetailModel } from "models/order/OrderDetailModel";

interface IProps {
  isOpen: boolean;
  onHide: () => void;
}

const ProductReviewPopup = (props: IProps) => {
  const { isOpen = false, onHide } = props;
  const { dataProductReview } = usePopup()

  return (
    <Modal
      isOpen={isOpen}
      toggle={onHide}
      centered
      contentClassName="modal_product_review my-3"
    >
      <Box sx={{ width: "100%" }} className="content p-3">
        <h5 className="page_title">Đánh giá sản phẩm</h5>
        {
          dataProductReview.map((item:OrderDetailModel,index:number) => <ReviewProduct key={index} orderDetailItem={item}/>)
        }
      </Box>
    </Modal>
  );
};

export default ProductReviewPopup;
