import { IMAGE_DEFAULT, ROUTER_NAME } from "config/constants"
import { ProductCategoryModel } from "models/product/ProductCategoryModel"
import { useNavigate } from "react-router-dom"

interface IProps{
  data:ProductCategoryModel
}

const ItemCategory = ({data}:IProps) => {
  const navigate = useNavigate();

  const handleGoProductCategory = () => {
    navigate(`${ROUTER_NAME.PRODUCT_CATEGORY}/${data.code}-${data.id}`)
  }
  return (
    <div className="item_category" onClick={handleGoProductCategory}>
      <img src={data.thumbnail || IMAGE_DEFAULT} alt={data.name}/>
      <div className="text-center mt-1">{data.name}</div>
    </div>
  )
}

export default ItemCategory
