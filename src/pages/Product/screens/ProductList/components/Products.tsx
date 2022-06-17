import { useDispatch }                    from "react-redux";
import { useEffect, useMemo, useState }   from "react";
import { useLocation, useParams }         from "react-router-dom";
import { Grid }                           from "@mui/material";

import Paging                             from "components/Paging";
import ProductItem                        from "components/ProductItem";
import LoadingListProduct                 from "components/Loading/LoadingListProduct";
import NoResult                           from "./NoResult";
import { ProductModel }                   from "models/product/ProductModel";
import { convertLinkToId }                from "utils";
import { useSelector }                    from "setup";
import { 
  getListProductAction, 
  setOrderByAction 
}                                         from "setup/redux/product/ProductAction";
import { ROUTER_NAME }                    from "config/constants";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const products = useSelector((state) => state.product.ListProduct);
  const orderBy = useSelector((state) => state.product.OrderBy);
  const categories = useSelector((state) => state.product.ListProductCategory);
  const dispatch = useDispatch();
  const { categoryId, query } = useParams();
  const location = useLocation();

  useEffect(() => {
    dispatch(setOrderByAction('id desc'));
  },[]);

  useEffect(() => {
    let category_id = -1;
    let search:string = '';
    
    if (categoryId) {
      category_id = convertLinkToId(categoryId || "");
    }
    
    if(query){
      search = query.toString();
    }

    setLoading(true);
    const payload = {
      page: page - 1,
      pageSize: pageSize,
      category_id: category_id,
      query: search,
      order_by:orderBy
    };
    dispatch(
      getListProductAction(payload, () => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
    );
  }, [page, categoryId, query, orderBy]);

  const handleChangePage = ( event: React.ChangeEvent<unknown>, value: number ) => {
    setPage(value);
  };

  const getCategoryName = useMemo(() => {
    const path = location.pathname;
    const listPath = path.split("-");
    if(path.includes(ROUTER_NAME.PRODUCT_CATEGORY)){
      const categoryId = Number(listPath[listPath.length-1]);
      const dataFilter = categories.results.filter(element => element.id === categoryId);
      return `: ${dataFilter[0].name}`;
    }
    return "";
  }, [location]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h5 className="text_uppercase">{query ? `Kết quả tìm kiếm cho: '${query}'` : `TẤT CẢ SẢN PHẨM ${getCategoryName}`}</h5>
      </Grid>
      {loading ? <LoadingListProduct /> : !products.total && <NoResult />}
      {!loading && !!products.total && (
        <>
          {products.results.map((product: ProductModel) => (
            <Grid item xs={12} sm={6} md={4} key={product.id} >
              <ProductItem data={product}/>
            </Grid>
          ))}
          <Grid item xs={12}>
            <div className="d-flex justify-content-center">
              <Paging
                count={products.totalPage}
                page={page}
                handleChangePage={handleChangePage}
              />
            </div>
            
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Products;
