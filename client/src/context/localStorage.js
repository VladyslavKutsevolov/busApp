import React, { useContext, createContext, useState } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import { useThunkReducer } from "./useThunkReducer";
import {
  LOADING,
  ERROR,
  DELETE_POST,
  ADD_POST,
  GET_SINGLE_POST,
  UPDATE_POST,
  FETCH_ROUTES
} from "./types";

const LocalStorageContext = createContext();
const LocalStateProvider = LocalStorageContext.Provider;

const initialState = {
  data: [],
  loading: false,
  error: null
};

const fetchAllRoutes = async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const response = await fetch("https://data.calgary.ca/resource/hpnd-riq4");
    const data = await response.json();
    dispatch({ type: FETCH_ROUTES, payload: { allRoutes: data } });
  } catch (error) {
    dispatch({ type: ERROR, payload: { error } });
  }
};

function StateProvider({ children }) {
  const [route, setRoute] = useState("");
  const [state, dispatch] = useThunkReducer(AppReducer, initialState);

  const deletePost = (id) => {
    axios.delete(`/api/posts/${id}`).then((res) => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    });
  };

  const addPost = (post) => {
    axios.post("/api/posts", post).then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    });
  };
  const getSinglePost = (id) => {
    axios.get(`/api/posts/edit/${id}`).then((res) => {
      dispatch({
        type: GET_SINGLE_POST,
        payload: res.data
      });
    });
  };

  const updatePost = (id, post) => {
    axios.post(`/api/posts/edit/${id}`, post).then((res) => {
      dispatch({
        type: UPDATE_POST,
        payload: res.data,
        id: id
      });
    });
  };

  return (
    <LocalStateProvider
      value={{
        route,
        deletePost,
        updatePost,
        getSinglePost,
        addPost,
        setRoute,
        state,
        dispatch,
        fetchAllRoutes
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useData() {
  const all = useContext(LocalStorageContext);
  return all;
}
export { useData, StateProvider };
