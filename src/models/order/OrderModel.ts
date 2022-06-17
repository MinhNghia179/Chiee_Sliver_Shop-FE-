import { OrderDetailModel } from './OrderDetailModel';
import { OrderStatusModel } from './OrderStatusModel';

export interface OrderModel {
  id                : number;
  user_id           : number;
  recipient_name    : string;
  recipient_phone   : string;
  recipient_address : string;
  note              : string;
  shipping          : number;
  total_payment     : number;
  order_status      : OrderStatusModel[];
  order_details     : OrderDetailModel[];
};

export interface ListOrderModel {
  results : OrderModel[];
  total   : number;
}