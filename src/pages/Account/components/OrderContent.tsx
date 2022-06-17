import { useEffect, useMemo, useState }  from "react";
import { useDispatch }          from "react-redux";

import { useSelector }          from "setup";
import { getListOrderAction }   from "setup/redux/order/OrderAction";
import OrderItem                from "./OrderItem";
import ImgNoOrder               from "assets/images/empty-review.png";
import { OrderModel }           from "models/order/OrderModel";
import { OrderStatusModel } from "models/order/OrderStatusModel";

interface IProps {
  valueTab:number;
  orderStatus:string;
}

const OrderContent = ({valueTab, orderStatus} : IProps) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user_info);
  const orders = useSelector((state) => state.order.ListOrder);
  const [data,setData] = useState<OrderModel[]>([]);

  useEffect(() => {
    dispatch(getListOrderAction({ user_id: userInfo?.id || 0 }));
  }, []);


  useEffect(() => {
    dataFilter();
  }, [orders, orderStatus])

  const dataFilter = () => {
    const result = orders.results.filter(filterStatus);
    setData(result);
  }

  const filterStatus = (item:OrderModel) => {
    const status = item.order_status.map(element => element.status_code);
    if(valueTab === 0) return true;
    if(status.length === 2 && valueTab === 5 && status.includes(orderStatus)) return true;
    if(status.includes(orderStatus) && valueTab === status.length) return true;
    return false;
  }

  return (
    <div className="order_List">
      {data.map((item,index) => (
        <OrderItem key={index} data={item}/>
      ))}
      {!data.length && <NoOrder />}
    </div>
  );
};

const NoOrder = () => {
  return (
    <div className="d-flex justify-content-center my-4">
      <div>
        <div className="d-flex justify-content-center">
          <img src={ImgNoOrder} />
        </div>
        <div className="mt-3">
          <b>Chưa có đơn hàng</b>
        </div>
      </div>
    </div>
  );
};

export default OrderContent;
