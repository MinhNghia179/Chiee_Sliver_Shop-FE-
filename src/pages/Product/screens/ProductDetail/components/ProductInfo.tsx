import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  MESSAGE_SUCCESS,
  MESSAGE_WARNING,
  ROUTER_NAME,
} from 'config/constants';
import { ProductCategoryModel } from 'models/product/ProductCategoryModel';
import {
  ProductColorModel,
  ProductSizeModel,
} from 'models/product/ProductModel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'setup';
import {
  addToCartAction,
  getListCartAction,
} from 'setup/redux/cart/CartAction';
import { setProductBuyNowAction } from 'setup/redux/product/ProductAction';
import usePopup from 'setup/redux/usePopup';
import { formatMoney, mappingProductCategory } from 'utils';
import { toastError, toastSuccess, toastWarning } from 'utils/message';

const ProductInfo = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<ProductColorModel[]>([]);
  const [category, setCategory] = useState<ProductCategoryModel | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [color, setColor] = useState<ProductColorModel | null>(null);
  const [size, setSize] = useState<ProductSizeModel | null>(null);
  const productDetail = useSelector((state) => state.product.ProductDetail);
  const categories = useSelector((state) => state.product.ListProductCategory);
  const userInfo = useSelector((state) => state.auth.user_info);
  const { openAuth } = usePopup();
  const dispatch = useDispatch();

  const handleSelectColor = (
    event: React.MouseEvent<HTMLElement>,
    color: any | null
  ) => {
    setColor(color);
    setSize(!color.sizes.length ? null : color.sizes[0]);
  };

  const handleSelectSize = (
    event: React.MouseEvent<HTMLElement>,
    size: any | null
  ) => {
    setSize(size);
    setAmount(0);
  };

  useEffect(() => {
    const convertProperties: ProductColorModel[] =
      JSON.parse(productDetail?.properties || '[]') || [];
    setProperties(convertProperties);
    if (convertProperties.length) {
      const colorTmp = convertProperties[0];
      setColor(colorTmp);
      setSize(!colorTmp.sizes.length ? null : colorTmp.sizes[0]);
    }
    setCategory(
      mappingProductCategory(
        productDetail?.category_id || -1,
        categories.results || []
      )
    );
  }, [productDetail]);

  const handleProductAmount = (type: 'ADD' | 'REMOVE') => {
    if (type === 'ADD' && size?.amount && amount < size.amount) {
      setAmount((prev) => prev + 1);
    } else if (type === 'REMOVE' && amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (userInfo) {
      if (color && size) {
        if (amount === 0) {
          toastWarning(MESSAGE_WARNING.ADD_TO_CART_NO_AMOUNT);
          return;
        }

        let properties: any = {
          ...color,
          size: size,
        };

        delete properties.sizes;
        delete properties.amount;

        const payload = {
          user_id: userInfo.id,
          product_id: productDetail?.id || 0,
          amount: amount,
          properties: JSON.stringify(properties),
        };

        dispatch(
          addToCartAction(payload, (res: any) => {
            if (res.status) {
              toastSuccess(MESSAGE_SUCCESS.ADD_TO_CART);
              dispatch(getListCartAction({ user_id: userInfo.id }));
            } else {
              toastError(res.message);
            }
          })
        );
      } else {
        toastWarning(MESSAGE_WARNING.NOT_SELECTED_PROPERTIES);
      }
    } else {
      openAuth();
    }
  };

  const handleBuyNow = () => {
    if (userInfo) {
      if (color && size) {
        if (amount === 0) {
          toastWarning(MESSAGE_WARNING.ADD_TO_CART_NO_AMOUNT);
          return;
        }

        let properties: any = {
          ...color,
          size: size,
        };

        delete properties.sizes;
        delete properties.amount;

        let totalPay = 0;
        const currentTime = new Date();

        if (productDetail) {
          const startDate = new Date(productDetail.promotion_time_start);
          const endDate = new Date(productDetail.promotion_time_end);
          if (
            productDetail.promotion_price &&
            currentTime.getTime() >= startDate.getTime() &&
            currentTime.getTime() <= endDate.getTime()
          ) {
            totalPay += Number(productDetail.promotion_price * amount);
          } else {
            totalPay += Number(productDetail.price * amount);
          }
        }

        const payload = {
          cart: {
            user_id: userInfo.id,
            product_id: productDetail?.id || 0,
            amount: amount,
            properties: properties,
            product: productDetail,
          },
          totalMoney: totalPay,
        };

        dispatch(setProductBuyNowAction(payload));
        navigate(ROUTER_NAME.CHECKOUT);
      } else {
        toastWarning(MESSAGE_WARNING.NOT_SELECTED_PROPERTIES);
      }
    } else {
      openAuth();
    }
  };

  return (
    <div className="product_info">
      <h4>{productDetail?.name}</h4>
      <div className="product_info_category mb-2">
        <Link
          to={`${ROUTER_NAME.PRODUCT_CATEGORY}/${
            category ? category.code : ''
          }-${category ? category.id : ''}`}
        >
          Loại sản phẩm: {category ? category.name : ''}
        </Link>
      </div>
      <div className="product_info_price">
        {productDetail?.promotion_price ? (
          <>
            {formatMoney(productDetail.promotion_price)}
            <span>{formatMoney(productDetail.price || 0)}</span>
          </>
        ) : (
          <>{formatMoney(productDetail?.price || 0)}</>
        )}
      </div>
      <hr />
      <div className="mt-4">
        <div
          dangerouslySetInnerHTML={{
            __html: productDetail?.short_description || '',
          }}
        />
      </div>
      <hr />
      <div className="product_properties">
        <div className="d-flex align-items-center item_property">
          <div className="item_property_name">
            <b>Màu sắc</b>
          </div>
          <div className="flex-grow-1">
            <ToggleButtonGroup
              value={color}
              exclusive
              onChange={handleSelectColor}
              className="property_color flex-wrap"
            >
              {properties.map((item: ProductColorModel) => {
                return (
                  <ToggleButton
                    key={item.id}
                    value={item}
                    aria-label={item.color_name}
                  >
                    {item.color_name}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center mt-3 item_property">
          <div className="item_property_name">
            <b>Kích thước</b>
          </div>
          <ToggleButtonGroup
            value={size}
            exclusive
            onChange={handleSelectSize}
            className="property_color flex-wrap"
          >
            {color ? (
              (color?.sizes || []).map((item: ProductSizeModel) => {
                return (
                  <ToggleButton
                    key={item.size_id}
                    value={item}
                    aria-label={item.size_name}
                  >
                    {item.size_name}
                  </ToggleButton>
                );
              })
            ) : (
              <>😜 Bạn cần chọn màu trước 🤪</>
            )}
          </ToggleButtonGroup>
        </div>
      </div>
      <hr />
      <div className="my-3">
        <b>Kho: </b>
        {size && color ? (
          <span>
            {size.amount !== 0 ? (
              <span>{size.amount} sản phẩm có sẵn</span>
            ) : (
              <span className="text-danger">Hết hàng</span>
            )}
          </span>
        ) : (
          '_ _ _'
        )}
      </div>
      <hr />
      <div className="product_info_amount">
        <div className="label">Chọn số lượng: </div>
        <div className="amount_item">{amount}</div>
        <ButtonGroup>
          <Button
            aria-label="reduce"
            onClick={() => handleProductAmount('REMOVE')}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => handleProductAmount('ADD')}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
      <hr />
      <div className="d-flex mt-3 product_info_action">
        <Button className="btn_add_to_cart" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </Button>
        <Button
          variant="outlined"
          className="btn_buy_now"
          onClick={handleBuyNow}
        >
          Mua ngay
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
