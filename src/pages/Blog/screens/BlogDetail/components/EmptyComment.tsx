import ImgEmptyComment from "assets/images/empty-comment.png";

const EmptyComment = () => {
  return (
    <div className="d-flex flex-column align-items-center my-4">
      <div>
        <img src={ImgEmptyComment} />
      </div>
      <h5>Chưa có bình luận</h5>
    </div>
  );
};

export default EmptyComment;
