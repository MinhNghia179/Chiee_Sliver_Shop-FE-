import { useEffect, useState }  from "react";
import { useDispatch }          from "react-redux";
import { Box }                  from "@mui/material";
import { Link, useLocation, useNavigate }    from "react-router-dom";
import PersonIcon               from '@mui/icons-material/Person';
import FavoriteBorderIcon       from '@mui/icons-material/FavoriteBorder';
import ContentPasteIcon         from '@mui/icons-material/ContentPaste';
import LogoutIcon               from '@mui/icons-material/Logout';
import LockIcon                 from '@mui/icons-material/Lock';

import { 
  MESSAGE_SUCCESS, 
  ROUTER_NAME 
}                               from "config/constants";
import { logoutAction }         from "setup/redux/auth/AuthActions";
import { toastSuccess }         from "utils/message";

const MenuAccount = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [path,setPath] = useState("");

  useEffect(() => {
    setPath(location.pathname.replace(ROUTER_NAME.ACCOUNT,""))
  }, [location])

  const handleLogOut = () =>{
    localStorage.clear();
    dispatch(logoutAction({}));
    toastSuccess(MESSAGE_SUCCESS.LOGOUT);
    navigate(ROUTER_NAME.HOME)
  }

  return (
    <>
      <Box
        sx={{ borderRadius: 2, boxShadow: 1 }}
        className="p-3 bg-white account_menu"
      >
        <ul>
          <li className={path === '' ?"active":""}><Link to={ROUTER_NAME.ACCOUNT}><PersonIcon/>&ensp;Thông tin cá nhân</Link></li>
          <li className={path.indexOf(ROUTER_NAME.ACCOUNT_ORDER) !== -1 ?"active":""}><Link to={`${ROUTER_NAME.ACCOUNT}/${ROUTER_NAME.ACCOUNT_ORDER}`}><ContentPasteIcon/>&ensp;Đơn mua</Link></li>
          <li><Link to={ROUTER_NAME.FAVORITE}><FavoriteBorderIcon/>&ensp;Sản phẩm yêu thích</Link></li>
          <li className={path.indexOf(ROUTER_NAME.ACCOUNT_UPDATE_PASSWORD) !== -1 ?"active":""}><Link to={`${ROUTER_NAME.ACCOUNT}/${ROUTER_NAME.ACCOUNT_UPDATE_PASSWORD}`}><LockIcon/>&ensp;Đổi mật khẩu</Link></li>
          <li><a onClick={handleLogOut}><LogoutIcon/>&ensp;Đăng xuất</a></li>
        </ul>
      </Box>
    </>
  );
};

export default MenuAccount;
