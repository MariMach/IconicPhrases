const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parsing different bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Posts fetched succesfully!"
  });
});

app.get("/api/posts", (req, res, next) => {
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
