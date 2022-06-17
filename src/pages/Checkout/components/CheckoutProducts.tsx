import { Box, Divider, Grid } from "@mui/material";
import ProductCheckoutItem from "components/ProductCheckoutItem";
import { CartModel } from "models/CartModel";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "setup";
import { setProductBuyNowAction } from "setup/redux/product/ProductAction";
import { formatMoney } from "utils";

const CheckoutProducts = () => {
  const dispatch = useDispatch();
  const carts = useSelector(state => state.cart.ListCart);
  const productBuyNow = useSelector(state => state.product.ProductBuyNow);
  const idsCartChecked = useSelector(state => state.cart.IdsChecked);
  const totalPay = useSelector(state => state.cart.TotalMoney);
  const [data,setData] = useState<CartModel[]|null>(null);
  const shipping = 15000;
  
  useEffect(() => {
    const newData = carts.results.filter(item => idsCartChecked.includes(item.id));
    setData(newData);
    return () => {
      dispatch(setProductBuyNowAction(null));
    }
  }, [carts])

  return (
    <>
      <Box sx={{ borderRadius: 2, boxShadow: 1 }} className="my-3 p-3 bg-white">
        <h1 className="page_title">Chi tiết đơn hàng</h1>
        <Divider />
        <div className="mt-3 checkout_products">
          {
            productBuyNow ? <ProductCheckoutItem data={productBuyNow.cart }/> :
            (data||[]).map((item:CartModel,index:number) => <ProductCheckoutItem data={item} key={index}/>)
          }
        </div>
        <div className="mt-3 d-flex justify-content-between">
          <h6>Vận chuyển</h6>
          <h5 className="text_color_main">{formatMoney(shipping)}</h5>
        </div>
        <div className="mt-1 d-flex justify-content-between">
          <h6>Tổng tiền</h6>
          <h5 className="text_color_main">
            {
              productBuyNow ? formatMoney(productBuyNow.totalMoney+shipping) : formatMoney(totalPay+shipping)
            }
          </h5>
        </div>
        
      </Box>
    </>
  );
};

export default CheckoutProducts;
