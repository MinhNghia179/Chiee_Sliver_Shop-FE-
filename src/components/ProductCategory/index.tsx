import { ROUTER_NAME } from "config/constants";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "setup";
import "./product-category.style.scss";
import {convertLinkToId} from "utils"

const ProductCategory = () => {
  const productCategories = useSelector(
    (state) => state.product.ListProductCategory
  );
  const [active,setActive] = useState<number>(-1);
  const location = useLocation();

  useEffect(() => {
    const routersName = location.pathname.split("/");
    if(ROUTER_NAME.PRODUCT_CATEGORY === `/${routersName[1]}`){
      setActive(convertLinkToId(routersName[2]?routersName[2]:""))
    }
  }, [location])

  return (
    <div className="product_category">
      <ul>
        {productCategories.results.map((category) => (
          <li className={active === category.id ? "active":""}>
            <Link to={`${ROUTER_NAME.PRODUCT_CATEGORY}/${category.code}-${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategory;
