import React, { useState } from "react";
import { useData } from "../../context/localStorage";

function EditPostFormModal({ show, closeModal, postData }) {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const { route, updatePost } = useData();

  const onSubmit = e => {
    e.preventDefault();
    const newPost = {
      name: name || postData.name,
      reason: reason || postData.reason,
      comment: comment || postData.comment,
      route: route
    };
    updatePost(postData._id, newPost);
    closeModal();
  };
  return (
    <>
      <div
        className={`modal opacity-${show ? 1 : 0} pointer-events-${
          show ? "auto" : "none"
        } fixed w-full h-full top-0 left-0 flex items-center justify-center`}
      >
        <div
          onClick={closeModal}
          className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
        ></div>

        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
            <svg
              onClick={closeModal}
              className="fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>

          {/* Add margin if you want to see some of the overlay behind the modal*/}
          <div className="modal-content py-4 text-left px-6">
            {/* <!--Title--> */}
            <div className=" items-center pb-3 text-center">
              <p className="text-2xl font-bold ">
                {`Add your comment to: ${route} route`}
              </p>
            </div>

            {/* <!--Body--> */}
            <form onSubmit={onSubmit} method="POST" action="/api/posts/edit">
              <div className="container rounded px-8 pt-6 pb-8">
                <label className="block mb-3" htmlFor="name">
                  <span className="text-gray-700">Name:</span>
                  <input
                    onChange={({ target }) => setName(target.value)}
                    id="name"
                    name="name"
                    defaultValue={postData.name}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your name"
                  />
                </label>
                <label className="block mb-3">
                  <span className="text-gray-700">Select</span>
                  <select
                    onChange={({ target }) => setReason(target.value)}
                    name="reason"
                    defaultValue={postData.reason}
                    className="shadow  border form-select block w-full mt-1"
                  >
                    <option></option>
                    <option>Сomplaint</option>
                    <option>Gratitude</option>
                  </select>
                </label>
                <label htmlFor="comment" className="block">
                  <span className="text-gray-700 mb-2">You Comment</span>
                  <textarea
                    onChange={({ target }) => setComment(target.value)}
                    className="block shadow border rounded text-grey-darkest flex-1 p-2 m-1 w-full h-24"
                    name="comment"
                    defaultValue={postData.comment}
                    id="comment"
                    cols="30"
                    rows="10"
                    placeholder="Add your comment here"
                  ></textarea>
                </label>
              </div>

              {/* <!--Footer--> */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  onClick={e => onSubmit(e)}
                  className="px-4 bg-transparent border p-3 rounded-lg cursor-pointer text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                >
                  Action
                </button>
                <button
                  onClick={closeModal}
                  className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white cursor-pointer hover:bg-indigo-400"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPostFormModal;
