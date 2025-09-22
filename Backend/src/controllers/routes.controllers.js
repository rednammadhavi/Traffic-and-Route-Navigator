import Route from "../models/route.models.js";
import { fetchRouteFromAPI } from "../utils/clientApi.js";

const pollingMap = new Map();

const startPollingRoute = async (io, roomId, origin, destination, mode = 'driving', intervalMs = 30000) => {
    if (pollingMap.has(roomId)) return;
    const pollFn = async () => {
        try {
            const data = await fetchRouteFromAPI(origin, destination, mode)
            io.to(roomId).emit('routeUpdate', {
                distance: data.distance,
                duration: data.duration,
                trafficAdjustedDuration: data.duration_in_traffic,
                path: data.path,
                overview_polyline: data.overview_polyline,
                summary: data.summary
            })
        } catch (err) {
            console.error('Polling error for route', roomId, err.message)
        }
    }
    await pollFn()
    const intervalId = setInterval(pollFn, intervalMs)
    pollingMap.set(roomId, intervalId)
}

const stopPollingRoute = (roomId) => {
    const id = pollingMap.get(roomId)
    if (id) {
        clearInterval(id)
        pollingMap.delete(roomId)
    }
}

export const findRoute = async (req, res) => {
    try {
        const { origin, destination, mode, roomId } = req.body;
        const data = await fetchRouteFromAPI(origin, destination, mode);

        const io = req.app.locals.io;
        if (io && roomId) {
            io.to(roomId).emit('routeUpdate', {
                distance: data.distance,
                duration: data.duration,
                trafficAdjustedDuration: data.duration_in_traffic,
                path: data.path,
                overview_polyline: data.overview_polyline,
                summary: data.summary
            })

            startPollingRoute(io, roomId, origin, destination, mode, 30000)
        }

        res.json({
            distance: data.distance,
            duration: data.duration,
            trafficAdjustedDuration: data.duration_in_traffic,
            path: data.path,
            overview_polyline: data.overview_polyline,
            summary: data.summary
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
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
