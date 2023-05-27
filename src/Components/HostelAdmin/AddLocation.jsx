import React from 'react'
import ReactMapGL from 'react-map-gl'
import { useValue } from '../../Context/ContextProvider'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Marker } from 'react-map-gl'


function AddLocation() {
    const  {state:{location:{lng,lat}},dispatch} = useValue()
  return (
    <div>
      

    <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        initialViewState={{
            longitude:lng,
            latitude:lat,
            zoom:8
        }}
        mapStyle='https://api.mapbox.com/styles/v1/shifin/cli4kd4ho00nh01pgdruxf59b'

        >

        <Marker
        latitude={lat}
        longitude={lng}
        draggable
        onDrapEnd={(e)=> dispatch({type:"UPDATE_LOCATION,",payload:{lng:e.lngLat.lng , lat:e.lngLat.lat}})}
        
        
        
        />

       

    </ReactMapGL>

    </div>
  )
}

export default AddLocation
