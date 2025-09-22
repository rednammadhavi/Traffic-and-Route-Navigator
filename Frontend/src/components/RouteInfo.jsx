import React from "react";

function RouteInfo({ routeData }) {
    if (!routeData)
        return <div className="p-4 text-gray-500 text-center">No route selected</div>;

    return (
        <div className="w-full md:w-72 p-6 bg-white border-l shadow-lg flex-shrink-0">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Route Info</h2>
            <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Distance:</span> {routeData.distance}</p>
                <p><span className="font-semibold">Normal Duration:</span> {routeData.duration}</p>
                <p>
                    <span className="font-semibold">With Traffic:</span> {routeData.trafficAdjustedDuration || routeData.duration_in_traffic}
                </p>
                <p><span className="font-semibold">Summary:</span> {routeData.summary}</p>
            </div>
        </div>
    );
}

export default RouteInfo;
