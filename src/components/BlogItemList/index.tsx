import "./blog-item-list.style.scss";
import { Box }                from "@mui/material";
import { Link, useNavigate }  from "react-router-dom";

import { IMAGE_DEFAULT }      from "config/constants";
import { BlogModel }          from "models/blog/BlogModel";
import { convertDate, slug }  from "utils";

interface IProps {
  data: BlogModel;
  isReverse?: boolean;
}

const BlogItemList = ({ data, isReverse = false }: IProps) => {
  const navigate = useNavigate();

  const handleGoDetail = () => {
    navigate(`${slug(data.name)}-${data.id}`);
  };

  return (
    <Box
      sx={{ borderRadius: 2, boxShadow: 1 }}
      className="p-3 my-3 bg-white"
      onClick={handleGoDetail}
    >
      <div className={`blog_item_list row d-flex ${isReverse && "flex-row-reverse"}`}>
        <div className="col-md-4">
          <img src={data.thumbnail || IMAGE_DEFAULT} />
        </div>
        <div className="col-md-8 flex-grow-1">
          <div>
            <Link to={`${slug(data.name)}-${data.id}`}>
              <h3>{data.name}</h3>
            </Link>
          </div>
          <div className="text-secondary mb-2">
            <span>Đăng ngày : {convertDate(data.created_at)}</span> | <span>Tác giả : {data.created_by}</span>
          </div>
          <div>{data.short_description}</div>
        </div>
      </div>
    </Box>
  );
};

export default BlogItemList;
