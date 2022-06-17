import { Box, Skeleton }  from "@mui/material";

interface IProps {
  totalItem?: number;
}

const LoadingBlogList = ({totalItem = 9}:IProps) => {
  const list = Array.from(Array(totalItem).keys()).map((_, index) => ({id: index,}));

  return (
    <div>
      {
        list.map((item,index) => <BlogItem key={index} isReverse={index % 2 !== 0}/> )
      }
    </div>
  );
};

const BlogItem = ({isReverse}:any) => {
  return (
    <Box
      sx={{ borderRadius: 2, boxShadow: 1 }}
      className="p-3 my-3 bg-white"
    >
      <div className={`blog_item_list row d-flex ${isReverse && "flex-row-reverse"}`}>
        <div className="col-md-4">
          <Skeleton variant="rectangular" width={'100%'} height={200}/>
        </div>
        <div className="col-md-8 flex-grow-1">
          <Skeleton variant="text" height={60} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      </div>
    </Box>
  )
}

export default LoadingBlogList;
