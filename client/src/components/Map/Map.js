import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import PolylineOverlay from "./PolylineOverlay";

const TOKEN =
  "pk.eyJ1Ijoia3l0c2V2b2xvdiIsImEiOiJjazhkcXRtOWQweDZvM2RvMWdkMDJyZHRtIn0.05dnAAjwmEhxNEMmCR0mYQ";

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
        mapboxApiAccessToken={TOKEN}
        {...viewport}
        onViewportChange={setViewport}
      >
        {route && <PolylineOverlay allRoutes={allRoutes} route={route} />}
      </ReactMapGL>
    </div>
  );
}

export default Map;
