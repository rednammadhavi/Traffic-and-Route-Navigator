import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        origin: String,
        destination: String,
        distance: String,
        duration: String,
        trafficAdjustedDuration: String,
        route: Array,
    },
    { timestamps: true }
);

export const Route = mongoose.model("Route", routeSchema);
