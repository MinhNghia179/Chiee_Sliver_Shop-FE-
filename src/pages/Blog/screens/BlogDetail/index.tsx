import './blog-detail.style.scss';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import BreadcrumbsPage from 'components/BreadcrumbsPage';
import { ROUTER_NAME } from 'config/constants';
import { useSelector } from 'setup';
import { getBlogDetailAction } from 'setup/redux/blog/BlogAction';
import { convertDate, formatShortDescription, slug } from 'utils';
import Comment from './components/Comment';
import LoadingBlogDetail from 'components/Loading/LoadingBlogDetail';

const DefaultDataBreadcrumbs = [
  {
    name: 'Tin tức',
    link: ROUTER_NAME.BLOG,
    currentPage: false,
  },
  {
    name: 'Chi tiết bài viết',
    link: ROUTER_NAME.PRODUCT,
    currentPage: true,
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogDetail = useSelector((state) => state.blog.BlogDetail);
  const [dataBreadcrumbs, setDataBreadcrumbs] = useState(
    DefaultDataBreadcrumbs
  );
  const [loadingBlogDetail, setLoadingBlogDetail] = useState(true);

  const getBlogDetail = () => {
    if (typeof id === 'string') {
      const idBlog = id.slice(id.lastIndexOf('-') + 1, id.length);
      setLoadingBlogDetail(true);
      dispatch(
        getBlogDetailAction(Number(idBlog), () => {
          setTimeout(() => {
            setLoadingBlogDetail(false);
          }, 1000);
        })
      );
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, []);

  useEffect(() => {
    const newDataBreadcrumbs = [...dataBreadcrumbs];
    newDataBreadcrumbs[1].name = formatShortDescription(
      blogDetail?.name || '',
      30
    );
    newDataBreadcrumbs[1].link = `${ROUTER_NAME.BLOG}/${slug(
      blogDetail?.name || ''
    )}-${blogDetail?.id}`;
    setDataBreadcrumbs(newDataBreadcrumbs);
  }, [blogDetail]);

  return (
    <>
      <Helmet>
        <title>
          {blogDetail?.name ? blogDetail.name : 'Bài viết'} | Chiee Sliver
        </title>
      </Helmet>
      {/* --------------------------------------------------------- */}
      <BreadcrumbsPage data={dataBreadcrumbs} />

      {loadingBlogDetail ? (
        <LoadingBlogDetail />
      ) : (
        <Box
          sx={{ borderRadius: 2, boxShadow: 1 }}
          className="my-3 p-3 bg-white"
        >
          <h4>{blogDetail?.name}</h4>
          <p>
            Đăng bởi: {blogDetail?.created_by} lúc{' '}
            {convertDate(blogDetail?.created_at || '')}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: blogDetail?.content || '' }}
          />
        </Box>
      )}
      <Comment />
    </>
  );
};

export default BlogDetail;
