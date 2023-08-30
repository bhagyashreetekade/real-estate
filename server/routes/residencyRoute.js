import express  from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwtCheck from "../config/auth0Config.js";
import { createResidency, getAllResidencies, getResidency } from "../controllers/residencyController.js";
const router = express.Router()


router.post("/create",jwtCheck,createResidency)
router.get("/allresd",getAllResidencies)
router.get("/:id",getResidency)

export {router as residencyRoute} 