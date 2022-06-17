import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ROUTER_NAME } from "config/constants";
import usePopup from "setup/redux/usePopup";

const ExpiryToken = () => {
  const navigate = useNavigate();
  const { openForgotPassword } = usePopup();

  const goHome = () => {
    navigate(ROUTER_NAME.HOME);
  }

  return (
    <div className="expiry_token">
      <div className="content">
        <h4 className="my-4">Liên kết này đã hết hạn !</h4>
        <Button className="btn_go_home"variant="contained" onClick={goHome}>Trang chủ</Button>&emsp;
        <Button className="btn_go_resend_email"variant="outlined" onClick={openForgotPassword}>Gửi lại email</Button>
      </div>
    </div>
  );
};

export default ExpiryToken;
