import BackToTop from "./components/BackToTop";
import FooterBottom from "./components/FooterBottom";
import FooterMain from "./components/FooterMain";
import "./footer.style.scss";

const Footer = () => {
  return (
    <div className="footer">
      <BackToTop/>
      <FooterMain />
      <FooterBottom />
    </div>
  );
};

export default Footer;
