import { Grid } from '@mui/material';
import { ICON_PAYMENT_METHODS, ICON_SOCIAL } from 'config/constants';
import { Row } from 'reactstrap';

const FooterMain = () => {
  return (
    <div className="footer_main">
      <div className="container">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3}>
            <h5>Hỗ trợ khánh hàng</h5>
            <div className="footer_menu">
              <a href="#">Các câu hỏi thường gặp</a>
              <a href="#">Gửi yêu cầu hỗ trợ</a>
              <a href="#">Hướng dẫn đặt hàng</a>
              <a href="#">Phương thức vận chuyển</a>
              <a href="#">Giới thiệu Chiee Sliver</a>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <h5>Chính sách Chiee Sliver</h5>
            <div className="footer_menu">
              <a href="#">Chính sách bảo mật thanh toán</a>
              <a href="#">Chính sách bảo mật thông tin</a>
              <a href="#">Chính sách giải quyết khiếu nại</a>
              <a href="#">Chính sách đổi trả hàng</a>
              <a href="#">Chính sách bảo hành</a>
              <a href="#">Điều khoản sử dụng</a>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <h5>Kết nối với chúng tôi</h5>
            <div>
              <div className="footer_social">
                <img src={ICON_SOCIAL.FB} width={32} height={32} />
                <img src={ICON_SOCIAL.TW} width={32} height={32} />
                <img src={ICON_SOCIAL.INS} width={32} height={32} />
                <img src={ICON_SOCIAL.YT} width={32} height={32} />
                <img src={ICON_SOCIAL.SHOPPE} width={32} height={32} />
                <img src={ICON_SOCIAL.LAZADA} width={32} height={32} />
              </div>
              <div className="mt-4">
                <p>Phương thức thanh toán</p>
                <div className="footer_payment">
                  <img src={ICON_PAYMENT_METHODS.PAYPAL} />
                  <img src={ICON_PAYMENT_METHODS.VISA} />
                  <img src={ICON_PAYMENT_METHODS.MASTER_CARD} />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <h5>Thông tin liên hệ</h5>
            <div>
              <b>Địa chỉ:</b> Cầu Giấy, Hà Nội
            </div>
            <div>
              <b>Email:</b> ChieeSliver@gmail.com
            </div>
            <div>
              <b>Hotline:</b> 000000000xxx
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default FooterMain;
