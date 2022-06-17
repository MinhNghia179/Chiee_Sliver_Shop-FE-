import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet';

import BreadcrumbsPage from 'components/BreadcrumbsPage';
import { ROUTER_NAME } from 'config/constants';
import ContactInfo from './components/ContactInfo';
import FormContact from './components/FormContact';
import MapShop from './components/MapShop';

const DataBreadcrumbs = [
  {
    name: 'Liên hệ',
    link: ROUTER_NAME.CONTACT,
    currentPage: true,
  },
];

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Liên hệ | Chiee Sliver</title>
      </Helmet>
      {/* --------------------------------------------------------- */}
      <BreadcrumbsPage data={DataBreadcrumbs} />
      <Box sx={{ borderRadius: 2, boxShadow: 1 }} className="my-3 p-3 bg-white">
        <h1 className="page_title">Liên hệ</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ContactInfo />
            <FormContact />
          </Grid>
          <Grid item xs={12} md={6}>
            <MapShop />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Contact;
