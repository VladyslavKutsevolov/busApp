import React, { useState } from "react";
import Post from "./Post";
import { EditPostForm } from "./EditPostForm";
import { useData } from "../../context/localStorage";

export default function AllPosts({ posts, route }) {
  const [show, setShow] = useState(false);
  const [postData, getPostData] = useState();
  const { getSinglePost } = useData();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchPostData = id => {
    getSinglePost(id);
    handleShow();
  };
  console.log(postData);
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
