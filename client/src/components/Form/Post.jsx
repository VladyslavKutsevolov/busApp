import React from "react";

export default function Post({ posts, route }) {
  console.log(posts);
  return (
    <div className="grid grid-cols-3 gap-2 mt-5">
      {posts.map(
        post =>
          post.route === route && (
            <div
              key={post._id}
              className={`bg-${
                post.reason === "Gratitude" ? "green" : "red"
              }-100 px-6 py-4 rounded overflow-hidden shadow-lg`}
            >
              <div className="font-bold text-xl mb-2">{post.name}</div>
              <span>{post.date}</span>
              <p className="text-gray-700 text-base">{post.comment}</p>
            </div>
          )
      )}
    </div>
  );
}
