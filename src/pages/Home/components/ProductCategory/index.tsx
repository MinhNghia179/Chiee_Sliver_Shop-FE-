import "./product-category.style.scss";
import { Box } from "@mui/material";
import ItemCategory from "./components/ItemCategory";
import { useSelector } from "setup";
import { ProductCategoryModel } from "models/product/ProductCategoryModel";

const data = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

const ProductCategory = () => {
  const productCategories = useSelector(state => state.product.ListProductCategory);

  return (
    <Box
      sx={{ borderRadius: 2, boxShadow: 1 }}
      className="product-category my-3 p-3 bg-white"
    >
      <h5 className="mb-4">DANH MỤC SẢN PHẨM</h5>
      <div className="list_category">
        {productCategories.results.map((category:ProductCategoryModel) => <ItemCategory key={category.id} data={category}/>)}
      </div>
    </Box>
  );
};

export default ProductCategory;
