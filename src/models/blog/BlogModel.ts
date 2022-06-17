export interface BlogModel {
  id                :number;
  name              :string;
  thumbnail         :string;
  short_description :string;
  content           :string;
  created_at        :string;
  created_by        :string;
  modified_at       :string;
  modified_by       :string;
  status            :boolean;
}

export interface ListBlogModel {
  results     : BlogModel[];
  total       : number;
  currentPage : number;
  totalPage   : number;
}
