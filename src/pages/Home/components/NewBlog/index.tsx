import { Box, Grid }            from "@mui/material";
import { useDispatch }          from "react-redux";
import { useEffect, useState }  from "react";

import { useSelector }          from "setup";
import { getListNewBlogAction } from "setup/redux/blog/BlogAction";
import { BlogModel }            from "models/blog/BlogModel";
import LoadingListProduct       from "components/Loading/LoadingListProduct";
import BlogItem                 from "components/BlogItem";

const NewBlog = () => {
  const dispatch = useDispatch();
  const newBlogs = useSelector((state) => state.blog.ListNewBlog);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getListNewBlogAction({},() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }));
  }, []);

  return (
    <Box className="my-3 mt-4">
      <h5 className="mb-4">BÀI VIẾT MỚI NHẤT</h5>
      <Grid container spacing={2}>
        {
          isLoading && <LoadingListProduct totalItem={4} colLg={3}/>
        }
        {!isLoading && newBlogs.results.map((item: BlogModel, index: number) => (
          <Grid key={index} item xs={12} md={4} lg={3}>
            <BlogItem data={item}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewBlog;
