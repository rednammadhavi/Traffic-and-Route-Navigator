import React from "react";

function RouteInfo({ routeData }) {
    if (!routeData) return <div className="p-4">No route selected</div>;

    return (
        <div className="w-64 p-4 bg-gray-50 border-l">
            <h2 className="text-lg font-semibold mb-2">Route Info</h2>
            <p>Distance: {routeData.distance}</p>
            <p>Normal Duration: {routeData.duration}</p>
            <p>With Traffic: {routeData.trafficAdjustedDuration}</p>
        </div>
    );
}

export default RouteInfo;
