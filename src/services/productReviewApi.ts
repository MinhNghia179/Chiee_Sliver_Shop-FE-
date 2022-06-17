import client from ".";

export const createReviewAPI = (payload:any) => {
  return client.post('product-reviews',payload).then(res => res.data);
}