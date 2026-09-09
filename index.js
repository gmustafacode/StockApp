import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./lib/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Stock API is running"
    });
});

const port = process.env.PORT || 7000;

const startServer = async () => {
    try {
        await connectDB();
        console.log("Database ready");

        app.listen(port, "0.0.0.0", () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

startServer();