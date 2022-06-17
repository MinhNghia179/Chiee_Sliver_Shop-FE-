import { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import useToggle from 'setup/redux/useToggle';
import AuthPopup from 'containers/Auth';
import ProductReviewPopup from 'containers/ProductReviewPopup';
import { OrderDetailModel } from 'models/order/OrderDetailModel';
import ForgotPasswordPopup from 'containers/ForgotPassword';
interface IContext {
  closeAuth: () => void;
  openAuth: () => void;
}

export const PopupContext = createContext<IContext | any>({});

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const PopupContainer = ({ children }: IProps) => {
  const dispatch = useDispatch();
  const [isShowAuth, closeAuth, openAuth] = useToggle();
  const [isShowForgotPassword, closeForgotPassword, openForgotPassword] =
    useToggle();
  const [isShowProductReview, closeProductReview, openProductReview] =
    useToggle();

  const [selectedTab, setSelectedTab] = useState(0);
  const [dataProductReview, setDataProductReview] = useState<
    OrderDetailModel[] | null
  >(null);

  const handleOpenAuth = (tab = 0) => {
    openAuth();
    setSelectedTab(tab);
  };

  const handleCloseAuth = () => {
    closeAuth();
  };

  const handleOpenForgotPassword = () => {
    openForgotPassword();
  };

  const handleCloseForgotPassword = () => {
    closeForgotPassword();
  };

  const handleOpenProductReview = (orderDetail: OrderDetailModel[]) => {
    setDataProductReview(orderDetail);
    openProductReview();
  };

  const handleCloseProductReview = () => {
    closeProductReview();
  };

  const value = {
    closeAuth: handleCloseAuth,
    openAuth: handleOpenAuth,
    closeForgotPassword: handleCloseForgotPassword,
    openForgotPassword: handleOpenForgotPassword,
    dataProductReview: dataProductReview,
    openProductReview: handleOpenProductReview,
    closeProductReview: handleCloseProductReview,
  };

  return (
    <PopupContext.Provider value={value}>
      {isShowAuth && <AuthPopup isOpen={isShowAuth} onHide={handleCloseAuth} />}
      {isShowForgotPassword && (
        <ForgotPasswordPopup
          isOpen={isShowForgotPassword}
          onHide={closeForgotPassword}
        />
      )}
      {isShowProductReview && (
        <ProductReviewPopup
          isOpen={isShowProductReview}
          onHide={handleCloseProductReview}
        />
      )}
      <ToastContainer />
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContainer;
