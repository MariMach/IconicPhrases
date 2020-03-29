const express = require("express");
const Post = require("./models/post");
const router = express.Router();

router.post("", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
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

router.get("", (req, res, next) => {
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

router.get("/:id", (req, res, next) => {
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

router.delete("/:id", (req, res, next) => {
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

module.exports = router;
