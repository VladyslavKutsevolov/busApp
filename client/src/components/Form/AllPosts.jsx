import React from "react";
import Post from "./Post";

export default function AllPosts({
  posts,
  route,
  show,
  handleClose,
  handleShow,
  postData,
  getPostData,
  getSinglePost
}) {
  const fetchPostData = id => {
    getSinglePost(id);
    handleShow();
  };
  return (
    <div>
      <Post
        posts={posts}
        getPostData={getPostData}
        fetchPostData={fetchPostData}
        route={route}
        showEditForm={handleShow}
      />
    </div>
  );
}
