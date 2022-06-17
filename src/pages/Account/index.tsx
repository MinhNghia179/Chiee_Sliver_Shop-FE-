import './styles/account.style.scss';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import BreadcrumbsPage from 'components/BreadcrumbsPage';
import { ROUTER_NAME } from 'config/constants';
import MenuAccount from './components/MenuAccount';

const DataBreadcrumbs = [
  {
    name: 'Tài khoản',
    link: ROUTER_NAME.ACCOUNT,
    currentPage: true,
  },
];

const Account = () => {
  return (
    <>
      <Helmet>
        <title>Tài khoản | Chiee Sliver</title>
      </Helmet>
      {/* --------------------------------------------------------- */}
      <BreadcrumbsPage data={DataBreadcrumbs} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <MenuAccount />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{ borderRadius: 2, boxShadow: 1 }}
            className="p-3 mb-3 bg-white account_content"
          >
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Account;
