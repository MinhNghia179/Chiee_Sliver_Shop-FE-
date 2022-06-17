import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "setup";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ROUTER_NAME } from "config/constants";

const MenuProductCategory = () => {
  const productCategories = useSelector(
    (state) => state.product.ListProductCategory
  );

  return (
    <ul>
      <Box sx={{ borderRadius: 2, boxShadow: 1 }} className="bg-white py-2">
        <span className="drop_menu">
          <ArrowDropUpIcon sx={{
            fontSize:50
          }}/>
        </span>
        {productCategories.results.map((item) => (
          <li>
            <Link to={`${ROUTER_NAME.PRODUCT_CATEGORY}/${item.code}-${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </Box>
    </ul>
  );
};

export default MenuProductCategory;
