import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge }                from "@mui/material";
import { useEffect }            from "react";
import { useDispatch }          from "react-redux";
import { useNavigate }          from "react-router-dom";

import { ROUTER_NAME }          from "config/constants";
import { useSelector }          from "setup";
import { getListCartAction }    from "setup/redux/cart/CartAction";
import usePopup                 from "setup/redux/usePopup";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openAuth } = usePopup();
  const userInfo = useSelector((state) => state.auth.user_info);
  const cart = useSelector(state => state.cart.ListCart);

  const goToCart = () => {
    if (userInfo) {
      navigate(ROUTER_NAME.CART);
    }else{
      openAuth();
    }
  };

  useEffect(() => {
    if (userInfo) {
      const payload = {
        user_id: userInfo.id,
      };
      dispatch(getListCartAction(payload));
    }
  }, [userInfo]);

  return (
    <div className="shopping_cart">
      <Badge badgeContent={cart.total} color="warning">
        <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} onClick={goToCart} />
      </Badge>
    </div>
  );
};

export default Cart;
