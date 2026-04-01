import React, { useEffect, useRef, useState, type JSX } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { map, type LatLngBoundsExpression, type LatLngExpression, type PathOptions } from "leaflet";
import { TourService } from "~/queries/rest";

interface RoutePoint {
    visible: boolean
    position: LatLngExpression
}

function MapOverride()
{
    const map = useMap();
    map.locate().on("locationfound",(e)=> {
            map.setView(e.latlng)
        })

    return null;
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


    const lineOptions: PathOptions = { color: 'red' }

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

    function GetBounds(bbox: number[]) {
        let bounds: LatLngBoundsExpression = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]
        return bounds;
    }

    function GetPath(points: any[]) {
        return points.map((point) => point as LatLngExpression)
    }



    if (isPending) return "Fetching Data From Server...."

    if (error) return "An erro has occured: " + error.message


    return (
        <MapContainer center={[0,0]} zoom={16} doubleClickZoom={false} attributionControl={false} zoomControl={false}  style={{ filter:" grayscale(100%) contrast(110%) ", borderRadius:"5px", width: "100%", height: "100%" }} scrollWheelZoom={false}>

            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <MapOverride />

        </MapContainer>
    );
}

