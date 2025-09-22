import express from "express";
import {
    findRoute,
    saveRoute,
    getHistory
} from "../controllers/routes.controllers.js";

const router = express.Router();

router.route("/find").post(findRoute);
router.route("/save").post(saveRoute);
router.route("/history/:userId").get(getHistory);

export default router;
