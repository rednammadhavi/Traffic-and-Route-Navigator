import { useState } from "react";
import axios from "axios";

const makeId = (len = 8) => Math.random().toString(36).slice(2, 2 + len);

function SearchBox({ setRouteData, setRoomId, socket }) {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    const handleSearch = async () => {
        if (!origin || !destination) return;

        const roomId = makeId(10);
        setRoomId(roomId);

        if (socket) {
            if (!socket.connected) socket.connect();
            socket.emit('joinRouteRoom', roomId);
        }

        const { data } = await axios.post("/api/routes/find", {
            origin,
            destination,
            mode: "driving",
            roomId
        });

        setRouteData({ ...data, roomId });
    };

    return (
        <div className="p-4 bg-white shadow-md flex flex-col md:flex-row gap-3 md:gap-2 items-center">
            <input
                className="border p-3 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
            />
            <input
                className="border p-3 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md w-full md:w-auto transition-all"
                onClick={handleSearch}
            >
                Find Route
            </button>
        </div>
    );
}

export default SearchBox;
