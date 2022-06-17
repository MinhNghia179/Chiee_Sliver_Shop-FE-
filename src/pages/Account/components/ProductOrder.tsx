import { Link }                     from "react-router-dom";

import { NO_IMAGE, ROUTER_NAME }    from "config/constants";
import { OrderDetailModel }         from "models/order/OrderDetailModel";
import { formatMoney, slug }        from "utils";

interface IProps{
  data:OrderDetailModel
}

const ProductOrder = ({data}:IProps) => {
  const properties = JSON.parse(data.properties || "{}");

  return (
    <div className="order_item_product">
      <img src={data.image || NO_IMAGE}/>
      <div className="product_info">
        <Link className="product_info_name" to={`${ROUTER_NAME.PRODUCT}/${slug(data.product_name)}-${data.product_id}`}>{data.product_name}</Link>
        <div className="product_info_type">Số lượng: {data.product_quantity} | Màu sắc: {properties.color_name} | Kích thước: {properties.size.size_name}</div>
        <div className="product_info_price">
          {formatMoney(data.product_price || 0)}
        </div>
      </div>
    </div>
  )
}

export default ProductOrder
