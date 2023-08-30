import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())
//start the server
app.listen(PORT,()=>{
    console.log(`Serve is running on ${PORT}`);
});

//To register the end point to the server
app.use('/api/user',userRoute)
app.use('/api/residency',residencyRoute)