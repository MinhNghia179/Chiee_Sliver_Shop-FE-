import './cart.style.scss';
import { Box } from '@mui/system';
import BreadcrumbsPage from 'components/BreadcrumbsPage';
import { ROUTER_NAME } from 'config/constants';
import { Helmet } from 'react-helmet';
import { Row } from 'reactstrap';
import CheckMoney from './components/CheckMoney';
import EmptyCart from './components/EmptyCart';
import ListProduct from './components/ListProduct';

const DataBreadcrumbs = [
  {
    name: 'Giỏ hàng',
    link: ROUTER_NAME.CART,
    currentPage: true,
  },
];

const Cart = () => {
  return (
    <>
      <Helmet>
        <title>Giỏ hàng | Chiee Sliver</title>
      </Helmet>
      {/* --------------------------------------------------------- */}
      <BreadcrumbsPage data={DataBreadcrumbs} />
      {/* <Box
        sx={{ borderRadius: 2, boxShadow: 1 }}
        className="my-3 p-3 bg-white cart"
      >
        <EmptyCart/>
        
      </Box> */}
      <ListProduct />
    </>
  );
};

export default Cart;
