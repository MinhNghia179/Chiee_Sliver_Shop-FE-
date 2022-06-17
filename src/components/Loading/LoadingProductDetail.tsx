import { Box, Grid, Skeleton } from "@mui/material";

const LoadingProductDetail = () => {
  return (
    <div className="mb-4">
      <Box sx={{ borderRadius: 2, boxShadow: 1 }} className="my-3 p-3 bg-white">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width={"100%"} height={350} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ borderRadius: 2, boxShadow: 1 }} className="my-3 p-3 bg-white">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LoadingProductDetail;
