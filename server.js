const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;
const HOST_NAME = process.env.HOST_NAME || "localhost";

app.get("/api", async (req, res) => {
  res.status(200).json({ msg: "License project APIs" });
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/license", require("./routes/license"));
app.use("/api/account", require("./routes/account"));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}/`);
});
