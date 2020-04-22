import React, { useState, useEffect } from "react";
import RouteMap from "./Map/Map.js";
import { useData } from "../context/localStorage";
import AllPosts from "./Form/AllPosts";
import FormModal from "./Form/FormModal";
import AutoComplete from "./Form/AutoComplete";
import ErrorMsg from "./Form/ErrorMsg";

export default function Page() {
  const {
    route,
    setRoute,
    getSinglePost,
    state,
    dispatch,
    fetchAllRoutes
  } = useData();
  const [show, setShow] = useState(false);
  const [postData, getPostData] = useState();
  const { loading, error, data } = state;
  const { allRoutes } = data;
  console.log(state);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchAllRoutes);
  }, []);

  return (
    <div className="bg-white-300">
      <div className="app p-6 z-10">
        <ErrorMsg isErrors={error} />
        <h1 className="text-3xl pb-4 text-center">BusApp</h1>
        <h2>Feedback about whom?</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <AutoComplete handleChange={setRoute} suggestions={allRoutes} />
        )}
        <div>
          <button
            onClick={handleShow}
            className="bg-transparent border border-indigo-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-2 px-4 rounded-full"
          >
            Add Comment
          </button>
        </div>
        <FormModal
          show={show}
          isErrors={error}
          postData={postData}
          handleClose={handleClose}
          handleShow={handleShow}
        />
        {route && (
          <AllPosts
            postData={postData}
            getSinglePost={getSinglePost}
            getPostData={getPostData}
            route={route}
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        )}
      </div>
      <div className="app p-6">
        {!show && allRoutes && <RouteMap allRoutes={allRoutes} route={route} />}
      </div>
    </div>
  );
}
