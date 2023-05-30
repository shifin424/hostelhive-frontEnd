import React from 'react'
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, useControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

function LocationNew({lat, setLat,lng, setLng}) {
    
  const Geocoder = () => {
    const ctrl = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAP_TOKEN,
      marker: false,
      collapsed: true,
    });
    useControl(() => ctrl);
    ctrl.on("result", (e) => {
      const coords = e.result.geometry.coordinates;
      setLng(coords[0]);
      setLat(coords[1]);
    });
    return null;
  };
  return (
    <ReactMapGL
    mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
    initialViewState={{
      longitude: lng,
      latitude: lat,
      zoom: 6,
    }}
    mapStyle="mapbox://styles/mapbox/streets-v11"
  >
    <Marker
      latitude={lat}
      longitude={lng}
      draggable
      onDragEnd={(e) => {
        console.log(e.lngLat.lat)
        console.log(e.lngLat.lng)
        setLat(e.lngLat.lat);
        setLng(e.lngLat.lng);
      }}
    />
    <NavigationControl position="bottom-right" />
    <GeolocateControl
      position="top-left"
      trackUserLocation
      onGeolocate={(e) => {
        setLat(e.coords.latitude);
        setLng(e.coords.longitude);
      }}
    />
    <Geocoder />
  </ReactMapGL>
  )
}

export default LocationNew
