import ClearIcon from "@mui/icons-material/Clear";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { useSelector } from "setup";
import { useNavigate } from "react-router-dom";
import { ROUTER_NAME } from "config/constants";
import { ProductCategoryModel } from "models/product/ProductCategoryModel";

interface IProps {
  onClose: () => void;
}
const ProductCategoryDrawer = ({ onClose }: IProps) => {
  const navigate = useNavigate();
  const productCategories = useSelector(
    (state) => state.product.ListProductCategory
  );

  const goToCategory = (category:ProductCategoryModel) =>{
    onClose();
    navigate(`${ROUTER_NAME.PRODUCT_CATEGORY}/${category.code}-${category.id}`);
  }

  return (
    <div className="product_category_drawer">
      <div className="product_category_drawer_header">
        <h5>Danh mục sản phẩm</h5>
        <button onClick={onClose}>
          <ClearIcon />
        </button>
      </div>
      <Divider />
      <div className="mt-2">
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {productCategories.results.map((category) => (
            <ListItem onClick={() => goToCategory(category)}>
              <ListItemAvatar>
                <Avatar>
                  {category.thumbnail ? <img src={category.thumbnail} width={80} height={80}/> : <ImageIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default ProductCategoryDrawer;
