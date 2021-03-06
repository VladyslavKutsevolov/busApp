import React, { useEffect } from 'react';
import { useData } from '../../context/localStateProvider';

export default function Post({ posts, getPostData, fetchPostData }) {
  console.log('Post -> posts', posts);
  const { deletePost, state } = useData();

  useEffect(() => {
    getPostData(state.present.post);
  }, [getPostData, state.present.post]);

  return (
    <div className="grid grid-cols-2 gap-2 mt-5 sm:grid-cols-2 md:grid-cols-3">
      {posts &&
        posts.map((post) => (
          <div
            key={post._id}
            className={`bg-${
              post.reason === 'Gratitude' ? 'green' : 'red'
            }-100 px-6 py-4 rounded overflow-hidden shadow-lg`}
          >
            <div className="font-bold text-xl mb-2">{post.name}</div>
            <span>{post.date.substring(0, 10)}</span>
            <p className="text-gray-700 text-base">{post.comment}</p>
            <div className="mx-auto flex justify-end">
              <button
                onClick={() => fetchPostData(post._id)}
                className="bg-transparent border border-gray-500 mr-1 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-1 px-3 rounded-full"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post._id)}
                className="bg-transparent border border-gray-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-1 px-3 rounded-full"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
