import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "setup";
import { setIdsCheckedAction, setTotalMoneyAction } from "setup/redux/cart/CartAction";
import CartItem from "./CartItem";
import CartItemFooter from "./CartItemFooter";
import EmptyCart from "./EmptyCart";

const ListProduct = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.ListCart);
  const idsChecked = useSelector(state => state.cart.IdsChecked);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);

  const handleCheckAll = () => {
    setIsCheckAll((prev) => !prev);
    const ids: number[] = carts.results.map((item) => item.id);
    if (!isCheckAll) {
      dispatch(setIdsCheckedAction(ids))
    } else {
      dispatch(setIdsCheckedAction([]))
    }
  };

  useEffect(() => {
    let totalPay = 0;
    carts.results.forEach(item => {
      if(idsChecked.includes(item.id)){
        let product = item.product;
        if(product.promotion_price){
          totalPay+=Number(product.promotion_price * item.amount);
        }else{
          totalPay+=Number(product.price * item.amount);
        }
      }
    })
    dispatch(setTotalMoneyAction(totalPay));
    if(idsChecked.length>=carts.total){
      setIsCheckAll(true);
    }
  }, [idsChecked,carts])

  const handleChangeCheckedItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const ids = [...idsChecked];
    const checked = event.target.checked;
    const dataIndex = idsChecked.indexOf(id);
    
    if (checked) {
      if (dataIndex === -1) {
        ids.push(id);
        dispatch(setIdsCheckedAction(ids))
        setIsCheckAll(ids.length === carts.total);
      }
    } else {
      dispatch(setIdsCheckedAction(ids.filter((item:number) => item !== id)))
      setIsCheckAll(false);
    }
  };

  return (
    <div className="cart_content">
      {(carts.results || []).map((cart, index) => (
        <CartItem
          key={index}
          data={cart}
          isCheckAll={isCheckAll}
          handleChangeCheckedItem={handleChangeCheckedItem}
        />
      ))}
      {!carts.total && <EmptyCart />}
      {!!carts.total && (
        <CartItemFooter
          isCheckAll={isCheckAll}
          handleCheckAll={handleCheckAll}
        />
      )}
    </div>
  );
};

export default ListProduct;
