import "./bottom-menu.style.scss";
import { useEffect, useState }      from "react";
import HomeOutlinedIcon             from "@mui/icons-material/HomeOutlined";
import NotesOutlinedIcon            from "@mui/icons-material/NotesOutlined";
import CallOutlinedIcon             from "@mui/icons-material/CallOutlined";
import FavoriteBorderOutlinedIcon   from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon     from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon    from "@mui/icons-material/PersonOutlineOutlined";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTER_NAME }              from "config/constants";
import { useSelector }              from "setup";
import usePopup                     from "setup/redux/usePopup";

const BottomMenu = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const userInfo = useSelector(state => state.auth.user_info);
  const { openAuth } = usePopup();
  const [routerActive,setRouterActive] = useState("");

  useEffect(() => {
    setRouterActive(location.pathname);
  }, [location])

  const goToHome = () => {
    navigate(ROUTER_NAME.HOME);
  }

  const goToContact = () => {
    navigate(ROUTER_NAME.CONTACT);
  }

  const goToFavorite = () => {
    if(userInfo){
      navigate(ROUTER_NAME.FAVORITE);
    }else{
      openAuth();
    }
  }

  const goToAccount = () => {
    if(userInfo){
      navigate(ROUTER_NAME.ACCOUNT);
    }else{
      openAuth();
    }
  }

  const goToCart = () => {
    if(userInfo){
      navigate(ROUTER_NAME.CART);
    }else{
      openAuth();
    }
  }

  const goToProduct = () => {
    navigate(ROUTER_NAME.PRODUCT)
  }

  return (
    <div className="bottom_menu">
      <div className={`bottom_menu_item ${routerActive === ROUTER_NAME.HOME && " active"}`}
        onClick={goToHome}
      >
        <HomeOutlinedIcon />
        <div>Trang chủ</div>
      </div>
      <div className={`bottom_menu_item ${(routerActive.includes(ROUTER_NAME.PRODUCT) || routerActive.includes(ROUTER_NAME.PRODUCT_CATEGORY)) && " active"}`} 
          onClick={goToProduct}
      >
          <NotesOutlinedIcon />
          <div>Sản phẩm</div>
      </div>
      <div className={`bottom_menu_item ${routerActive === ROUTER_NAME.CONTACT && " active"}`} 
        onClick={goToContact}
        >
        <CallOutlinedIcon />
        <div>Liên hệ</div>
      </div>
      <div className={`bottom_menu_item ${routerActive === ROUTER_NAME.FAVORITE && " active"}`}
       onClick={goToFavorite}
       >
        <FavoriteBorderOutlinedIcon />
        <div>Yêu thích</div>
      </div>
      <div className={`bottom_menu_item ${routerActive === ROUTER_NAME.CART && " active"}`}
       onClick={goToCart}
      >
        <ShoppingCartOutlinedIcon />
        <div>Giỏ hàng</div>
      </div>
      <div className={`bottom_menu_item ${routerActive.includes(ROUTER_NAME.ACCOUNT) && " active"}`}
       onClick={goToAccount}
      >
        <PersonOutlineOutlinedIcon />
        <div>Tài khoản</div>
      </div>
    </div>
  );
};

export default BottomMenu;
