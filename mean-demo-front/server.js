const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());

app.use(express.static("./dist/mean-course"));

app.get("/*", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname + "./../dist/mean-course/index.html"));
  console.log(
    "path",
    path.join(__dirname + "./../dist/mean-course/index.html")
  );
});
app.listen(process.env.PORT || 8080);
