import ProductCategory from 'components/ProductCategory';
import CheckSortPrice from './CheckSortPrice';
import FilterPriceRange from './FilterPriceRange';

const LeftSidebar = () => {
  return (
    <div>
      <h5>BỘ LỌC SẢN PHẨM</h5>
      <CheckSortPrice />
      <FilterPriceRange />
      <div className="mt-3">
        <h6>Danh mục</h6>
        <ProductCategory />
      </div>
    </div>
  );
};

export default LeftSidebar;
