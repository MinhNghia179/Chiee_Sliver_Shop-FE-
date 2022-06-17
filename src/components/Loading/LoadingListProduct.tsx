import { Box, Grid }        from "@mui/material";
import LoadingProductItem   from "./LoadingProductItem";

interface IProps {
  totalItem?: number;
  colLg?:number;
}

const LoadingListProduct = ({ totalItem = 9,colLg=4 }: IProps) => {
  const list = Array.from(Array(totalItem).keys()).map((_, index) => ({
    id: index,
  }));

  return (
    <>
      {list.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={colLg} key={item.id}>
          <Box sx={{ borderRadius: 1, boxShadow: 1 }} className="bg-white">
            <LoadingProductItem />
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default LoadingListProduct;
