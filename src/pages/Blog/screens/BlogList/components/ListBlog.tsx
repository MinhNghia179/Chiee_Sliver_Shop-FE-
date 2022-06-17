import BlogItemList     from "components/BlogItemList";
import Paging           from "components/Paging";
import { BlogModel }    from "models/blog/BlogModel";
import { useSelector }  from "setup";

interface IProps{
  page:number;
  handleChangePage: (event: React.ChangeEvent<unknown>,value: number) => void
}

const ListBlog = ({page,handleChangePage}:IProps) => {
  const blogs = useSelector((state) => state.blog.ListBlog);

  return (
    <div className="mb-3">
      {blogs.results.map((item: BlogModel, index: number) => (
        <BlogItemList data={item} isReverse={index % 2 !== 0}/>
      ))}
      <div className="d-flex justify-content-center">
        <Paging
          count={blogs.totalPage}
          page={page}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default ListBlog;
