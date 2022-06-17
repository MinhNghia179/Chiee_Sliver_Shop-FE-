import { Box } from '@mui/material';
import aboutImage1 from 'assets/images/about-image-1.jpg';
import aboutImage2 from 'assets/images/about-image-2.jpg';
import BreadcrumbsPage from 'components/BreadcrumbsPage';
import { ROUTER_NAME } from 'config/constants';
import { Helmet } from 'react-helmet';
import './about.style.scss';

const DataBreadcrumbs = [
  {
    name: 'Giới thiệu',
    link: ROUTER_NAME.ABOUT,
    currentPage: true,
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>Giới thiệu | Chiee Sliver</title>
      </Helmet>
      {/* --------------------------------------------------------- */}
      <BreadcrumbsPage data={DataBreadcrumbs} />
      <Box sx={{ borderRadius: 2, boxShadow: 1 }} className="my-3 p-5 bg-white">
        <div className="section">
          <article className="content">
            <h1>Chiee Sliver</h1>
            <p>
              Từ những thiết kế được chăm chút phức tạp đến những tác phẩm mang
              đậm tính thực vật học, mỗi tác phẩm đều thể hiện được vẻ đẹp của
              thế giới tự nhiên.
            </p>
          </article>
          <article className="img-container">
            <img src={aboutImage1} alt="nice table" className="main-img" />
            <img
              src={aboutImage2}
              alt="person working"
              className="accent-img"
            />
          </article>
        </div>
      </Box>
    </>
  );
};

export default About;
