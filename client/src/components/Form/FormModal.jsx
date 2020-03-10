import React, { useState } from "react";
import Modal from "./Modal";

export default function FormModal({ route }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <button
          onClick={handleShow}
          className="bg-transparent border border-gray-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-2 px-4 rounded-full"
        >
          Add Comment
        </button>
      </div>
      <Modal route={route} show={show} closeModal={handleClose} />
    </>
  );
}