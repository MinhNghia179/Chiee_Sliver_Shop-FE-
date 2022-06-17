import { BlogModel, ListBlogModel } from "models/blog/BlogModel";
import { ListCommentModel } from "models/blog/CommentModel";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { EBlogType } from "./BlogAction";

interface IBlogState {
  ListBlog       : ListBlogModel;
  ListNewBlog    : ListBlogModel;
  BlogDetail    ?: BlogModel;
  ListComment   ?: ListCommentModel;
}
export const initialBlogState: IBlogState = {
  ListBlog: {
    results: [],
    total: 0,
    currentPage: 0,
    totalPage: 0,
  },
  ListNewBlog: {
    results: [],
    total: 0,
    currentPage: 0,
    totalPage: 0,
  },
};

const BlogReducer = persistReducer(
  {
    storage,
    key: "blog",
    whitelist: ["ListBlog","ListNewBlog"],
    blacklist:["BlogDetail","ListComment"]
  },
  (state: IBlogState = initialBlogState, action: any) => {
    switch (action.type) {
      case EBlogType.SET_LIST_BLOG: {
        return { ...state, ListBlog: action.payload };
      }
      case EBlogType.SET_BLOG_DETAIL: {
        return { ...state, BlogDetail: action.payload };
      }
      case EBlogType.SET_LIST_BLOG_COMMENT: {
        return { ...state, ListComment: action.payload };
      }
      case EBlogType.SET_LIST_NEW_BLOG: {
        return { ...state, ListNewBlog: action.payload };
      }
      default:
        return state;
    }
  }
);
export default BlogReducer;
