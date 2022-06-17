import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';

import Cart from './Cart';
import User from './User';
import { ROUTER_NAME } from 'config/constants';

const HeaderTop = () => {
  const navigate = useNavigate();

  const handleKeyDown = (event: any) => {
    const value = event.target.value;

    if (event.key === 'Enter') {
      if (value) {
        navigate(`${ROUTER_NAME.PRODUCT}/tim-kiem/${value}`);
      } else {
        navigate(ROUTER_NAME.PRODUCT);
      }
    }
  };

  return (
    <div className="header_content_top d-flex">
      <div className="search flex-grow-1">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          onKeyDown={handleKeyDown}
        />
        <SearchIcon className="search_icon" />
      </div>
      <div className="d-flex item_info">
        <PhoneIcon />
        &ensp;
        <div>
          <span>Hotline:</span>
          <br />
          <span>000000xxxx</span>
        </div>
      </div>
      <div className="d-flex item_info">
        <StoreIcon />
        &ensp;
        <span style={{ width: 80 }}>Hệ thống của hàng</span>
      </div>
      <div className="item_info_user d-flex align-items-center">
        <User />
        <Cart />
      </div>
    </div>
  );
};

export default HeaderTop;
