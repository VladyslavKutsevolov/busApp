import React from "react";
import { useData } from "../../context/localStorage";

export default function Post({ posts, route }) {
  const { deletePost, setRefresh } = useData();
  return (
    <div className="grid grid-cols-3 gap-2 mt-5">
      {posts.current.map(
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
              <div className="mx-auto flex justify-end">
                <button className="bg-transparent border border-gray-500 mr-1 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-1 px-3 rounded-full">
                  Edit
                </button>
                <button
                  onClick={() => (deletePost(post._id), setRefresh(true))}
                  className="bg-transparent border border-gray-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-1 px-3 rounded-full"
                >
                  Delete
                </button>
              </div>
            </div>
          )
      )}
    </div>
  );
}
