import './checkout.style.scss';
import { Grid } from '@mui/material';
import BreadcrumbsPage from 'components/BreadcrumbsPage';
import { ROUTER_NAME } from 'config/constants';
import { Helmet } from 'react-helmet';
import CheckoutInfo from './components/CheckoutInfo';
import CheckoutProducts from './components/CheckoutProducts';

const DataBreadcrumbs = [
  {
    name: 'Thanh toán',
    link: ROUTER_NAME.CHECKOUT,
    currentPage: true,
  },
];

const Checkout = () => {
  return (
    <>
      <Helmet>
        <title>Thanh toán | Chiee Sliver</title>
      </Helmet>
      {/* --------------------------------------------------------- */}
      <BreadcrumbsPage data={DataBreadcrumbs} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <CheckoutInfo />
        </Grid>
        <Grid item xs={12} md={4}>
          <CheckoutProducts />
        </Grid>
      </Grid>
    </>
  );
};

export default Checkout;
