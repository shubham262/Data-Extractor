import express from "express";
import { garlandCityController } from "../Controllers/GarlandCityController";
const router = express.Router();
router.get("/Garland-city/property/details", garlandCityController);
export const GarlandCityRouter = router;
