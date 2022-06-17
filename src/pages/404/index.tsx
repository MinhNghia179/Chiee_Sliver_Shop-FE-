import { Box } from "@mui/material";
import { ROUTER_NAME } from "config/constants";
import { Link } from "react-router-dom";
import "./not-found.style.scss";

const NotFound = () => {
  return (
    <>
      <Box
        sx={{ borderRadius: 2, boxShadow: 1 }}
        className="my-3 p-3 bg-white"
      >
        <section className="page_404 my-3">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 ">
                <div className="col-sm-12 col-sm-offset-1  text-center">
                  <div className="four_zero_four_bg">
                    <h1 className="text-center ">404</h1>
                  </div>

                  <div className="contant_box_404">
                    <h3 className="h2">Xin lỗi</h3>
                    <p>Trang bạn đang tìn kiếm không có!</p>
                    <Link to={ROUTER_NAME.HOME} className="link_404">
                      Trang chủ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Box>
    </>
  );
};

export default NotFound;
