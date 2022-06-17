import '../styles/order-detail.style.scss';
import ArrowBackOutlinedIcon          from "@mui/icons-material/ArrowBackOutlined";
import { Grid, IconButton }           from "@mui/material";
import { useNavigate, useParams }     from "react-router-dom";
import { useEffect, useState }        from "react";
import { useDispatch }                from "react-redux";

import { OrderDetailModel }           from "models/order/OrderDetailModel";
import { ROUTER_NAME }                from "config/constants";
import OrderStatus                    from "./OrderStatus";
import { getListOrderDetailAction }   from "setup/redux/order/OrderAction";
import ProductOrder                   from "./ProductOrder";
import { OrderModel }                 from "models/order/OrderModel";
import { 
  convertDateTime, 
  formatMoney, 
  getStatusName 
}                                     from "utils";

const OrderDetail = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataOrder,setDataOrder] = useState<OrderModel|null>(null);

  const handleGoBack = () => {
    navigate(`${ROUTER_NAME.ACCOUNT}/${ROUTER_NAME.ACCOUNT_ORDER}`);
  };

  useEffect(() => {
    if (order_id) {
      dispatch(
        getListOrderDetailAction(order_id, (result: OrderModel) => {
          setDataOrder(result);
        })
      );
    }
  }, [order_id]);

  return (
    <div className='order_detail'>
      <div className="d-flex justify-content-between">
        <IconButton onClick={handleGoBack}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <div>
          <h5 className="text_color_main">Chi tiết đơn hàng</h5>
        </div>
      </div>
      <hr />
      <OrderStatus dataStatus={dataOrder?.order_status || []}/>
      <Grid container spacing={2} className="mt-3">
        <Grid item xs={12} md={6}>
          <h5>Địa chỉ nhận hàng</h5>
          <div>
            <b>{dataOrder?.recipient_name}</b>
          </div>
          <div>{dataOrder?.recipient_phone}</div>
          <div>{dataOrder?.recipient_address}</div>
          <div>
            <b>
              Phí vận chuyển :
              <span className="text_color_main font-weight-bold">{formatMoney(15000)}</span>
            </b>
          </div>
          <div>
            <b>
              Tổng thanh toán :<span className="text_color_main">{formatMoney(dataOrder?.total_payment||0)}</span>
            </b>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <h5>Trạn thái đơn hàng</h5>
          <ul className="list_order_status">
            {
              (dataOrder?.order_status||[]).map((item,index)=> <li key={index}>{convertDateTime(item.created_at)} - {getStatusName(item.status_code)}</li>)
            }
          </ul>
        </Grid>
      </Grid>
      <hr />
      <div className="mt-3">
        <h5>Chi tiết sản phẩm</h5>
        {(dataOrder?.order_details || []).map((item, index) => (
          <ProductOrder key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
