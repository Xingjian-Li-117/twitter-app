import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"; // .js necessary
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectMongoDB();
});

