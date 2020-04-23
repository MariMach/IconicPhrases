const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");
const path = require("path");
const app = express();

mongoose
  .connect(
    "mongodb+srv://mariam:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-dfzxy.mongodb.net/iconic-phrases?retryWrites=true&w=majority",
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
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

app.use(helmet());
app.use(compression());

module.exports = app;
