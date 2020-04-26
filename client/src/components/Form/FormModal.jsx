import React, { useState } from 'react';
import Modal from './Modal';
import { useData } from '../../context/localStateProvider';
import EditPostFormModal from './EditPostFormModal';

const initialState = {
  name: '',
  comment: '',
  reason: '',
};

export default function FormModal({ show, handleClose, postData }) {
  const [form, setForm] = useState(initialState);
  const { route, addPost, setMessage } = useData();

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const clearFields = () => {
    setForm(initialState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      ...form,
      route: route,
    };
    addPost(newPost);
    handleClose();
    clearFields();
    setMessage('Comment Added!');
  };
  return (
    <>
      <Modal
        form={form}
        show={show}
        route={route}
        handleChange={handleChange}
        closeModal={handleClose}
        onSubmit={onSubmit}
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
