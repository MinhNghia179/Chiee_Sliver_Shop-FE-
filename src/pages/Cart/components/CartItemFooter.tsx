import { 
  Box, Button, Checkbox, 
  FormControlLabel, Grid 
}                                                   from "@mui/material";
import { useDispatch }                              from "react-redux";
import { useNavigate }                              from "react-router-dom";

import { MESSAGE_WARNING, ROUTER_NAME }             from "config/constants";
import { useSelector }                              from "setup";
import { deleteCartAction, getListCartAction }      from "setup/redux/cart/CartAction";
import { formatMoney }                              from "utils";
import { toastWarning }                             from "utils/message";

interface IProps {
  isCheckAll: boolean;
  handleCheckAll: () => void;
}

const CartItemFooter = ({ isCheckAll, handleCheckAll }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.ListCart);
  const userInfo = useSelector(state => state.auth.user_info);
  const idsChecked = useSelector(state => state.cart.IdsChecked);
  const totalMoney = useSelector(state => state.cart.TotalMoney);

  const handleDeleteCartChecked = () => {
    if(!idsChecked.length){
      toastWarning(MESSAGE_WARNING.CART_ID_NOT_SELECTED)
      return;
    }else{
      const payload = {
        data: {
          ids: idsChecked,
        },
      };
  
      dispatch(
        deleteCartAction(payload, (res: any) => {
          if (res.status) {
            dispatch(getListCartAction({ user_id: userInfo?.id || 0 }));
          }
        })
      );
    }
  }

  const goToCheckout = () => {
    if(!idsChecked.length){
      toastWarning(MESSAGE_WARNING.CART_CHECK_PRODUCTS)
    }else{
      navigate(ROUTER_NAME.CHECKOUT);
    }
    
  }

  return (
    <Box
      sx={{ borderRadius: 2, boxShadow: 4 }}
      className="my-3 p-4 d-flex align-items-center justify-content-between bg-white cart_item cart_item_footer"
    >
      <Grid container>
        <Grid item xs={12} md={3} className="d-flex justify-content-start align-items-center">
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={false}
                checked={isCheckAll}
                onChange={handleCheckAll}
              />
            }
            label={`Chọn tất cả (${carts.total || 0})`}
          />
        </Grid>
        <Grid item xs={12} md={3} className="d-flex justify-content-start align-items-center">
          <Button className="text_color_main btn_delete_cart" onClick={handleDeleteCartChecked} variant="outlined">Xóa</Button>
          <Button className="text-dark">Lưu Vào yêu thích</Button>
        </Grid>
        <Grid item xs={12} md={4} className="d-flex justify-content-end align-items-center item_price">
          <div className="price">
            Tổng thanh toán tạm tính: <span>{formatMoney(totalMoney)}</span>
          </div>
        </Grid>
        <Grid item xs={12} md={2} className="d-flex justify-content-end align-items-center">
          <Button variant="contained" className="btn_checkout bg_color_main" onClick={goToCheckout}>
            Mua hàng
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItemFooter;
