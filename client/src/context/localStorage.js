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
  const myRef = useRef();
  myRef.current = allPosts;

  const [myPosts, dispatch] = useReducer(AppReducer, myRef);

  const deletePost = id => {
    axios.delete(`/api/posts/${id}`).then(res => {
      dispatch({
        type: "DELETE_ITEM",
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

  return (
    <LocalStateProvider
      value={{
        route,
        deletePost,
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
