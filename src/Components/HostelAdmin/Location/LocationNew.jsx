import React from 'react';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, useControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

mapboxgl?.accessToken = "pk.eyJ1Ijoic2hpZmluIiwiYSI6ImNsaTh0M3RxdDN6Y3IzZW50djdlc2ltdnUifQ.hzwTjcEUnrCGzMT-6zY9Vw";

function LocationNew({ lat, setLat, lng, setLng, updatePlaceName }) {
  const Geocoder = () => {
    const ctrl = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false,
      collapsed: true,
    });
    useControl(() => ctrl);
    ctrl.on('result', (e) => {
      const coords = e.result.geometry.coordinates;
      setLng(coords[0]);
      setLat(coords[1]);
    });
    return null;
  };

  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl?.accessToken}`
      );
      const data = await response.json();
      const placeName = data.features[0].place_name;
      console.log('Place Name:', placeName);
      updatePlaceName(placeName); 
    } catch (error) {
      console.error('Error retrieving place name:', error);
    }
  };

  return (
    <ReactMapGL
      mapboxApiAccessToken={mapboxgl.accessToken}
      width="100%"
      height="400px"
      latitude={lat}
      longitude={lng}
      zoom={6}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(viewport) => {
        setLat(viewport.latitude);
        setLng(viewport.longitude);
      }}
    >
      <Marker
        latitude={lat}
        longitude={lng}
        draggable
        onDragEnd={(e) => {
          console.log(e.lngLat.lat);
          console.log(e.lngLat.lng);
          setLat(e.lngLat.lat);
          setLng(e.lngLat.lng);
          getPlaceName(e.lngLat.lat, e.lngLat.lng);
        }}
      />
      <NavigationControl position="bottom-right" />
      <GeolocateControl
        position="top-left"
        trackUserLocation
        onGeolocate={(e) => {
          setLat(e.coords.latitude);
          setLng(e.coords.longitude);
          getPlaceName(e.coords.latitude, e.coords.longitude);
        }}
      />
      <Geocoder />
    </ReactMapGL>
  );
}

export default LocationNew;
