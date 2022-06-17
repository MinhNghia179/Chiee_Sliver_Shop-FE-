import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "setup";
import { ProductImageModel } from "models/product/ProductModel";

const ProductImages = () => {
  const product = useSelector((state) => state.product.ProductDetail);
  const [images, setImages] = useState<ProductImageModel[]>([]);

  useEffect(() => {
    setImages(JSON.parse(product?.list_image || "[]"));
  }, [product]);

  return (
    <div className="product_images">
      <Carousel
        className="list_image"
        autoPlay={true}
        showIndicators={true}
        infiniteLoop
      >
        {images.map((item) => (
          <div key={item.id}>
            <img alt="product-image" src={item.url} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductImages;
