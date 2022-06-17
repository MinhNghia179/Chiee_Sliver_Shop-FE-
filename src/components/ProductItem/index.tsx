import "./product-item.style.scss";
import FavoriteBorderIcon                             from "@mui/icons-material/FavoriteBorder";
import { Box, IconButton, Tooltip }                   from "@mui/material";
import { Link, useNavigate }                          from "react-router-dom";
import { useDispatch }                                from "react-redux";
import { useCallback, useEffect, useMemo, useState }  from "react";

import {
  MESSAGE_SUCCESS,
  ROUTER_NAME,
}                                     from "config/constants";
import {
  checkDiscount,
  checkNewProduct,
  formatMoney,
  formatShortDescription,
  getThumbnailProduct,
  slug,mappingProductCategory
}                                     from "utils";
import { toastSuccess }               from "utils/message";
import { ProductModel }               from "models/product/ProductModel";
import { ProductCategoryModel }       from "models/product/ProductCategoryModel";
import { useSelector }                from "setup";
import usePopup                       from "setup/redux/usePopup";
import {
  addToFavoriteAction,
  deleteFavoriteAction,
  getListFavoriteAction,
}                                     from "setup/redux/favorite/FavoriteAction";

interface IProps {
  data: ProductModel;
}

const ProductItem = ({ data }: IProps) => {
  const { openAuth } = usePopup();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState<ProductCategoryModel | null>(null);
  const categories = useSelector((state) => state.product.ListProductCategory);
  const userInfo = useSelector((state) => state.auth.user_info);
  const favorites = useSelector((state) => state.favorite.ListFavorite);

  const handleOpenProductDetail = () => {
    navigate(`${ROUTER_NAME.PRODUCT}/${slug(data?.name || "")}-${data?.id}`);
  };

  useEffect(() => {
    setCategory(
      mappingProductCategory(data?.category_id || -1, categories.results || [])
    );
  }, [data]);

  const newProduct = useMemo(() => {
    const isNew = checkNewProduct(
      data?.modified_at ? data.modified_at : data?.created_at || ""
    );
    return isNew ? <div className="new_label">Mới</div> : "";
  }, [data]);

  const getPercentDiscount = useMemo(() => {
    const percentDiscount = checkDiscount(
      data?.price || 0,
      data?.promotion_price || 0,
      data?.promotion_time_start || "",
      data?.promotion_time_end || ""
    );
    return percentDiscount ? (
      <div className="discount_label">-{percentDiscount}%</div>
    ) : (
      ""
    );
  }, [data]);

  const goToProductDetail = () => {
    //navigate(`${ROUTER_NAME.PRODUCT}/${slug(data?.name || "")}-${data?.id}`);
  };

  const checkProductFavorite = useCallback(() => {
    if (!favorites.total) return false;
    const findFavorite = favorites.results.findIndex(
      (product) => product.id == data?.id
    );
    return findFavorite !== -1;
  }, [favorites]);

  const handleAddToFavorite = () => {
    if (userInfo) {
      const payload = {
        user_id: userInfo?.id || 0,
        product_id: data?.id || 0,
      };
      if (checkProductFavorite()) {
        const payloadRemove = {
          data :{
            ids:[payload]
          }
        };
        dispatch(
          deleteFavoriteAction(payloadRemove, () => {
            toastSuccess(MESSAGE_SUCCESS.REMOVE_TO_FAVORITE);
            dispatch(getListFavoriteAction({ user_id: userInfo?.id || 0 }));
          })
        );
      } else {
        dispatch(
          addToFavoriteAction(payload, () => {
            toastSuccess(MESSAGE_SUCCESS.ADD_TO_FAVORITE);
            dispatch(getListFavoriteAction({ user_id: userInfo?.id || 0 }));
          })
        );
      }
    } else {
      openAuth();
    }
  };

  return (
    <Box
      sx={{ borderRadius: 1, boxShadow: 1 }}
      className="product_item_container bg-white"
      onClick={goToProductDetail}
    >
      <div className="product_item_head">
        {getPercentDiscount}
        {newProduct}
        <img
          alt="anh san pham"
          src={getThumbnailProduct(data?.list_image || "[]")}
        />
      </div>

      <div className="product_info p-3">
        <div className="product_info_category">
          <Link
            to={`${ROUTER_NAME.PRODUCT_CATEGORY}/${
              category ? category.code : ""
            }-${category ? category.id : ""}`}
          >
            {category ? category.name : ""}
          </Link>
        </div>
        <div className="product_info_name" onClick={handleOpenProductDetail}>
          <Link
            to={`${ROUTER_NAME.PRODUCT}/${slug(data?.name || "")}-${data?.id}`}
          >
            {formatShortDescription(data?.name || "", 50)}
          </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="product_info_price">
            {data?.promotion_price ? (
              <>
                {formatMoney(data.promotion_price)}
                <span>{formatMoney(data.price || 0)}</span>
              </>
            ) : (
              <>{formatMoney(data?.price || 0)}</>
            )}
          </div>
          <Tooltip title={checkProductFavorite() ? "Xóa khỏi danh sách yêu thích" : "Thêm vào danh sách yêu thích"} placement="bottom">
            <IconButton onClick={handleAddToFavorite}>
              <FavoriteBorderIcon
                className={checkProductFavorite() ? "active_favorite" : ""}
              />
            </IconButton>
          </Tooltip>
          
        </div>
      </div>
    </Box>
  );
};

export default ProductItem;
