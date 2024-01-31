const express = require("express");
require("dotenv").config();
const { existsSync, mkdirSync } = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./config/database");
const audiobookRoutes = require("./routes/audiobookRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// dotenv.config();

const corsOptions = {
  credentials: true,
};

//middlewares
app.use(express.json());

const path = require("path");

const rootDir =
  path.dirname(path.dirname(__dirname)) + "/Backend";
const photoPath = path.join(rootDir, "images");
const filePath = path.join(rootDir, "songs");

try {
  if (!existsSync(photoPath)) {
    mkdirSync(photoPath);
  }

  if (!existsSync(filePath)) {
    mkdirSync(filePath);
  }
} catch (error) {
  console.error("Error creating directories:", error);
}
console.log("roootDir", rootDir);
// Serve static files
app.use("/api/v1/static/image", express.static(path.join(rootDir, "images")));
app.use("/api/v1/static/song", express.static(path.join(rootDir, "songs")));

app.use("/api/audiobook", audiobookRoutes);

const PORT = process.env.PORT || 8000;
connection();
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
