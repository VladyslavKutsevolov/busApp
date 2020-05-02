import React, { useEffect, useState } from 'react';
import Post from './Post';
import { FETCH_POSTS } from '../../context/types';
import { useData } from '../../context/localStateProvider';
import { useHttp } from '../../hooks/http.hook';
import Pagination from './Pagination';

export default function AllPosts({
  route,
  handleShow,
  getPostData,
  getSinglePost,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(3);
  const { request, loading } = useHttp();
  const { state, dispatch, undo, redo, isPast, isFuture } = useData();
  const { allPosts } = state.present;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  const fetchPostData = (id) => {
    getSinglePost(id);
    handleShow();
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      const data = await request('/api/posts');
      dispatch({ type: FETCH_POSTS, payload: data });
    };
    fetchAllPosts();
  }, [request, dispatch]);

  return (
    <div>
      <button disabled={!isPast} onClick={undo}>
        Undo
      </button>
      <button disabled={!isFuture} onClick={redo}>
        Redo
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Post
          posts={currentPosts}
          getPostData={getPostData}
          fetchPostData={fetchPostData}
          route={route}
          showEditForm={handleShow}
        />
      )}
      {/* <Pagination
         totalPosts={allPosts.length}
        postPerPage={postPerPage}
        paginate={paginate}
      /> */}
    </div>
  );
}
