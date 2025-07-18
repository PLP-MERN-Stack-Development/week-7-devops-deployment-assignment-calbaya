// ==== BACKEND: server/index.js ====
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const Sentry = require("@sentry/node");

const app = express();
const PORT = process.env.PORT || 5000;

// Sentry Monitoring
Sentry.init({ dsn: process.env.SENTRY_DSN });

// Middleware
app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

// Health Check
app.get("/health", (req, res) => res.send("OK"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
  
// Routes (example)
app.get("/api", (req, res) => {
  res.json({ message: "Backend is running" });
});

// Error Handler
app.use(Sentry.Handlers.errorHandler());
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));