import React from "react";
import Form from "./Form/Form";
import Map from "./Map/Map.js";
import { useData } from "../context/localStorage";
import AllPosts from "./Form/AllPosts";

export default function Page() {
  const { route, routes, myPosts, setRoute } = useData();

  return (
    <div>
      <div className="app p-6">
        <h1 className="text-3xl pb-4 text-center">BusApp</h1>
        <Form route={route} handleChange={setRoute} allRoutes={routes} />
        <AllPosts posts={myPosts} route={route} />
      </div>
      <div className="app p-6">
        <Map allRoutes={routes} route={route} />
      </div>
    </div>
  );
}
