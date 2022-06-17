import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { useSelector } from 'setup';
import PopupContainer from 'containers/PopupContainer';
import { getListFavoriteAction } from 'setup/redux/favorite/FavoriteAction';
import { getListCategoryAction } from 'setup/redux/product/ProductAction';
import BottomMenu from './BottomMenu';
import Footer from './footer';
import Header from './header';

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user_info);

  useEffect(() => {
    dispatch(getListCategoryAction());
    dispatch(getListFavoriteAction({ user_id: userInfo?.id || 0 }));
  }, []);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, [location]);

  return (
    <PopupContainer>
      <Header />
      <div className="container" style={{ minHeight: 545 }}>
        <Outlet />
      </div>
      <Footer />
      <BottomMenu />
    </PopupContainer>
  );
};

export default Layout;
