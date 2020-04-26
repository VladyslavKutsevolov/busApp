import React, { useContext, createContext, useState, useEffect } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { useThunkReducer } from '../hooks/useThunkReducer';
import { DELETE_POST, ADD_POST, GET_SINGLE_POST, UPDATE_POST } from './types';
import { useHttp } from '../hooks/http.hook';

const LocalStorageContext = createContext();
const LocalStateProvider = LocalStorageContext.Provider;

function StateProvider({ children }) {
  const [route, setRoute] = useState('');
  const { error, clearError, clearMessage, setMessage, message } = useHttp();
  const [state, dispatch] = useThunkReducer(AppReducer, { allPosts: [] });

  useEffect(() => {
    clearError();
    clearMessage();
  }, [error, clearError, message, clearMessage]);

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      await dispatch({
        type: DELETE_POST,
        payload: id,
      });
      setMessage('Commnent Deleted!');
    } catch (error) {}
  };

  const addPost = async (post) => {
    try {
      const response = await axios.post('/api/posts', post);
      await dispatch({
        type: ADD_POST,
        payload: response.data,
      });
      setMessage('Commment Added!');
    } catch (error) {}
  };
  const getSinglePost = async (id) => {
    try {
      const response = await axios.get(`/api/posts/edit/${id}`);
      await dispatch({
        type: GET_SINGLE_POST,
        payload: response.data,
      });
    } catch (error) {}
  };

  const updatePost = async (id, post) => {
    try {
      const response = await axios.post(`/api/posts/edit/${id}`, post);
      await dispatch({
        type: UPDATE_POST,
        payload: response.data,
        id: id,
      });
      setMessage('Comment Apdated!');
    } catch (error) {}
  };
  const values = {
    route,
    deletePost,
    updatePost,
    getSinglePost,
    addPost,
    setRoute,
    state,
    dispatch,
    message,
    setMessage,
  };

  return <LocalStateProvider value={values}>{children}</LocalStateProvider>;
}

function useData() {
  const all = useContext(LocalStorageContext);
  return all;
}
export { useData, StateProvider };
