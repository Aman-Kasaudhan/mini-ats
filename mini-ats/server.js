require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/candidates", require("./candidates"));
app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

// Central error handler
app.use((err, req, res, next) => {
  if (err.code === 11000) return res.status(409).json({ error: "A candidate with this email already exists" });
  if (err.name === "ValidationError") return res.status(400).json({ error: Object.values(err.errors)[0].message });
  if (err.name === "CastError") return res.status(400).json({ error: "Invalid id" });
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(PORT, () => console.log(`Mini ATS running at http://localhost:${PORT}`)))
  .catch((e) => { console.error("MongoDB connection failed:", e.message); process.exit(1); });
