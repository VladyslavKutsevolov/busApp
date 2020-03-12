import React from "react";
import Post from "./Post";

export default function AllPosts({ posts, route }) {
  return (
    <div>
      <Post posts={posts} route={route} />
    </div>
  );
}
