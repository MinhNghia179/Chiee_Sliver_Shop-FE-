import { 
  BrowserRouter, 
  Route, 
  Routes 
}                       from "react-router-dom";
import { ROUTER_NAME }  from "config/constants";
import Layout           from "layout";
import Home             from "pages/Home";
import NotFound         from "pages/404";
import About            from "pages/About";
import ProductList      from "pages/Product/screens/ProductList";
import Contact          from "pages/Contact";
import BlogList         from "pages/Blog/screens/BlogList";
import ProductDetail    from "pages/Product/screens/ProductDetail";
import Cart             from "pages/Cart";
import Account          from "pages/Account";
import AccountInfo      from "pages/Account/components/AccountInfo";
import Order            from "pages/Account/components/Order";
import UpdatePassword   from "pages/Account/components/UpdatePassword";
import Checkout         from "pages/Checkout";
import OrderDetail      from "pages/Account/components/OrderDetail";
import Favorite         from "pages/Favorite";
import BlogDetail       from "pages/Blog/screens/BlogDetail";
import ResetPassword    from "pages/Auth/ResetPassword";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTER_NAME.ABOUT} element={<About />} />
        <Route path={ROUTER_NAME.PRODUCT} element={<ProductList />} />
        <Route path={`${ROUTER_NAME.PRODUCT}/tim-kiem/`} element={<ProductList />} />
        <Route path={`${ROUTER_NAME.PRODUCT}/tim-kiem/:query`} element={<ProductList />} />
        <Route path={`${ROUTER_NAME.PRODUCT_CATEGORY}/:categoryId`} element={<ProductList />} />
        <Route path={`${ROUTER_NAME.PRODUCT}/:id`} element={<ProductDetail />} />
        <Route path={ROUTER_NAME.CONTACT} element={<Contact />} />
        <Route path={ROUTER_NAME.BLOG} element={<BlogList />} />
        <Route path={`${ROUTER_NAME.BLOG}/:id`} element={<BlogDetail />} />
        <Route path={ROUTER_NAME.CART} element={<Cart />} />
        <Route path={ROUTER_NAME.CHECKOUT} element={<Checkout />} />
        <Route path={ROUTER_NAME.FAVORITE} element={<Favorite />} />
        <Route path={`${ROUTER_NAME.RESET_PASSWORD}/:token_id`} element={<ResetPassword />} />
        <Route path={ROUTER_NAME.ACCOUNT} element={<Account />} >
          <Route index element={<AccountInfo />} />
          <Route path={ROUTER_NAME.ACCOUNT_ORDER} element={<Order />} />
          <Route path={`${ROUTER_NAME.ACCOUNT_ORDER_DETAIL}/:order_id`} element={<OrderDetail />} />
          <Route path={ROUTER_NAME.ACCOUNT_UPDATE_PASSWORD} element={<UpdatePassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
