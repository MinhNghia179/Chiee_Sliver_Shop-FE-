import './header.style.scss';
import { useNavigate } from 'react-router-dom';

import HeaderBottom from './components/HeaderBottom';
import HeaderTop from './components/HeaderTop';
import LOGO from 'assets/images/logoV2.png';
import { ROUTER_NAME } from 'config/constants';

const Header = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate(ROUTER_NAME.HOME);
  };

  return (
    <div className="header">
      <div className="container header_content">
        <div>
          <img alt="logo" src={LOGO} className="img_logo" onClick={goToHome} />
        </div>
        <div className="flex-grow-1 header_content_right">
          <HeaderTop />
          <HeaderBottom />
        </div>
      </div>
    </div>
  );
};

export default Header;
