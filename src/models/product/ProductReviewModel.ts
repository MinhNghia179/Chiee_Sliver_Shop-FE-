export interface ProductReviewModel {
  id            : number;
  user_id       : number;
  product_id    : number;
  rate          : number;
  comment       : string;
  created_at    : string;
  status        : boolean;
  avatar        : string;
  first_name    : string;
  last_name     : string;
}