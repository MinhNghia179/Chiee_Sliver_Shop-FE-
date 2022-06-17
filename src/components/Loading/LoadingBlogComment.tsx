import { Box, Skeleton } from "@mui/material";

interface IProps {
  totalItem?: number;
}

const LoadingBlogComment = ({ totalItem = 3 }: IProps) => {
  const list = Array.from(Array(totalItem).keys()).map((_, index) => ({id: index,}));

  return (
    <div className="mb-4">
      <Box sx={{ borderRadius: 2, boxShadow: 1 }} className="my-3 p-3 bg-white">
        {
          list.map(item => <CommentItem key={item.id}/>)
        }
      </Box>
    </div>
  );
};

const CommentItem = () => {
  return (
    <div className="d-flex mb-4">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-grow-1 m_l_10">
        <Skeleton variant="text" width={"20%"} />
        <Skeleton variant="text" height={50} />
      </div>
    </div>
  );
};

export default LoadingBlogComment;
