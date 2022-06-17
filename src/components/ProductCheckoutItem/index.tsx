import { Tooltip } from "@mui/material";
import { NO_IMAGE, ROUTER_NAME } from "config/constants";
import { CartModel } from "models/CartModel";
import { Link } from "react-router-dom";
import { formatMoney, formatShortDescription, slug } from "utils";
import "./product-checkout-item.style.scss";

const img =
  "https://bizweb.dktcdn.net/thumb/large/100/422/614/products/319b285c94e0a2480c9c53f5f8ca9e.jpg?v=1637316269000";

interface IProps {
  data: CartModel;
}
const ProductCheckoutItem = ({ data }: IProps) => {
  const product = data.product;
  const images = JSON.parse(product.list_image || "[]");
  const properties = data.properties;

  return (
    <div className="checkout_products_item d-flex">
      <img src={!images.length ? NO_IMAGE : images[0].url} />
      <div className="checkout_products_item_info">
        <Tooltip title={product.name}>
          <Link to={`${ROUTER_NAME.PRODUCT}/${slug(product.name)}-${product.id}`}>{formatShortDescription(product.name,45)}</Link>
        </Tooltip>
        
        <div>
          <span className="text_color_main">
            {product?.promotion_price ? (
              <>
                {formatMoney(product.promotion_price)}
                <span className="price_discount">{formatMoney(product.price || 0)}</span>
              </>
            ) : (
              <>{formatMoney(product?.price || 0)}</>
            )}
          </span>{" "}
          | <span>x{data.amount}</span>
        </div>
        <div className="text-secondary">
          Color: {properties.color_name} - Size: {properties.size.size_name}
        </div>
      </div>
    </div>
  );
};

export default ProductCheckoutItem;
