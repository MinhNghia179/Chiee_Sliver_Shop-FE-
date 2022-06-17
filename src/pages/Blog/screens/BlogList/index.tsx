import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';

import BreadcrumbsPage from 'components/BreadcrumbsPage';
import LoadingBlogList from 'components/Loading/LoadingBlogList';
import ListBlog from './components/ListBlog';
import { ROUTER_NAME } from 'config/constants';
import { getListBlogAction } from 'setup/redux/blog/BlogAction';

const DataBreadcrumbs = [
  {
    name: 'Bài viết',
    link: ROUTER_NAME.BLOG,
    currentPage: true,
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const payload = {
      page: page - 1,
      pageSize: 9,
    };
    setIsLoading(true);
    window.scroll(0, 0);
    dispatch(
      getListBlogAction(payload, () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
    );

    return () => {
      setIsLoading(false);
    };
  }, [page]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
      <Helmet>
        <title>Tin tức | Chiee Sliver</title>
      </Helmet>
      {/* --------------------------------------------------------- */}
      <BreadcrumbsPage data={DataBreadcrumbs} />
      {isLoading ? (
        <LoadingBlogList totalItem={5} />
      ) : (
        <ListBlog page={page} handleChangePage={handleChangePage} />
      )}
    </>
  );
};

export default BlogList;
