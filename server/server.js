const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const resourceRoutes = require("./routes/resource");
const downloadRoutes = require("./routes/download");
const requestRoutes = require("./routes/requestRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors({
origin: "http://localhost:5173",
credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/download", downloadRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});