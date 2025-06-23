import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/database/db.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({
    origin : process.env.FRONTEND_URL
}));

connectDB()

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log("Server is running on port", PORT);
})

export default app;