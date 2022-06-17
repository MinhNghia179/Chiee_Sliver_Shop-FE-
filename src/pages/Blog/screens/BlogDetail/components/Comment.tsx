import { Box } from "@mui/material";
import LoadingBlogComment from "components/Loading/LoadingBlogComment";
import { CommentModel, ListCommentModel } from "models/blog/CommentModel";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "setup";
import { getListBlogCommentAction } from "setup/redux/blog/BlogAction";
import CommentItem from "./CommentItem";
import EmptyComment from "./EmptyComment";
import FormAddComment from "./FormAddComment";

const Comment = () => {
  const dispatch = useDispatch();
  const listComment = useSelector((state) => state.blog.ListComment);
  const blogDetail = useSelector((state) => state.blog.BlogDetail);
  const [loadingComment, setLoadingComment] = useState(true);

  useEffect(() => {
    const payload = {
      blog_id: blogDetail?.id || 0,
      page: 0,
      pageSize: 5,
    };
    setLoadingComment(true);
    dispatch(
      getListBlogCommentAction(payload, () => {
        setTimeout(() => {
          setLoadingComment(false);
        }, 1000);
      })
    );
  }, [blogDetail]);

  return (
    <>
      {
        loadingComment 
        ? <LoadingBlogComment /> 
        : (
          <Box sx={{ borderRadius: 2, boxShadow: 1 }} className="my-3 p-3 bg-white">
            <h4>Bình luận</h4>
            <FormAddComment blog_id={blogDetail?.id || 0} />
            {!listComment?.total && <EmptyComment />}
            {(listComment?.results || []).map((item: CommentModel, index) => (
              <CommentItem key={index} data={item} />
            ))}
          </Box>
        )
      }
    </>
  );
};

export default Comment;
