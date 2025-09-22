import axios from "axios";

export const fetchRouteFromAPI = async (origin, destination, mode = "driving") => {
    try {
        const apiKey = process.env.MAPS_API_KEY;

        // Google Maps Directions API with traffic model
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
            origin
        )}&destination=${encodeURIComponent(
            destination
        )}&mode=${mode}&departure_time=now&traffic_model=best_guess&key=${apiKey}`;

        const { data } = await axios.get(url);

        if (data.status !== "OK") throw new Error(data.error_message);

        const leg = data.routes[0].legs[0];

        return {
            distance: leg.distance.text,
            duration: leg.duration.text,
            trafficAdjustedDuration: leg.duration_in_traffic?.text || leg.duration.text,
            route: data.routes[0].overview_polyline.points,
        };
    } catch (error) {
        throw new Error("Error fetching route with traffic");
    }
};
