import React, { useState } from "react";
import RouteMap from "./Map/Map.js";
import { useData } from "../context/localStorage";
import AllPosts from "./Form/AllPosts";
import FormModal from "./Form/FormModal";
import AutoComplete from "./Form/AutoComplete";
import ErrorMsg from "./Form/ErrorMsg";

export default function Page() {
  const {
    route,
    routes,
    myPosts,
    setRoute,
    getSinglePost,
    errors,
    setErrors
  } = useData();
  const [show, setShow] = useState(false);
  const [postData, getPostData] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="bg-white-300">
      <div className="app p-6 z-10">
        <ErrorMsg isErrors={errors} setErrors={setErrors} />
        <h1 className="text-3xl pb-4 text-center">BusApp</h1>
        <h2>Feedback about whom?</h2>
        <AutoComplete handleChange={setRoute} suggestions={routes} />
        <FormModal
          show={show}
          isErrors={errors}
          setErrors={setErrors}
          postData={postData}
          handleClose={handleClose}
          handleShow={handleShow}
        />
        <AllPosts
          postData={postData}
          getSinglePost={getSinglePost}
          getPostData={getPostData}
          posts={myPosts}
          route={route}
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      </div>
      <div className="app p-6">
        {!show && <RouteMap allRoutes={routes} route={route} />}
      </div>
    </div>
  );
}
