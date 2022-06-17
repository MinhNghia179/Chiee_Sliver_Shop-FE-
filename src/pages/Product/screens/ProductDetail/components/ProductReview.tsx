import { Avatar, Rating }               from "@mui/material";

import EmptyReview                      from "assets/images/empty-review.png";
import { ProductReviewModel }           from "models/product/ProductReviewModel";
import { useSelector }                  from "setup";
import { convertDateTime, getFullName } from "utils";

const ProductReview = () => {
  const productDetail = useSelector((state) => state.product.ProductDetail);

  return (
    <div className="p-3">
      {productDetail && !productDetail.product_reviews.length && <Empty />}
      {productDetail &&
        productDetail.product_reviews.map((item: ProductReviewModel) => (
          <ItemReview key={item.id} review={item} />
        ))}
    </div>
  );
};

const Empty = () => (
  <div className="d-flex my-4 justify-content-center align-items-center flex-column">
    <img src={EmptyReview} style={{ width: "fit-content" }} />
    <div className="text-center mt-3">Chưa có đánh giá</div>
  </div>
);

interface IPropsItemReview {
  review: ProductReviewModel;
}

const ItemReview = ({ review }: IPropsItemReview) => {
  return (
    <div className="d-flex">
      <Avatar alt="Remy Sharp" src={review.avatar} />
      <div className="flex-grow-1 m_l_12">
        <div className="d-flex justify-content-between">
          <b>{getFullName(review.first_name, review.last_name)}</b>
          <div className="text-secondary">
            {convertDateTime(review.created_at)}
          </div>
        </div>
        <div><Rating name="read-only" value={review.rate} readOnly /></div>
        <div>
          {review.comment}
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
