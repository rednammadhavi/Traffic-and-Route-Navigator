import Route from "../models/routes.models.js";
import { fetchRouteFromAPI } from "../api/client.api.js";

export const findRoute = async (req, res) => {
    try {
        const { origin, destination, mode } = req.body;
        const data = await fetchRouteFromAPI(origin, destination, mode);
        res.json({
            distance: data?.features[0]?.properties?.summary?.distance,
            duration: data?.features[0]?.properties?.summary?.duration,
            trafficAdjustedDuration: data?.features[0]?.properties?.summary?.duration,
            route: data?.features[0]?.geometry?.coordinates,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const saveRoute = async (req, res) => {
    try {
        const newRoute = new Route(req.body);
        const saved = await newRoute.save();
        res.json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const history = await Route.find({ userId: req.params.userId });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
