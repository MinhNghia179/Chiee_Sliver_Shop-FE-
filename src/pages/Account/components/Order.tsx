import { useState }     from "react";

import TabsComponent    from "components/TabsComponent";
import OrderContent     from "./OrderContent";
import { ORDER_STATUS } from "config/constants";

const tabsLabel:string[] = ["Tất cả","Chờ xác nhận","Chờ lấy hàng","Đang giao","Đã giao","Đã hủy"];

const Order = () => {
  const [valueTab, setValueTab] = useState<number>(0);
  const [orderStatus,setOrderStatus] = useState<string>('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
    let status = '';
    switch(newValue){
      case 1:
        status = ORDER_STATUS.WAIT_CONFIRM.CODE;
        break;
      case 2:
        status = ORDER_STATUS.CONFIRM.CODE;
        break;
      case 3:
        status = ORDER_STATUS.DELIVERY.CODE;
        break;
      case 4:
        status = ORDER_STATUS.SUCCESSFUL_DELIVERY.CODE;
        break;
      case 5:
        status = ORDER_STATUS.CANCEL.CODE;
        break;
      default:
        status = '';
        break;
    }
    setOrderStatus(status);
  };

  return (
    <>
      <h4 className="page_title">Đơn hàng</h4>
      <TabsComponent value={valueTab} handleChangeValue={handleChange} labels={tabsLabel}/>
      <OrderContent valueTab={valueTab} orderStatus={orderStatus}/>
    </>
  );
};

export default Order;
