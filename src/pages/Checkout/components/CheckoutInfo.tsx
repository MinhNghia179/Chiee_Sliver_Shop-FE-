import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import { MESSAGE_SUCCESS, ROUTER_NAME } from "config/constants";
import { useFormik } from "formik";
import { CartModel } from "models/CartModel";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "setup";
import { deleteCartAction, getListCartAction } from "setup/redux/cart/CartAction";
import { createOrderAction } from "setup/redux/order/OrderAction";
import { getFullName } from "utils";
import { toastSuccess } from "utils/message";
import { formSchemaCheckout } from "./FormSchemaCheckout";

const CheckoutInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.user_info);
  const carts = useSelector(state => state.cart.ListCart);
  const idsCartChecked = useSelector(state => state.cart.IdsChecked);
  const productBuyNow = useSelector(state => state.product.ProductBuyNow);


  const initialValues = {
    last_name: userInfo?.last_name || "",
    first_name: userInfo?.first_name || "",
    phone_number: userInfo?.phone_number || "",
    address: userInfo?.address || "",
    note: "",
    shipping:15000,
    total_payment:0,
    order_detail:[]
  };

  const formik = useFormik({
    initialValues,
    validationSchema:formSchemaCheckout,
    onSubmit: (values) => handleSubmit(),
  });

  const setValueFormik = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleSubmit = () => {
    const payload = {
      user_id:userInfo?.id || 0,
      recipient_name:getFullName(formik.values.first_name,formik.values.last_name),
      recipient_phone:formik.values.phone_number,
      recipient_address:formik.values.address,
      note:formik.values.note,
      shipping:formik.values.shipping,
      total_payment:formik.values.total_payment,
      order_details:formik.values.order_detail
    }
    dispatch(createOrderAction(payload,()=>{
      const dataDeleteCart = {
        data:{
          ids:idsCartChecked
        }
      }
      dispatch(deleteCartAction(dataDeleteCart,(res:any)=>{
        if (res.status) {
          dispatch(getListCartAction({ user_id: userInfo?.id || 0 }));
          toastSuccess(MESSAGE_SUCCESS.CHECKOUT);
          navigate(`${ROUTER_NAME.ACCOUNT}/${ROUTER_NAME.ACCOUNT_ORDER}`);
        }
      }))
    }))
  };

  const handleChangeInput = (event: any) => {
    let name = event.target.id.toString();
    setValueFormik(`${name}`, event.target.value);
  };

  const goHome = () => {
    navigate(ROUTER_NAME.PRODUCT)
  }

  const setDataProduct = () => {
    if(productBuyNow){
      return;
    }
    const dataOrderDetail:any[] = [];
    let totalPayment = 0;
    carts.results.forEach(item => {
      if(idsCartChecked.includes(item.id)){
        const list_image = JSON.parse(item.product.list_image|| '[]');
        let price = 0;
        if(item.product.promotion_price){
          price = item.product.promotion_price;
        }else{
          price = item.product.price;
        }
        totalPayment+= price * Number(item.amount);
        dataOrderDetail.push({
          product_id       : item.product_id,
          product_name     : item.product.name,
          product_price    : price,
          product_quantity : item.amount,
          image            : list_image.length>0 ? list_image[0].url : null,
          properties       : JSON.stringify(item.properties),
        });
      }
    });
    totalPayment+=Number(formik.values.shipping);
    setValueFormik("order_detail",dataOrderDetail);
    setValueFormik("total_payment",totalPayment);
  }

  useEffect(() => {
    setDataProduct();
  }, [carts])

  useEffect(() => {
    if(productBuyNow){
      const dataOrderDetail:any[] = [];
      const list_image = JSON.parse(productBuyNow.cart.product.list_image|| '[]');

      let totalPayment = productBuyNow?.totalMoney || 0;
      let price = 0;
      const currentTime = new Date();

      const startDate = new Date(productBuyNow.cart.product.promotion_time_start);
      const endDate = new Date(productBuyNow.cart.product.promotion_time_end);
      if(productBuyNow.cart.product.promotion_price && currentTime.getTime() >= startDate.getTime() && currentTime.getTime() <= endDate.getTime()){
        price+=Number(productBuyNow.cart.product.promotion_price);
      }else{
        price+=Number(productBuyNow.cart.product.price);
      }

      dataOrderDetail.push({
            product_id       : productBuyNow.cart.product_id,
            product_name     : productBuyNow.cart.product.name,
            product_price    : price,
            product_quantity : productBuyNow.cart.amount,
            image            : list_image.length>0 ? list_image[0].url : null,
            properties       : JSON.stringify(productBuyNow.cart.properties),
      });

      totalPayment+=Number(formik.values.shipping);
      setValueFormik("order_detail",dataOrderDetail);
      setValueFormik("total_payment",totalPayment);
    }
  }, [productBuyNow])

  return (
    <>
      <Box sx={{ borderRadius: 2, boxShadow: 1 }} className="my-3 p-3 bg-white">
        <h1 className="page_title">Thông tin nhận hàng</h1>
        <Divider />
        <Grid container spacing={2} className="mt-3">
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="last_name"
              label="Họ"
              defaultValue=""
              fullWidth
              value={formik.values.last_name}
              onChange={handleChangeInput}
              error={
                formik.errors?.last_name && formik.touched?.last_name
                  ? true
                  : false
              }
              helperText={formik.touched?.last_name && formik.errors?.last_name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="first_name"
              label="Tên"
              defaultValue=""
              fullWidth
              value={formik.values.first_name}
              onChange={handleChangeInput}
              error={
                formik.errors?.first_name && formik.touched?.first_name
                  ? true
                  : false
              }
              helperText={formik.touched?.first_name && formik.errors?.first_name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phone_number"
              label="Số điện thoại"
              defaultValue=""
              fullWidth
              value={formik.values.phone_number}
              onChange={handleChangeInput}
              error={
                formik.errors?.phone_number && formik.touched?.phone_number
                  ? true
                  : false
              }
              helperText={formik.touched?.phone_number && formik.errors?.phone_number}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              label="Địa chỉ nhận hàng"
              defaultValue=""
              fullWidth
              value={formik.values.address}
              onChange={handleChangeInput}
              error={
                formik.errors?.address && formik.touched?.address
                  ? true
                  : false
              }
              helperText={formik.touched?.address && formik.errors?.address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              id="note"
              label="Ghi chú"
              defaultValue=""
              fullWidth
              value={formik.values.note}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item xs={12}>
            * Thanh toán khi nhận hàng
          </Grid>
          <Grid item md={12} className="mt-3">
            <Button variant="contained" className="btn_main" onClick={formik.submitForm}>
              Thanh toán
            </Button>
            &emsp;
            <Button variant="outlined" className="btn_outline_main" onClick={goHome}>
              Tiếp tục mua hàng
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CheckoutInfo;
