import React, { useState } from "react";
import Post from "./Post";
import { EditPostForm } from "./EditPostForm";
import { useData } from "../../context/localStorage";

export default function AllPosts({
  posts,
  route,
  show,
  handleClose,
  handleShow
}) {
  const [postData, getPostData] = useState();
  const { getSinglePost } = useData();

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
      {show && postData && (
        <EditPostForm
          postData={postData}
          closeModal={handleClose}
          show={show}
        />
      )}
    </div>
  );
}
