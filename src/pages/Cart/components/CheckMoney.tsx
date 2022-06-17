import { Button } from "@mui/material";

const CheckMoney = () => {
  return (
    <div className="cart_content_right">
      <div className="d-flex justify-content-between">
        <span>Tổng tiền</span>
        <span>500.000 đ</span>
      </div>
      <Button variant="outlined">Thanh toán</Button>
    </div>
  );
};

export default CheckMoney;
