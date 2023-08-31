import express  from "express";
import { allBookings, bookVisit, cancelBooking, createUser, toFav, allFav } from "../controllers/userController.js";

import jwtCheck from "../config/auth0Config.js";
const router = express.Router()

//When someone registering then he has to pass our jwtCheck middleware ,is we will pass it create a user if not then we simply return
router.post("/register",jwtCheck,createUser); 
router.post("/bookVisit/:id",jwtCheck,bookVisit);
router.post("/allBookings",allBookings);
router.post("/cancelBooking/:id",jwtCheck,cancelBooking);
router.post("/toFav/:rid",jwtCheck,toFav);
router.post("/allFav",jwtCheck,allFav);
export {router as userRoute} 