import { Box, Skeleton } from "@mui/material";

const LoadingProductItem = () => {
  return (
    <>
      <Skeleton variant="rectangular" width={"100%"} height={300} />
      <Box sx={{ pt: 0.5, padding:1 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </>
  );
};

export default LoadingProductItem;
