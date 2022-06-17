import { Link }             from "react-router-dom";

import { NO_IMAGE, ROUTER_NAME }         from "config/constants";
import { OrderDetailModel } from "models/order/OrderDetailModel";
import ReviewForm           from "./ReviewForm";
import { slug } from "utils";

interface IProps {
  orderDetailItem: OrderDetailModel;
}

const ReviewProduct = ({ orderDetailItem }: IProps) => {
  return (
    <>
      <div className="d-flex">
        <img src={orderDetailItem.image || NO_IMAGE} className="img_product" />
        <div className="m_l_10">
          <Link className="product_name" to={`${ROUTER_NAME.PRODUCT}/${slug(orderDetailItem.product_name)}-${orderDetailItem.product_id}`}>{orderDetailItem.product_name}</Link>
        </div>
      </div>
      <div>
        <ReviewForm orderDetailItem={orderDetailItem}/>
      </div>
      <hr />
    </>
  );
};

export default ReviewProduct;
