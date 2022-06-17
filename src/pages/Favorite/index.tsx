import BreadcrumbsPage from 'components/BreadcrumbsPage';
import { ROUTER_NAME } from 'config/constants';
import { Helmet } from 'react-helmet';
import ListFavorite from './components/ListFavorite';

const DataBreadcrumbs = [
  {
    name: 'Yêu thích',
    link: ROUTER_NAME.FAVORITE,
    currentPage: true,
  },
];

const Favorite = () => {
  return (
    <>
      <Helmet>
        <title>Yêu thích | Chiee Sliver</title>
      </Helmet>
      {/* --------------------------------------------------------- */}
      <BreadcrumbsPage data={DataBreadcrumbs} />
      <h1 className="page_title my-3">Sản phẩm yêu thích</h1>
      <ListFavorite />
    </>
  );
};

export default Favorite;
