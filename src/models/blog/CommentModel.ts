export interface CommentModel {
  id                : number;
  user_id           : number;
  blog_id           : number;
  content           : string;
  created_at        : string;
  modified_at       : string;
  status            : boolean;
  user_last_name    : string;
  user_first_name   : string;
  user_avatar       : string;
}

export interface ListCommentModel{
  results     : CommentModel[];
  total       : number;
  currentPage : number;
  totalPage   : number;
}
