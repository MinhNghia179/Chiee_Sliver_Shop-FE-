import { Box, Checkbox } from "@mui/material";

const CartItemHead = () => {
  return (
    <Box
      sx={{ borderRadius: 2, boxShadow: 1 }}
      className="d-flex align-items-center my-3 p-3 bg-white cart_item"
    >
      <div className="">
        <Checkbox />
      </div>
      <div className="flex-grow-1">Sản phẩm</div>
      <div className="item-col">Đơn giá</div>
      <div className="item-col">Số lượng</div>
      <div className="item-col">Số tiền</div>
      <div className="item-col">Thao tác</div>
    </Box>
  );
};

export default CartItemHead;
