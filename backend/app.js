const express = require("express");
const app = express();

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

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "jhjkhjkhkj",
      title: "First title from server",
      content: "First content from server"
    }
  ];
  res.status(200).json({
    message: "Posts fetched succesfully!",
    posts: posts
  });
});

module.exports = app;
