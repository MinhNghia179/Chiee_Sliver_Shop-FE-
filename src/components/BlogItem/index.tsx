import { Box } from "@mui/material";
import { NO_IMAGE, ROUTER_NAME } from "config/constants";
import { BlogModel } from "models/blog/BlogModel";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { formatShortDescription, slug } from "utils";
import "./blog-item.style.scss";

interface IProps{
  data:BlogModel
}

const BlogItem = ({data}:IProps) => {
  const navigate = useNavigate();

  const goToBlogDetail = () => {
    navigate(`${ROUTER_NAME.BLOG}/${slug(data.name)}-${data.id}`)
  };

  const getDate = useCallback(() => {
    const created_at = new Date(data.created_at);
    return {
      day: created_at.getDay(),
      month:created_at.getMonth(),
      year:created_at.getFullYear()
    }
  },[data])

  return (
    <Box
      sx={{ borderRadius: 1, boxShadow: 1 }}
      className="blog_item_container bg-white"
      onClick={goToBlogDetail}
    >
      <div className="blog_item_head">
        <div className="created_at_label">
          <span className="day">{getDate().day}</span>
          <span>{getDate().month}/{getDate().year}</span>
        </div>
        <img
          alt="anh san pham"
          src={data.thumbnail || NO_IMAGE}
        />
      </div>
      <div className="blog_info p-3">
        <div className="blog_info_name">
          {formatShortDescription(data.name, 45)}
        </div>
        <div className="blog_info_description">
          {formatShortDescription(data.short_description, 80)}
        </div>
      </div>
    </Box>
  );
};

export default BlogItem;
