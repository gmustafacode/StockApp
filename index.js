import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./lib/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// Start Server
const port = process.env.PORT || 7000;


app.use(cors());
app.use(express.json());


// Routes
app.use("/api/products", productRoutes);


// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Stock API is running"
    });
});

app.listen(port, "0.0.0.0", async () => {
    console.log(`Server running on port ${port}`);
    await connectDB();
});