import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import PolylineOverlay from "./PolylineOverlay";

function Map({ allRoutes, route }) {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 51.05011,
    longitude: -114.08529,
    zoom: 9
  });

  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        {...viewport}
        onViewportChange={setViewport}
      >
        {route && <PolylineOverlay allRoutes={allRoutes} route={route} />}
      </ReactMapGL>
    </div>
  );
}

export default Map;
