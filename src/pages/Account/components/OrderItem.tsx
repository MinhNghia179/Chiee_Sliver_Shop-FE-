import { Button, Divider, Tooltip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import ProductOrder from "./ProductOrder";
import { ORDER_STATUS, ROUTER_NAME } from "config/constants";
import { OrderModel } from "models/order/OrderModel";
import { formatMoney, convertDateTime, getStatusName } from "utils";
import { cancelOrderStatusAction, getListOrderAction } from "setup/redux/order/OrderAction";
import usePopup from "setup/redux/usePopup";
import { useSelector } from "setup";

interface IProps {
  data: OrderModel;
}

const OrderItem = ({ data }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user_info);
  const { openProductReview } = usePopup();

  const goToOrderDetail = () => {
    navigate(
      `${ROUTER_NAME.ACCOUNT}/${ROUTER_NAME.ACCOUNT_ORDER_DETAIL}/${data.id}`
    );
  };

  const getOrderStatus = useCallback(() => {
    let status = data.order_status[0];
    let statusName = getStatusName(status?.status_code || '');
    return `${convertDateTime(status?.created_at || '')} ${statusName}`;
  }, [data]);

  const handleCancelOrder = () => {
    const payload = {
      order_id:data.id,
      status_code:ORDER_STATUS.CANCEL.CODE,
      created_at:(new Date()).toString(),
    }
    dispatch(cancelOrderStatusAction(payload,()=>{
      dispatch(getListOrderAction({ user_id: userInfo?.id || 0 }));
    }))
  }

  return (
    <div className="order_item">
      <div className="mb-2 d-flex justify-content-end">
        <div className="status d-flex align-items-center pointer">
          <Tooltip title="Cập nhật lần cuối ngày 1/1/2022" placement="bottom">
            <FiberManualRecordIcon />
          </Tooltip>
          <span>{getOrderStatus()}</span>
        </div>
      </div>
      <Divider />
      {data.order_details.map((item, index) => (
        <ProductOrder key={index} data={item} />
      ))}
      <div className="d-flex justify-content-end my-2">
        <div className="total_price d-flex justify-content-end">
          <div>
            Tổng tiền: <span>{formatMoney(data.total_payment || 0)}</span>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end my-2">
        <div className="mt-2 btn_action">
          {
            data.order_status[0].status_code === ORDER_STATUS.SUCCESSFUL_DELIVERY.CODE && (
              <>
                <Button variant="contained" className="bg_color_main">
                  Mua lại
                </Button>
                &emsp;
                <Button
                  onClick={() => openProductReview(data.order_details)}
                  variant="outlined"
                  className="border_color_main text_color_main"
                >
                  Dánh giá sản phẩm
                </Button>
              </>
            )
          }
          {
            data.order_status[0].status_code === ORDER_STATUS.CANCEL.CODE && (
              <Button variant="contained" className="bg_color_main">
                Mua lại
              </Button>
            )
          }
          {
            data.order_status[0].status_code === ORDER_STATUS.WAIT_CONFIRM.CODE && (
              <Button variant="contained" className="bg_color_main" onClick={handleCancelOrder}>
                Hủy đơn
              </Button>
            )
          }
          &emsp;
          <Button
            variant="outlined"
            className="border_color_main text_color_main"
            onClick={goToOrderDetail}
          >
            Chi tiết đơn hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
