import React, { useState } from "react";
import MapGL from "react-map-gl";
import PolylineOverlay from "./PolylineOverlay";

function RouteMap({ allRoutes, route }) {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 300,
    latitude: 51.05011,
    longitude: -114.08529,
    zoom: 9
  });

  return (
    <div>
      <MapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        {...viewport}
        onViewportChange={setViewport}
      >
        <PolylineOverlay allRoutes={allRoutes} route={route} />
      </MapGL>
    </div>
  );
}

export default RouteMap;
