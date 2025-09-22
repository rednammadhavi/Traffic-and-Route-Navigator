import { GoogleMap, LoadScript, DirectionsRenderer, TrafficLayer } from "@react-google-maps/api";
import { useState } from "react";

function MapView({ routeData }) {
    const [map, setMap] = useState(null);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY}>
            <GoogleMap
                onLoad={mapInstance => setMap(mapInstance)}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={{ lat: 20, lng: 78 }}
                zoom={6}
            >
                {routeData?.route && (
                    <DirectionsRenderer
                        directions={routeData.googleDirections}
                    />
                )}
                <TrafficLayer />
            </GoogleMap>
        </LoadScript>
    );
}


export default MapView;
