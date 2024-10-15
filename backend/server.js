import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js"; // .js necessary
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from 'cookie-parser';

dotenv.config();

console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // to parse req.body, middleware between req and response 
app.use(express.urlencoded({ extended: true })) // to parse form data(urlencoded)

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectMongoDB();
});

