import { useState }           from "react";
import { useDispatch }        from "react-redux";

import { useSelector }        from "setup";
import { 
  createBlogCommentAction, 
  getListBlogCommentAction 
}                             from "setup/redux/blog/BlogAction";
import usePopup               from "setup/redux/usePopup";

interface IProps{
  blog_id:number;
}

const FormAddComment = ({blog_id}:IProps) => {
  const { openAuth } = usePopup();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user_info);
  const [content, setContent] = useState<string>("");

  const handleSendComment = (e: any) => {
    const value = e.target.value;
    if (e.key === "Enter") {
      if (userInfo) {
        setContent("");
        const payload = {
          user_id: userInfo.id,
          blog_id: blog_id,
          content: value,
        };
        dispatch(createBlogCommentAction(payload,(res:any)=>{
          if(res.status){
            dispatch(getListBlogCommentAction({blog_id}))
          }
        }))
      } else {
        openAuth();
      }
      e.preventDefault();
    }
  };

  return (
    <form className="form_add_comment">
      <input
        placeholder="Nhập bình luận..."
        value={content}
        onKeyPress={handleSendComment}
        onChange={(e: any) => setContent(e.target.value)}
      />
    </form>
  );
};

export default FormAddComment;
