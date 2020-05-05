import React, { useState } from 'react';
import Modal from './Modal';
import { useData } from '../../context/localStateProvider';
import EditPostFormModal from './EditPostFormModal';

const initialState = {
  name: '',
  comment: '',
  reason: '',
};

export default function FormModal({
  show,
  handleClose,
  postData,
  edit,
  showEditForm,
}) {
  const [form, setForm] = useState(initialState);
  const { route, addPost } = useData();

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const clearFields = () => {
    setForm(initialState);
  };

  const closeModal = () => showEditForm(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      ...form,
      route: route,
    };
    addPost(newPost);
    handleClose();
    clearFields();
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
      {edit && postData && (
        <EditPostFormModal
          postData={postData}
          closeModal={closeModal}
          edit={edit}
        />
      )}
    </>
  );
}
