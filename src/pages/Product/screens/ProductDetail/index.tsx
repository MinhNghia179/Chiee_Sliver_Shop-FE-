import './product-detail.style.scss';
import BreadcrumbsPage from 'components/BreadcrumbsPage';
import { ROUTER_NAME } from 'config/constants';
import { Helmet } from 'react-helmet';
import ProductOverview from './components/ProductOverview';
import Detail from './components/Detail';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductDetailAction } from 'setup/redux/product/ProductAction';
import LoadingProductDetail from 'components/Loading/LoadingProductDetail';
import { useSelector } from 'setup';
import { formatShortDescription, slug } from 'utils';

const DefaultDataBreadcrumbs = [
  {
    name: 'Sản phẩm',
    link: ROUTER_NAME.PRODUCT,
    currentPage: false,
  },
  {
    name: 'Chi tiết sản phẩm',
    link: ROUTER_NAME.PRODUCT,
    currentPage: true,
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const product = useSelector((state) => state.product.ProductDetail);
  const [dataBreadcrumbs, setDataBreadcrumbs] = useState(
    DefaultDataBreadcrumbs
  );

  const getProduct = () => {
    if (typeof id === 'string') {
      setLoading(true);
      const idProduct = id.slice(id.lastIndexOf('-') + 1, id.length);
      dispatch(
        getProductDetailAction(Number(idProduct), () => {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
      );
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const newDataBreadcrumbs = [...dataBreadcrumbs];
    newDataBreadcrumbs[1].name = formatShortDescription(
      product?.name || '',
      30
    );
    newDataBreadcrumbs[1].link =
      ROUTER_NAME.PRODUCT + '/' + slug(product?.name || '') + '-' + product?.id;
    setDataBreadcrumbs(newDataBreadcrumbs);
  }, [product]);

  return (
    <>
      <Helmet>
        <title>
          {product?.name ? product.name : 'Sản phẩm'} | Chiee Sliver
        </title>
      </Helmet>
      {/* --------------------------------------------------------- */}
      <BreadcrumbsPage data={dataBreadcrumbs} />
      {loading ? (
        <LoadingProductDetail />
      ) : (
        <>
          <ProductOverview />
          <Detail />
        </>
      )}
    </>
  );
};

export default ProductDetail;
