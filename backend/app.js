const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");

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
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Posts fetched succesfully!",
      postId: createdPost._id
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Post updated!"
      });
    })
    .catch(() => {
      console.log("something went wrong with the update");
    });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then(doc => {
      res.status(200).json({
        message: "Posts fetched succesfully!",
        posts: doc
      });
    })
    .catch(() => {
      console.log(" posts find error");
    });
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Post not found !",
          post: post
        });
      }
    })
    .catch(() => {
      console.log(" posts find error");
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Post deleted!"
      });
    })
    .catch(() => {
      console.log("something went wrong");
    });
});

module.exports = app;
