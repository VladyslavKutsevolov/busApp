import React, { useContext, createContext, useState, useEffect } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { useThunkReducer } from '../hooks/useThunkReducer';
import { DELETE_POST, ADD_POST, GET_SINGLE_POST, UPDATE_POST } from './types';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from './AuthContext';

const LocalStorageContext = createContext();
const LocalStateProvider = LocalStorageContext.Provider;

function StateProvider({ children }) {
  const [route, setRoute] = useState('');
  const auth = useContext(AuthContext);
  const { error, clearError, clearMessage, setMessage, message } = useHttp();
  const [state, dispatch] = useThunkReducer(AppReducer, { allPosts: [] });

  useEffect(() => {
    clearError();
    clearMessage();
  }, [error, clearError, message, clearMessage]);

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      const data = JSON.parse(localStorage.getItem('userData'));
      console.log(response.data.userId);
      console.log(data.token);
      await dispatch({
        type: DELETE_POST,
        payload: id,
      });
      setMessage('Commnent Deleted!');
    } catch (error) {}
  };

  const addPost = async (post) => {
    try {
      const response = await axios.post('/api/posts', post, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      await dispatch({
        type: ADD_POST,
        payload: response.data,
      });
      setMessage(response.message);
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
      const response = await axios.post(`/api/posts/edit/${id}`, post, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
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
