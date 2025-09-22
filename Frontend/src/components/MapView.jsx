import { GoogleMap, LoadScript, Polyline, Marker } from "@react-google-maps/api";
import { useState, useMemo } from "react";

function MapView({ routeData }) {
    const [map, setMap] = useState(null);

    const center = routeData?.path?.[0] || { lat: 20, lng: 78 };

    const path = useMemo(() => routeData?.path || [], [routeData]);

    return (
        <div className="flex-1 h-full">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY}>
                <GoogleMap
                    onLoad={mapInstance => setMap(mapInstance)}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={center}
                    zoom={10}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                >
                    {path.length > 0 && (
                        <>
                            <Polyline
                                path={path}
                                options={{
                                    strokeColor: "#2563EB",
                                    strokeOpacity: 0.8,
                                    strokeWeight: 5,
                                    clickable: false,
                                }}
                            />
                            <Marker position={path[0]} label="A" />
                            <Marker position={path[path.length - 1]} label="B" />
                        </>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default MapView;
