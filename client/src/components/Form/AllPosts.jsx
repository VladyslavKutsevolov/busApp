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
  showEditForm,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(3);
  const { request, loading } = useHttp();
  const { state, dispatch, undo, redo, isPast, isFuture } = useData();
  const { allPosts } = state.present;

  const filteredByRouteName = allPosts.filter((post) => post.route === route);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filteredByRouteName.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const paginate = (pageNum) => setCurrentPage(pageNum);

  const fetchPostData = (id) => {
    getSinglePost(id);
    showEditForm(true);
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
      {currentPosts && (
        <div className="flex justify-center">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-1"
            disabled={!isPast}
            onClick={undo}
          >
            Undo
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            disabled={!isFuture}
            onClick={redo}
          >
            Redo
          </button>
        </div>
      )}
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
      <Pagination
        totalPosts={filteredByRouteName.length}
        postPerPage={postPerPage}
        paginate={paginate}
      />
    </div>
  );
}
