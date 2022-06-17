import { Grid } from "@mui/material";
import ProductItem from "components/ProductItem";
import { ProductModel } from "models/product/ProductModel";
import { useSelector } from "setup";
import NoFavorite from "./NoFavorite";

const ListFavorite = () => {
  const favorites = useSelector((state) => state.favorite.ListFavorite);

  if (!favorites.total) {
    return <NoFavorite />;
  }

  return (
    <Grid container spacing={2} className="mb-3">
      {favorites.results.map((favorite:ProductModel,index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ProductItem data={favorite} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListFavorite;
