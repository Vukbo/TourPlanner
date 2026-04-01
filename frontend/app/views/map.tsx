import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Bounds, LatLngBoundsExpression } from "leaflet";



// export default function Map() {
//     return (
//         <div>
//             <link rel="stylesheet" href="node_modules/leaflet/dist/leaflet.css"/>
//             <script src = "node_modules/leaflet/dist/leaflet.js"> </script>
//             <div id="map" style= {{height : "250pxπ"}} ></div>
//         </div>
//     )
// }


export default function Map() {
    const mapRef = useRef(null);
    const latitude = 51.505;
    const longitude = -0.09;

    const outerBounds = [
        [50.505, -29.09],
        [52.505, 29.09],
    ]

    return (
        // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer bounds={outerBounds as LatLngBoundsExpression} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}