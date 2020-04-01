import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
  useRef
} from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const LocalStorageContext = createContext();
const LocalStateProvider = LocalStorageContext.Provider;

function StateProvider({ children }) {
  const [route, setRoute] = useState("");
  const [routes, setRoutes] = useState([]);
  const [allPosts, setPosts] = useState([]);
  const myRef = useRef();
  myRef.current = allPosts;
  const [myPosts, dispatch] = useReducer(AppReducer, myRef);

  useEffect(() => {
    async function getAllRoutes() {
      console.log("fetching routes...");
      const data = await fetch("/api/routes").then(res => res.json());
      setRoutes(data);
    }
    getAllRoutes();
  }, []);

  useEffect(() => {
    async function getAllPosts() {
      console.log("fetching posts...");
      const data = await fetch("/api/posts").then(res => res.json());
      setPosts(data);
    }
    getAllPosts();
  }, []);

  const deletePost = id => {
    axios.delete(`/api/posts/${id}`).then(res => {
      dispatch({
        type: "DELETE_POST",
        payload: id
      });
    });
  };

  const addPost = post => {
    axios.post("/api/posts", post).then(res => {
      dispatch({
        type: "ADD_POST",
        payload: res.data
      });
    });
  };

  const getSinglePost = id => {
    axios.get(`/api/posts/edit/${id}`).then(res => {
      dispatch({
        type: "GET_SINGLE_POST",
        payload: res.data
      });
    });
  };

  const updatePost = (id, post) => {
    axios.post(`/api/posts/edit/${id}`, post).then(res => {
      dispatch({
        type: "UPDATE_POST",
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
        routes,
        myPosts,
        setRoute,
        setPosts
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
