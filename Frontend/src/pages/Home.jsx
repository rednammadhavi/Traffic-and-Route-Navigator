import SearchBox from "../components/SearchBox";
import MapView from "../components/MapView";
import RouteInfo from "../components/RouteInfo";
import { useState } from "react";

function HomePage() {
    const [routeData, setRouteData] = useState(null);

    return (
        <div className="flex flex-col h-screen">
            <SearchBox setRouteData={setRouteData} />
            <div className="flex flex-1">
                <MapView routeData={routeData} />
                <RouteInfo routeData={routeData} />
            </div>
        </div>
    );
}

export default HomePage;
