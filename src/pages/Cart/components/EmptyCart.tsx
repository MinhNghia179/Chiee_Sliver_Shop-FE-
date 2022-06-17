import { ROUTER_NAME } from 'config/constants';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="mb-4">
        Không có sản phẩm nào. Quay lại{' '}
        <b>
          <Link to={ROUTER_NAME.PRODUCT}>cửa hàng</Link>
        </b>{' '}
        để tiếp tục mua sắm.
      </div>
    </div>
  );
};

export default EmptyCart;
