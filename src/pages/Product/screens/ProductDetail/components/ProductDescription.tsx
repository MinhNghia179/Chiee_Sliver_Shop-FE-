import { useSelector } from "setup";


const ProductDescription = () => {
  const productDetail = useSelector(state => state.product.ProductDetail);

  return (
    <div className="p-3">
      <div dangerouslySetInnerHTML={{__html:productDetail?.description||""}}/>
    </div>
  )
}

export default ProductDescription
