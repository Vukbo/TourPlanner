import React, { useRef, useState, type JSX } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import type { LatLngBoundsExpression, LatLngExpression, PathOptions } from "leaflet";

interface RoutePoint {
    visible: boolean
    position: LatLngExpression
}

interface Route {

}

export default function Map() {
    const [zoom, setZoom] = useState(5);
    const [center, setCenter] = useState<LatLngExpression>([47.8864, 16.3799]);

    const [pointA, setPointA] = useState<RoutePoint>({ visible: true, position: [48.16694, 16.26157] });
    const [pointB, setPointB] = useState<RoutePoint>({ visible: true, position: [48.1481409, 16.2051556] });
    // const [bounds, setBounds] = useState<LatLngBoundsExpression>();

    const { isPending, error, data } = useQuery(
        {
            queryKey: ['routeData'],
            queryFn: () => TourService.get("/route").then((response) => response.data)
        }
    )

    const lineOptions : PathOptions = {color: 'red'}

    // function RenderMarkers(points: RoutePoint[]) {
    //     let markers = points.map((point) => {
    //         return (
    //             <Marker position={point.position}>
    //                 <Popup>
    //                     A pretty CSS3 popup. <br /> Easily customizable.
    //                 </Popup>
    //             </Marker>
    //         )
    //     })

    //     return markers
    // }

function RenderMarkers(points: LatLngExpression[]) {
        let markers = points.map((point) => {
            return (
                <Marker position={point}>
                    
                </Marker>
            )
        })

        return markers
    }

    function GetBounds(bbox:number[])
    {
        let bounds: LatLngBoundsExpression = [[bbox[0],bbox[1]],[bbox[2],bbox[3]]]
        return bounds;
    }

    function GetPath(points:any[])
    {
        return points.map((point) => point as LatLngExpression)   
    }



    if (isPending) return "Fetching Data From Server...."

    if (error) return "An erro has occured: " + error.message

    console.log(data);
    // return data.features[0].geometry.coordinates;

    return (
        <MapContainer  doubleClickZoom={false} attributionControl={false} zoomControl={false}  bounds={GetBounds(data.bbox)} style={{ width: "100%", height: "100vh" }} scrollWheelZoom={true}>

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline pathOptions={lineOptions} positions={GetPath(data.features[0].geometry.coordinates)}/>
            {RenderMarkers([data.features[0].geometry.coordinates[0], data.features[0].geometry.coordinates[(data.features[0].geometry.coordinates as []).length-1]])}
            
        </MapContainer>
    );
}

