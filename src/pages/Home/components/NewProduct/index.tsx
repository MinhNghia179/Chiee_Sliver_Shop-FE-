import { Box, Grid }            from "@mui/material";
import { useDispatch }          from "react-redux";
import { useEffect, useState }  from "react";

import { useSelector }          from "setup";
import { getProductNewAction }  from "setup/redux/product/ProductAction";
import { ProductModel }         from "models/product/ProductModel";
import LoadingListProduct       from "components/Loading/LoadingListProduct";
import ProductItem              from "components/ProductItem";

const NewProduct = () => {
  const dispatch = useDispatch();
  const productNew = useSelector((state) => state.product.ListProductNew);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getProductNewAction({},() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }));
  }, [])

  return (
    <Box className="my-3 mt-4">
      <h5 className="mb-4">SẢN PHẨM MỚI</h5>
      <Grid container spacing={2}>
        {
          isLoading && <LoadingListProduct totalItem={4} colLg={3}/>
        }
        {!isLoading && productNew.results.map((item: ProductModel, index: number) => (
          <Grid item xs={12} md={4} lg={3} key={index}>
            <ProductItem data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewProduct;
