import { Route } from "../models/route.models.js"
import { fetchRouteFromAPI } from "../utils/clientApi.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// find route
const findRoute = asyncHandler(async (req, res) => {
    const { origin, destination, mode, roomId } = req.body
    if (!origin || !destination) {
        throw new ApiError(400, "Origin and Destination are required")
    }

    const data = await fetchRouteFromAPI(origin, destination, mode || "driving")

    const io = req.app.locals.io
    if (io && roomId) {
        io.to(roomId).emit("routeUpdate", data)
    }

    return res
        .status(200)
        .json(new ApiResponse(200, data, "Route fetched successfully"))
})

// save route
const saveRoute = asyncHandler(async (req, res) => {
    const newRoute = new Route(req.body)
    const saved = await newRoute.save()
    return res
        .status(201)
        .json(new ApiResponse(201, saved, "Route saved successfully"))
})

// get history
const getHistory = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!userId) {
        throw new ApiError(400, "UserId is required")
    }

    const history = await Route.find({ userId })
    return res
        .status(200)
        .json(new ApiResponse(200, history, "History fetched successfully"))
})

export { findRoute, saveRoute, getHistory }
