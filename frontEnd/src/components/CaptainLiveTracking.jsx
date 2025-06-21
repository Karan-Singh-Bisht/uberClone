import { useState, useEffect, useContext } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { SocketContext } from "../context/SocketContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const CaptainLiveTracking = () => {
  const { captainLocation } = useContext(SocketContext);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={captainLocation} // fallback: India center
        zoom={15}
      >
        {captainLocation && (
          <Marker
            position={captainLocation}
            icon={{
              url: "/uberBike.webp", // bike icon
              scaledSize: new window.google.maps.Size(40, 40), // resize icon
              anchor: new window.google.maps.Point(20, 20), // center the icon
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default CaptainLiveTracking;
