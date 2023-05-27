import "mapbox-gl/dist/mapbox-gl.css"
import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl';



const TOKEN = "pk.eyJ1Ijoic2hpZmluIiwiYSI6ImNsaTRqNzl0dzBvemgzZG1sd2l5aWZibHEifQ.ra-NmGjYzqgh1egunhd0oQ"


function Location() {
    const [viewPort, setViewPort] = useState({
        latitude: 28.644800,
        longitude:77.216721,
        zoom: 6,
    })
    return (
        <div style={{ width: "400px", height: "350px" }}>
            <ReactMapGL

                {...viewPort}
                mapboxApiAccessToken={TOKEN}
                transitionDuration='200'
                width="200px"
                height="200px"
                mapStyle="https://api.mapbox.com/styles/v1/shifin/cli4kd4ho00nh01pgdruxf59b"
            >
            </ReactMapGL>
        </div>
    )
    
}



export default Location
