import { Box } from "@mui/system";
import { Row } from "reactstrap";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";

const ProductOverview = () => {
  return (
    <>
      <Box
        sx={{ borderRadius: 2, boxShadow: 1 }}
        className="my-3 p-3 bg-white"
      >
        <Row className="product_overview">
          <div className="col-md-6">
            <ProductImages/>
          </div>
          <div className="col-md-6">
            <ProductInfo/>
          </div>
        </Row>
      </Box>
    </>
  );
};

export default ProductOverview;
