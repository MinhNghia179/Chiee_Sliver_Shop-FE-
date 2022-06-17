import { Box, Grid }                    from "@mui/material";
import { useEffect, useState }          from "react";
import { useDispatch }                  from "react-redux";

import { useSelector }                  from "setup";
import { getProductBestSellingAction }  from "setup/redux/product/ProductAction";
import { ProductModel }                 from "models/product/ProductModel";
import ProductItem                      from "components/ProductItem";
import LoadingListProduct               from "components/Loading/LoadingListProduct";

const BestSelling = () => {
  const dispatch = useDispatch();
  const productBestSelling = useSelector(state => state.product.ListProductBestSelling);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getProductBestSellingAction({},() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }));
  }, [])

  return (
    <Box className="my-3 mt-4">
      <h5 className="mb-4">SẢN PHẨM BÁN CHẠY</h5>
      <Grid container spacing={2}>
        {
          isLoading && <LoadingListProduct totalItem={4} colLg={3}/>
        }
        {!isLoading && productBestSelling.results.map((item: ProductModel, index: number) => (
          <Grid item xs={12} md={4} lg={3} key={index}>
            <ProductItem data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestSelling;
