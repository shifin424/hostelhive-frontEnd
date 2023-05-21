import React, { useState } from 'react'
import { GoogleMap, Marker } from "@react-google-maps/api";

function Locaion() {
    const [data, setData] = useState([
        {
          name: "Hostel 1",
          address: "123 Main Street, Anytown, USA",
          latitude: 37.7751,
          longitude: -122.4189,
        },
        {
          name: "Hostel 2",
          address: "456 Elm Street, Anytown, USA",
          latitude: 37.7777,
          longitude: -122.4222,
        },
      ]);

      const handleClick = (item) => {
        console.log(item);
      };
    
  return (
    
    <div>
        <h1 className='text-black'>Google map</h1>
      <GoogleMap
        center={data[0].latitude}
        zoom={15}
      >
        {data.map((item) => (
          <Marker
            key={item.name}
            position={{
              lat: item.latitude,
              lng: item.longitude,
            }}
            onClick={handleClick}
          />
        ))}
      </GoogleMap>
    </div>
  )
}

export default Locaion
