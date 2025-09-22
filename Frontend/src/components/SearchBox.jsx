// Frontend/src/components/SearchBox.jsx
import { useState } from "react";
import axios from "axios";

const makeId = (len = 8) => Math.random().toString(36).slice(2, 2 + len)

function SearchBox({ setRouteData, setRoomId, socket }) {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    const handleSearch = async () => {
        const roomId = makeId(10)
        setRoomId(roomId)

        // join the room first so server emits can reach client immediately
        if (socket && socket.connected) {
            socket.emit('joinRouteRoom', roomId)
        } else if (socket) {
            socket.connect()
            socket.on('connect', () => socket.emit('joinRouteRoom', roomId))
        }

        const { data } = await axios.post("/api/routes/find", {
            origin,
            destination,
            mode: "driving",
            roomId
        });

        // server returns initial route payload
        setRouteData({
            ...data,
            roomId
        });
    };

    return (
        <div className="p-4 bg-gray-100 flex gap-2">
            <input
                className="border p-2 rounded"
                placeholder="Origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
            />
            <input
                className="border p-2 rounded"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSearch}
            >
                Find Route
            </button>
        </div>
    );
}

export default SearchBox;
