import client from ".";

export const productCategoriesAPI = () => {
  return client.get("product-category").then((res) => res.data);
};


