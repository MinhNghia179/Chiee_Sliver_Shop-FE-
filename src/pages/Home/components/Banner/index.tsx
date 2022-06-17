import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './banner.style.scss';
const Banner = () => {
  return (
    <div className="banner_content my-3">
      <Carousel
        className="banner_content_carousel"
        autoPlay={true}
        showThumbs={false}
        showIndicators={true}
        infiniteLoop
      >
        <div>
          <img alt="banner" src="images/banner/banner1.png" />
        </div>
        <div>
          <img alt="banner" src="images/banner/banner2.png" />
        </div>
        <div>
          <img alt="banner" src="images/banner/banner3.png" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
