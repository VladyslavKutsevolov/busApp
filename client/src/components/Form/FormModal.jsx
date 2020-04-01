import React, { useState } from "react";
import Modal from "./Modal";
import { useData } from "../../context/localStorage";
import EditPostFormModal from "./EditPostFormModal";

export default function FormModal({ show, handleClose, handleShow, postData }) {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  const { route, addPost } = useData();

  const clearFields = () => {
    setName("");
    setComment("");
    setReason("");
  };
  const showAndUpdateInputFields = () => {
    clearFields();
    handleShow();
    console.log("fired!");
  };

  const onSubmit = e => {
    e.preventDefault();
    const newPost = {
      name: name,
      reason: reason,
      comment: comment,
      route: route
    };

    addPost(newPost);
    handleClose();
    clearFields();
  };
  return (
    <>
      <div>
        <button
          onClick={showAndUpdateInputFields}
          className="bg-transparent border border-gray-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-2 px-4 rounded-full"
        >
          Add Comment
        </button>
      </div>
      <Modal
        name={name}
        reason={reason}
        comment={comment}
        show={show}
        route={route}
        onSubmit={onSubmit}
        setName={setName}
        setReason={setReason}
        setComment={setComment}
      />
      {show && postData && (
        <EditPostFormModal
          postData={postData}
          clearFields={clearFields}
          closeModal={handleClose}
          show={show}
        />
      )}
    </>
  );
}
