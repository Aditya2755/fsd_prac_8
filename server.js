const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mern_practical")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/uploads", express.static("uploads"));

// Mock Payment API
app.post("/api/payment", (req, res) => {
  const { amount } = req.body;
  if (amount > 0) {
    res.json({ status: "success" });
  } else {
    res.status(400).json({ status: "failed" });
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));
