import React, { useState } from "react";
import Post from "./Post";

export default function AllPosts({ posts, route }) {
  const [refresh, setRefresh] = useState(false);
  return (
    <div>
      <Post posts={posts} route={route} setRefresh={setRefresh} />
    </div>
  );
}
