const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");
const path = require("path");
const app = express();

mongoose
  .connect(
    "mongodb+srv://mariam:AE5WNb0qBCkuCymC@cluster0-dfzxy.mongodb.net/iconic-phrases?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("connection to db failed");
  });

// parsing different bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// images folder accessible
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
