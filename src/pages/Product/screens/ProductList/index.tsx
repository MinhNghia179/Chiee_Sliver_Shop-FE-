import './product-list.style.scss';
import { Helmet } from 'react-helmet';
import BreadcrumbsPage from 'components/BreadcrumbsPage';
import { ROUTER_NAME } from 'config/constants';
import { Box } from '@mui/system';
import LeftSidebar from './components/LeftSidebar';
import Products from './components/Products';
import ButtonFilter from './components/ButtonFilter';

const DataBreadcrumbs = [
  {
    name: 'Sản phẩm',
    link: ROUTER_NAME.PRODUCT,
    currentPage: true,
  },
];

const ProductList = () => {
  return (
    <>
      <Helmet>
        <title>Sản phẩm | Chiee Sliver</title>
      </Helmet>
      {/* --------------------------------------------------------- */}
      <ButtonFilter />
      <BreadcrumbsPage data={DataBreadcrumbs} />
      <div className="product_list my-3 p-3">
        <div className="product_list_content d-flex">
          <div className="left_sidebar">
            <LeftSidebar />
          </div>
          <div className="flex-grow-1">
            <Products />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
