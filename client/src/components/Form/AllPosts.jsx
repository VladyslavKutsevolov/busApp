import React, { useEffect } from "react";
import Post from "./Post";
import { LOADING, ERROR, FETCH_POSTS } from "../../context/types";
import { useData } from "../../context/localStorage";

export default function AllPosts({
  route,
  handleShow,
  getPostData,
  getSinglePost
}) {
  const { state, dispatch } = useData();
  const { loading, data } = state;
  const { allPosts } = data;

  const fetchAllPosts = async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      dispatch({
        type: FETCH_POSTS,
        payload: { allPosts: data, allRoutes: state.data.allRoutes }
      });
    } catch (error) {
      dispatch({ type: ERROR, payload: { error } });
    }
  };

  const fetchPostData = (id) => {
    getSinglePost(id);
    handleShow();
  };

  useEffect(() => {
    dispatch(fetchAllPosts);
  }, []);

  console.log(state);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Post
          posts={allPosts}
          getPostData={getPostData}
          fetchPostData={fetchPostData}
          route={route}
          showEditForm={handleShow}
        />
      )}
    </div>
  );
}
