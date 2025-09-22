import SearchBox from "../components/SearchBox";
import MapView from "../components/MapView";
import RouteInfo from "../components/RouteInfo";
import { useEffect, useState } from "react";

function HomePage({ socket }) {
    const [routeData, setRouteData] = useState(null);
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        if (!socket) return;

        socket.connect();

        socket.on('routeUpdate', (payload) => {
            setRouteData(prev => ({ ...prev, ...payload }));
        });

        return () => {
            if (roomId) socket.emit('leaveRouteRoom', roomId);
            socket.off('routeUpdate');
            socket.disconnect();
        };
    }, [socket, roomId]);

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <SearchBox setRouteData={setRouteData} setRoomId={setRoomId} socket={socket} />
            <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
                <MapView routeData={routeData} />
                <RouteInfo routeData={routeData} />
            </div>
        </div>
    );
}

export default HomePage;
