import './home.style.scss';
import { Helmet } from 'react-helmet';
import usePopup from 'setup/redux/usePopup';
import Banner from './components/Banner';
import ProductCategory from './components/ProductCategory';
import BestSelling from './components/BestSelling';
import NewProduct from './components/NewProduct';
import NewBlog from './components/NewBlog';

const Home = () => {
  const { openAuth } = usePopup();

  return (
    <>
      <Helmet>
        <title>Trang chủ | Chiee Sliver</title>
      </Helmet>
      <Banner />
      <ProductCategory />
      <BestSelling />
      <NewProduct />
      <NewBlog />
    </>
  );
};

export default Home;
