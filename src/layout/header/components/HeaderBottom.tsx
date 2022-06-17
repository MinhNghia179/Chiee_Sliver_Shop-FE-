import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { ROUTER_NAME } from 'config/constants';
import { Link } from 'react-router-dom';
import { useSelector } from 'setup';
import MenuProductCategory from './MenuProductCategory';

const HeaderBottom = () => {
  const userInfo = useSelector((state) => state.auth.auth_info);

  return (
    <div className="header_content_bottom">
      <ul className="links">
        <li>
          <Link to={ROUTER_NAME.HOME}>Trang chủ</Link>
        </li>
        <li>
          <Link to={ROUTER_NAME.ABOUT}>Giới thiệu</Link>
        </li>
        <li>
          <Link to={ROUTER_NAME.BLOG}>Tin tức</Link>
        </li>
        <li>
          <Link to={ROUTER_NAME.CONTACT}>Liên hệ</Link>
        </li>
        <li>
          <Link to={ROUTER_NAME.PRODUCT}>
            Sản phẩm <ArrowDropDownOutlinedIcon />
          </Link>
          <MenuProductCategory />
        </li>
        {userInfo && (
          <li>
            <Link to={ROUTER_NAME.FAVORITE}>Yêu thích</Link>
          </li>
        )}
      </ul>
    </div>
  );
};
export default HeaderBottom;
