import { Box, Grid, Skeleton } from "@mui/material";

const LoadingBlogDetail = () => {
  return (
    <div className="mb-4">
      <Box sx={{ borderRadius: 2, boxShadow: 1 }} className="my-3 p-3 bg-white">
        <Skeleton variant="text" height={60} />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <div className="d-flex justify-content-center my-3">
          <Skeleton variant="rectangular" width={'70%'} height={350}/>
        </div>
        <Grid item xs={12} md={12}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
      </Box>
    </div>
  );
};

export default LoadingBlogDetail;
