import { Box, Button, Checkbox, Grid }  from "@mui/material";
import { Link }                         from "react-router-dom";
import { useDispatch }                  from "react-redux";
import { useEffect, useMemo, useState } from "react";

import CartItemAmount                       from "./CartItemAmount";
import { IMAGE_DEFAULT, ROUTER_NAME }       from "config/constants";
import { ProductImageModel, ProductModel }  from "models/product/ProductModel";
import { CartModel }                        from "models/CartModel";
import { formatMoney, isDiscount, slug }    from "utils";
import {
  deleteCartAction,
  getListCartAction,
}                                           from "setup/redux/cart/CartAction";
import { useSelector }                      from "setup";

interface IProps {
  data: CartModel;
  isCheckAll: boolean;
  handleChangeCheckedItem: ( event: React.ChangeEvent<HTMLInputElement>, id: number ) => void;
}

const CartItem = ({ data, isCheckAll = false, handleChangeCheckedItem }: IProps) => {
  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState<ProductImageModel | null>(null);
  const userInfo = useSelector((state) => state.auth.user_info);
  const idsChecked = useSelector(state => state.cart.IdsChecked);

  useEffect(() => {
    const images = JSON.parse(data.product.list_image || "[]");
    if (!!images.length) {
      setProductImage(images[0]);
    }
  }, [data]);

  const getTotalPrice = useMemo(() => {
    const product: ProductModel = data.product;
    if (
      product.promotion_price &&
      isDiscount(
        product.price,
        product.promotion_price,
        product.promotion_time_start,
        product.promotion_time_end
      )
    ) {
      return data.amount * product.promotion_price;
    }

    return data.amount * product.price;
  }, [data]);

  const handleDeleteCartItem = () => {
    const payload = {
      data: {
        ids: [data.id],
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
    <Box
      sx={{ borderRadius: 2, boxShadow: 1 }}
      className=" my-3 p-3 bg-white cart_item"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <div className="d-flex align-items-center">
            <div className="">
              <Checkbox
                defaultChecked={false}
                checked={isCheckAll || idsChecked.includes(data.id)}
                onChange={(event: any) =>
                  handleChangeCheckedItem(event, data.id)
                }
              />
            </div>
            <div className="flex-grow-1">
              <div className="d-flex align-items-center cart_item_info">
                <img src={productImage ? productImage.url : IMAGE_DEFAULT} />
                <div>
                  <div>
                    <Link to={`${ROUTER_NAME.PRODUCT}/${slug(data.product.name || "")}-${data.product_id}`} >
                      {data.product.name}
                    </Link>
                  </div>
                  <div>
                    <span className="text-secondary">
                      {data.properties && (
                        <>
                          Màu sắc: {data.properties.color_name} | Kích thước:{" "}
                          {data.properties.size.size_name}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="mt-2 d-flex align-items-center">
                    <CartItemAmount cartId={data.id} amount={data.amount} />
                    <div>
                      <Button
                        className="text_color_main"
                        onClick={handleDeleteCartItem}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className="text_price">
            {data.product.promotion_price ? (
              <>
                <span className="price_discount">{formatMoney(data.product.price || 0)}</span>
                {formatMoney(data.product.promotion_price)}
              </>
            ) : (
              <>{formatMoney(data.product.price || 0)}</>
            )}
          </div>

          <div className="text_price">
            <div className="text_color_main">
              {formatMoney(getTotalPrice || 0)}
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
