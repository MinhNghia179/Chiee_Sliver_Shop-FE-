import { ButtonGroup, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import {
  getListCartAction,
  updateCartItemAction,
  deleteCartAction,
} from "setup/redux/cart/CartAction";
import { useSelector } from "setup";

interface IProps {
  cartId: number;
  amount: number;
}

const CartItemAmount = ({ cartId, amount }: IProps) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user_info);

  const addAmount = () => {
    const newAmount = amount + 1;
    updateItem(newAmount);
  };

  const removeAmount = () => {
    const newAmount = amount - 1;
    if (newAmount === 0) {
      deleteItem();
    } else {
      updateItem(newAmount);
    }
  };

  const updateItem = (amount: any) => {
    const payload = {
      id: cartId,
      amount: amount,
    };

    dispatch(
      updateCartItemAction(payload, (res: any) => {
        if (res.status) {
          dispatch(getListCartAction({ user_id: userInfo?.id || 0 }));
        }
      })
    );
  };

  const deleteItem = () => {
    const payload = {
      data: {
        ids: [cartId],
      },
    };

    dispatch(
      deleteCartAction(payload, (res: any) => {
        if (res.status) {
          dispatch(getListCartAction({ user_id: userInfo?.id || 0 }));
        }
      })
    );
  };

  return (
    <div>
      <ButtonGroup
        variant="text"
        aria-label="outlined button group"
        className="btn_change_amount"
      >
        <IconButton onClick={removeAmount}>
          <RemoveIcon />
        </IconButton>
        <div className="d-flex align-items-center justify-content-center text_amount">
          {amount}
        </div>
        <IconButton onClick={addAmount}>
          <AddIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

export default CartItemAmount;
