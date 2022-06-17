import AccountCircleOutlinedIcon                            from "@mui/icons-material/AccountCircleOutlined";
import { Divider, IconButton, Menu, MenuItem, Typography }  from "@mui/material";
import React, { useState }                                  from "react";
import LogoutIcon                                           from "@mui/icons-material/Logout";
import PersonIcon                                           from "@mui/icons-material/Person";
import { useDispatch }                                      from "react-redux";
import { useNavigate }                                      from "react-router-dom";

import { getFullName }                                      from "utils";
import { toastSuccess }                                     from "utils/message";
import { MESSAGE_SUCCESS, ROUTER_NAME }                     from "config/constants";
import { setListFavoriteAction }                            from "setup/redux/favorite/FavoriteAction";
import { clearCartAction }                                  from "setup/redux/cart/CartAction";
import { logoutAction }                                     from "setup/redux/auth/AuthActions";
import usePopup                                             from "setup/redux/usePopup";
import { useSelector }                                      from "setup";

const User = () => {
  const dispatch = useDispatch();
  const { openAuth } = usePopup();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.user_info);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (userInfo) {
      setAnchorElUser(event.currentTarget);
    } else {
      openAuth();
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutAction({}));
    dispatch(setListFavoriteAction({results:[],total:0}));
    dispatch(clearCartAction())
    toastSuccess(MESSAGE_SUCCESS.LOGOUT);
    setAnchorElUser(null);
    navigate(ROUTER_NAME.HOME);
  };

  const handleGoToAccount = () => {
    navigate(ROUTER_NAME.ACCOUNT);
    setAnchorElUser(null);
  };

  return (
    <div className="item_account">
      <IconButton onClick={handleOpenUserMenu}>
        <AccountCircleOutlinedIcon sx={{ fontSize: 30 }} />
      </IconButton>

      <Menu
        sx={{ mt: "50px", zIndex: 999999 }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">
            <span>
              Hi,{" "}
              {getFullName(
                userInfo?.first_name || "",
                userInfo?.last_name || ""
              )}
            </span>
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleGoToAccount}>
          <Typography textAlign="center">
            <PersonIcon /> <span>Tài khoản</span>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">
            <LogoutIcon /> <span>Đăng xuất</span>
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default User;
