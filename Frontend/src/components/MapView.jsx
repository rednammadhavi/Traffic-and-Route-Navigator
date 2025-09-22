// Frontend/src/components/MapView.jsx
import { GoogleMap, LoadScript, Polyline, Marker } from "@react-google-maps/api";
import { useState, useMemo } from "react";

function MapView({ routeData }) {
    const [map, setMap] = useState(null);

    // default center or center on first coordinate if available
    const center = routeData?.path?.[0] || { lat: 20, lng: 78 };

    // convert path to plain array of lat/lng objects accepted by Polyline
    const path = useMemo(() => {
        return routeData?.path || []
    }, [routeData])

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY}>
            <GoogleMap
                onLoad={mapInstance => setMap(mapInstance)}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={center}
                zoom={10}
            >
                {path && path.length > 0 && (
                    <>
                        <Polyline path={path} />
                        <Marker position={path[0]} />
                        <Marker position={path[path.length - 1]} />
                    </>
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default MapView;
