export interface ProductCategoryModel{
  id:number;
  name:string;
  code:string;
  thumbnail:string;
  status:boolean;
}

export interface ListProductCategoryModel{
  results:ProductCategoryModel[];
  total:number;
}