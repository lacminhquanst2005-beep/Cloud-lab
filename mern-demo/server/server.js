const studentRoutes = require("./routes/studentRoutes");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/students", studentRoutes);

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Backend is running!"
    });
});

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});