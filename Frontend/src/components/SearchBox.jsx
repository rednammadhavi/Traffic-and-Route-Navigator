import { useState } from "react";
import axios from "axios";

function SearchBox({ setRouteData }) {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    const handleSearch = async () => {
        const { data } = await axios.post("/api/routes/find", {
            origin,
            destination,
            mode: "driving",
        });
        setRouteData(data);
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
